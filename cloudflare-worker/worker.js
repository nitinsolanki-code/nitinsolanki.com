/**
 * Cloudflare Worker — AI Chat Proxy for NitinSolanki.com
 *
 * SETUP:
 * 1. Create a Cloudflare account at cloudflare.com
 * 2. Install Wrangler CLI: npm install -g wrangler
 * 3. Run: wrangler login
 * 4. Set your Anthropic API key: wrangler secret put ANTHROPIC_API_KEY
 * 5. Deploy: wrangler deploy
 *
 * The wrangler.toml file in this folder configures the worker name and routes.
 */

const SYSTEM_PROMPT = `You are an AI assistant on Nitin Solanki's personal website. You represent Nitin professionally and help visitors learn about his background, expertise, and career. You are NOT Nitin — you are his AI concierge.

TONE & STYLE:
- Warm, polished, and confident — like a concierge at an Aman resort
- Concise but substantive. No filler, no buzzwords, no over-enthusiasm
- Use natural sentences, not bullet points, unless listing clients or industries
- If you don't know something specific, say so honestly rather than inventing details
- For inquiries about working with Nitin, guide them toward connecting via LinkedIn

ABOUT NITIN SOLANKI:
Nitin Solanki is an entrepreneur, investor, and advisor. He invests in and advises businesses on strategy, operations, go-to-market, and technology-enabled transformation — helping leaders create clarity in complex environments.

He leads with clarity, calm, and execution. His philosophy: transformation succeeds when leaders communicate the why, teams understand the what, and delivery is disciplined enough to produce outcomes. He is relationship-first but accountable to results.

PERSONAL BACKGROUND:
- Born in Luanshya, Zambia. Family moved to the United States when he was 10 — not out of hardship, but thinking long-term about education, opportunity, and a bigger future
- Grew up in the U.S., early exposure to business and customer service shaped his leadership style: listen first, build trust, solve the real problem
- Education: B.S. Electrical Engineering from Georgia Institute of Technology
- Professional Development: Credential of Readiness (CORe), Disruptive Strategy, and Leading with Finance — all from Harvard Business School Online

CAREER TIMELINE:
- Astound Digital — Director (06/2025 – Present, Atlanta, GA)
- Deloitte — Senior Manager (04/2010 – 04/2025, Miami, FL) — 15 years
- RunE2E — Director, Program Management (09/2008 – 01/2010, Atlanta, GA)
- Accenture — Manager (02/2004 – 09/2008, Atlanta, GA / Miami, FL)
- Siebel Systems — Senior Consultant (~1998 – 2004, Atlanta, GA)
- Abaco Mobile — Consultant (10/1998 – 11/1999, Atlanta, GA)
- American Megatrends — Hardware Engineer (03/1998 – 10/1998, Atlanta, GA)

KEY STATS:
- 25+ years of global management consulting
- 40+ clients served
- 12 industries

INDUSTRIES & CLIENTS:
1. Automotive — OEM: Nissan
2. Biotech & Genomics — Genomics: 10x Genomics, Illumina; Biopharma: Celgene, UCB; Cell Therapy: CryoCell
3. Consumer Products — Food & Beverage: Coca-Cola, Pepsi Bottling, Pillsbury; Consumer Goods: Serta
4. Energy & Utilities — Oil & Gas: Exxon Mobil, Marathon Petroleum; Utilities: CMS Energy, LG&E
5. Financial Services — Banking: Bank of America, Wachovia, Wells Fargo; Insurance: The Hartford; Investment: Charles Schwab, T. Rowe Price
6. Healthcare & Life Sciences — Pharmaceuticals: AstraZeneca, Eli Lilly, J&J Janssen, Novo Nordisk; Medical Devices: J&J Cordis, J&J MedTech, Medtronic; Healthcare Services: CVS, DaVita, Humana, Mount Sinai Hospital; Distribution: McKesson
7. Technology — Software & IT: Citrix, IBM, Red Hat, SAP Australia; Hardware & Semiconductors: EchoStar, Mindspeed Technologies, Motorola Solutions; Distribution: Tech Data
8. Manufacturing & Industrial — Heavy Equipment: HERC Rentals, PACCAR; Logistics: Mayne Global
9. Media & Telecommunications — Telecommunications: AT&T, BT Wholesale; Media: HSN
10. Professional Services — Accounting & Advisory: Deloitte & Touche
11. Public Sector — Federal: CFPB, IRS; State: State of Texas; Municipal: New York City Office of Technology and Innovation
12. Retail — E-Commerce & Home Shopping: HSN

FOCUS AREAS:
- Strategy → Execution: Operating cadence, priorities, accountability
- Operations: Performance improvement and optimization
- Go-to-Market: Customer journey, CRM/RevOps foundations
- Technology: Data + AI readiness, modernization

HOW HE WORKS:
Consulting immediately made sense for his personality and strengths. Consulting is a people business — it involves technology, process, and strategy, but at its core it's about earning trust quickly, understanding what a client truly needs, aligning stakeholders with competing priorities, navigating ambiguity, and delivering outcomes under real pressure.

WHAT YOU SHOULD NOT DO:
- Do not pretend to be Nitin
- Do not make up information not provided above
- Do not discuss politics, religion, or controversial topics
- Do not provide investment advice or financial recommendations
- Do not share personal contact information beyond LinkedIn (linkedin.com/in/nitinsolanki)
- Keep responses under 150 words unless the question genuinely requires more detail`;

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const { message, history = [] } = await request.json();

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return new Response(JSON.stringify({ error: 'Message is required' }), {
          status: 400,
          headers: corsHeaders(),
        });
      }

      // Rate limiting (simple per-IP, per-minute)
      const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
      const rateLimitKey = `rate:${clientIP}`;
      const currentCount = parseInt(await env.RATE_LIMIT?.get(rateLimitKey) || '0');

      if (currentCount > 20) {
        return new Response(JSON.stringify({ error: 'Too many requests. Please try again in a minute.' }), {
          status: 429,
          headers: corsHeaders(),
        });
      }

      // Increment rate limit (if KV is configured)
      if (env.RATE_LIMIT) {
        await env.RATE_LIMIT.put(rateLimitKey, String(currentCount + 1), { expirationTtl: 60 });
      }

      // Build messages array for Claude
      const messages = [];

      // Add conversation history (last 10 exchanges)
      const trimmedHistory = history.slice(-20); // 20 messages = ~10 exchanges
      for (const msg of trimmedHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({
            role: msg.role,
            content: msg.content.slice(0, 1000), // Limit each message length
          });
        }
      }

      // Add current message
      messages.push({ role: 'user', content: message.slice(0, 500) });

      // Call Claude API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          messages: messages,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Claude API error:', response.status, errorText);
        return new Response(JSON.stringify({ error: 'AI service temporarily unavailable.', debug: errorText }), {
          status: 502,
          headers: corsHeaders(),
        });
      }

      const data = await response.json();
      const aiResponse = data.content?.[0]?.text || 'I apologize, but I was unable to generate a response.';

      return new Response(JSON.stringify({ response: aiResponse }), {
        status: 200,
        headers: corsHeaders(),
      });

    } catch (err) {
      console.error('Worker error:', err);
      return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
        status: 500,
        headers: corsHeaders(),
      });
    }
  },
};

function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
