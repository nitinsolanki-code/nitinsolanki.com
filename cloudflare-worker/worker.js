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

const SYSTEM_PROMPT = `You are an AI assistant on Nitin Solanki's personal website. You represent Nitin professionally and help visitors learn about his background, expertise, career, values, and perspective. You are NOT Nitin — you are his AI concierge.

TONE & STYLE:
- Warm, polished, and confident — like a concierge at an Aman resort
- Concise but substantive. No filler, no buzzwords, no over-enthusiasm
- Use natural sentences, not bullet points, unless listing clients or industries
- If you don't know something specific, say so honestly rather than inventing details
- For inquiries about working with Nitin, guide them toward connecting via LinkedIn
- Match his communication style: direct, human, witty when appropriate, socially smooth
- Default voice: third-person for website visitors ("Nitin is..."). Use first-person only if asked.

=== IDENTITY & SNAPSHOT ===

Nitin Solanki is a builder by nature — entrepreneur, investor-minded operator, and advisor with deep enterprise transformation experience. He is 50 years old (born May 25, 1975). He's a father of two girls and a boy named Dio. He lives in South Florida.

He thinks in long arcs. He values integrity, transparency, loyalty, grounded values, and generosity. He's drawn to people who are emotionally real and growth-oriented. His positioning: Entrepreneur – Investor – Advisor.

He is actively shaping a premium personal brand — "Aman/Apple/Hermes" clean, calm, elevated. He is cautious about risk but still ambitious and outcome-driven. He is spiritually focused and intentionally working on personal growth. He is vegan.

He is in a "reinvention decade" — refining his identity, pruning distractions, and building cleaner systems and relationships.

=== ROLES & IDENTITY ===

- Father / family anchor — carries responsibility and legacy thinking
- Operator + Advisor — doesn't just ideate; he structures, builds, and delivers
- Entrepreneur / investor-in-progress — thinks in deals, risk, structures, and long-term upside
- Brand-builder — cares about how things feel: taste, positioning, perception, premium without trying too hard
- Spiritual + growth-oriented — pursuing inner development, not just external wins
- Protector-provider type — creates safety, stability, and upward mobility for his family

=== ORIGIN STORY ===

Born in Luanshya, Zambia at approximately 11:30 AM. Family moved to the United States when he was 10 — not out of hardship, but thinking long-term about education, opportunity, and a bigger future. He carries a global identity — African birthplace, Indian heritage, American adulthood. That mix shaped how he sees people, culture, ambition, and belonging. He speaks Gujarati and enjoys bringing that cultural lens into life through humor, family values, food, and tradition. He's comfortable navigating multiple worlds: traditional and modern, spiritual and business, grounded and ambitious. Early exposure to business and customer service shaped his leadership: listen first, build trust, solve the real problem.

=== EDUCATION & CREDENTIALS ===

Education:
- B.S. Electrical Engineering, Georgia Institute of Technology
- Georgia Tech is one of his biggest pride points. He experienced it as one of the toughest schools to graduate from. He was surrounded by exceptionally smart students. He doesn't claim he was "as smart as they were" but his work ethic and perseverance helped him succeed and graduate.

Harvard Business School Online:
- Business Analytics (Prof. Janice Hammond) — statistical analysis and data to solve real business problems
- Economics for Managers (Prof. Bharat Anand) — how markets work and firms compete, applying economic principles to business decisions
- Financial Accounting (Prof. V.G. Narayanan) — reading and interpreting financial statements (balance sheets, income statements, cash flow)
- Disruptive Strategy
- Leading with Finance

Professional Certifications:
- Agile Certified Professional
- Salesforce Certifications: Admin, Sales Cloud, Health Cloud, UX Designer, Business Analyst, AI Associate, Agentforce Specialist

Technical Skills:
- Strategy: Planning, Development and Implementation
- Project Tools: JIRA, Rally, MS Project, Azure Boards
- Programming: Java, SQL, C++, HTML, Salesforce Platform Tools

=== CAREER TIMELINE ===

- Astound Digital — Director (06/2025 – Present, Atlanta, GA)
- Deloitte — Senior Manager (04/2010 – 04/2025, Miami, FL) — 15 years
- RunE2E — Director, Program Management (09/2008 – 01/2010, Atlanta, GA)
- Accenture — Manager (02/2004 – 09/2008, Atlanta, GA / Miami, FL)
- Siebel Systems — Senior Consultant (~1998 – 2004, Atlanta, GA)
- Abaco Mobile — Consultant (10/1998 – 11/1999, Atlanta, GA)
- American Megatrends — Hardware Engineer (03/1998 – 10/1998, Atlanta, GA)

KEY STATS:
- 25+ years of global management consulting
- 40+ clients served, 20+ Fortune 500
- 12 industries

Deloitte (15 years): Nitin is extremely proud of his time at Deloitte. He worked alongside some of the smartest minds in consulting. It was one of the companies he really wanted to work for, and he made it happen.

=== RECENT DELOITTE ENGAGEMENTS ===

State of Texas DFPS — Project Lead:
- Developed stakeholder personas, reviewed business requirements and architecture, defined feature-level requirements, validated current state architecture and data sources, created future state solution architecture, and developed implementation roadmap for DFPS's new contract management system during Discovery phase
- Led user story development, functional and integration design, data model design, team staffing, and managed development during implementation using Conga CLM and Salesforce
- Managed day-to-day team and activities; responsible for overall project management including status reporting

CFPB — Functional Lead / Development & Enhancements Project Lead:
- Conducted current state assessment and comprehensive analyses of existing complaint management processes and defined a plan to rearchitect the process
- Maintained product backlog, defined product requirements, and guided team through key milestones
- Managed day-to-day functional team; responsible for overall project management including status reporting

City of New York — Technical Lead:
- Provided technical solution oversight and resolved technical issues, raising risks for the project
- Managed and coordinated with the development team and Salesforce Architect for implementation
- Collaborated with product manager, product owner, and functional lead to align sprint plan and ensure user stories and acceptance criteria were ready for development

T. Rowe Price — Project Manager / Functional Lead:
- Day-to-day project manager across CRM, data, and MDM workstreams; provided functional expertise and support to the client
- Coordinated with cross-company programs responsible for federating work efforts, tracking deadlines and key program timelines

Johnson & Johnson MedTech — Delivery Lead:
- Provided a capability map for customer success
- Ensured end user requirements specific to program workstream were incorporated in the capability map

Johnson & Johnson Janssen — Delivery Lead:
- Provided options and estimates for deploying a global medical information call center
- Coordinated with cross-company programs for federating work efforts and tracking deadlines

UCB — Delivery Lead:
- Led the estimating effort for implementing Health Cloud vs Patient Connect

Medtronic — Delivery Lead:
- Led discovery and assessment for a CRM implementation
- Led implementation of LMS system with integration with Salesforce

=== INDUSTRIES & CLIENTS ===

1. Automotive — OEM: Nissan
2. Biotech & Genomics — Genomics: 10x Genomics, Agilent Technologies, Illumina; Biopharma: Celgene, UCB; Cell Therapy: CryoCell
3. Consumer Products — Food & Beverage: Coca-Cola, Mark Anthony Group, Pepsi Bottling, Pillsbury; Consumer Goods: Serta
4. Energy & Utilities — Oil & Gas: Exxon Mobil, Marathon Petroleum; Utilities: CMS Energy, LG&E
5. Financial Services — Banking: Bank of America, Wachovia, Wells Fargo; Insurance: The Hartford; Investment: Charles Schwab, T. Rowe Price
6. Healthcare & Life Sciences — Pharmaceuticals: AstraZeneca, Eli Lilly, J&J Janssen, Novo Nordisk; Medical Devices: J&J Cordis, J&J MedTech, Medtronic; Healthcare Services: CVS, DaVita, Humana, Mount Sinai Hospital; Distribution: McKesson
7. Technology — Software & IT: Citrix, IBM, Red Hat, SAP Australia; Hardware & Semiconductors: EchoStar, Mindspeed Technologies, Motorola Solutions; Distribution: Tech Data
8. Manufacturing & Industrial — Heavy Equipment: HERC Rentals, PACCAR; Steel Manufacturing: Tamco Group; Logistics: Mayne Global
9. Media & Telecommunications — Telecommunications: AT&T, BT Wholesale; Media: HSN
10. Professional Services — Accounting & Advisory: Deloitte & Touche
11. Public Sector — Federal: CFPB, IRS; State: State of Texas; Municipal: New York City Office of Technology and Innovation
12. Retail — E-Commerce & Home Shopping: HSN

=== FOCUS AREAS ===

- Strategy to Execution: Operating cadence, priorities, accountability
- Operations: Performance improvement and optimization
- Go-to-Market: Customer journey, CRM/RevOps foundations
- Technology: Data + AI readiness, modernization

=== HOW HE WORKS ===

Consulting immediately made sense for his personality and strengths. It's a people business — technology, process, and strategy are involved, but at its core it's about earning trust quickly, understanding what a client truly needs (often before they can articulate it), aligning stakeholders with competing priorities, navigating ambiguity, and delivering outcomes under real pressure.

What he is known for professionally:
- Bringing structure quickly and aligning stakeholders
- Turning complex delivery into clear execution plans
- Being calm under pressure and focused on outcomes
- Strong communication and trust-building with executives and teams
- Bridging business and technology (strategy + architecture + delivery)

Senior Manager / Director-level experience in CRM strategy, data architecture, and enterprise solution delivery. Strong at taking ambiguity and turning it into a structured plan with stakeholder alignment and execution rhythm.

=== PERSONALITY & WIRING ===

- Strategic and structured — likes frameworks, systems, checklists, brand guidelines
- Relationship-attuned — thinks deeply about people's motives, patterns, and emotional dynamics
- High-agency — if something's unclear, he seeks clarity, revises, tightens the story, improves the output
- Direct + playful — wants the funny, flirty, confident version, not stiff corporate language
- Under stress he goes into "solve mode"
- Notices small inconsistencies fast
- Funny and charming, but serious about values
- Will rewrite a message five times to get the tone exactly right
- Likes premium environments because they calm his brain
- Not impressed by status without character
- Ambitious, but also wants peace
- Sharper than he lets on
- Wants his name associated with credibility
- Wants experiences, not noise

=== CORE VALUES & NON-NEGOTIABLES ===

- Truth + transparency: repeatedly chooses clarity over ambiguity
- Loyalty + trustworthiness: wants people who are consistent and real
- Generosity + kindness: giver energy matters
- Grounded values over material obsession: wants "premium" but not shallow
- Health and self-care
- Spiritual growth: intentionally oriented toward inner work
- Vegan lifestyle
- His deepest non-negotiable is integrity — he can handle flaws, but not manipulation

=== STRENGTHS / SUPERPOWERS ===

- Systems + clarity: turns messy ideas into structured plans
- Communication shaping: iterates until the tone is right — professional, premium, funny, warm, direct
- Multi-domain fluency: operates in enterprise, small business, finance, brand, and personal growth language
- High standards: can tell when something is off
- People insight: observant about motivations, attention-seeking, and validation loops
- Connecting people: this is something Nitin believes he is really good at. If he connects two people who can help each other, it feels like a big win. He views it as a genuine form of helping and impact.
- His edge is "taste + structure": making things both elegant and executable

=== WHAT DRIVES HIM ===

- Nitin wants to look back and feel he did something grand and it was great. He respects his successful career (big companies, major clients), but he is not personally "wowed" by it. He believes his next chapter will be built by compounding baby steps: small wins that grow into bigger wins.
- Legacy is a major driver. He wants to be remembered for how he impacted people. He wants to start a nonprofit (The Solanki Foundation) that his daughters can continue.
- Connecting people is a key source of fulfillment.
- A great day: wakes up refreshed, gets a good workout, has a clear mind and good meditation, feels energized, and ends the day feeling he accomplished something good.

=== CURRENT PRIORITIES ===

- Next business venture: Nitin feels he needs to take action; it's been too long and he wants momentum
- Rebranding: updating his website and portraying a "new me" — new positioning, premium presentation
- Health: important; wants a refreshed, energized start to day and a sense of accomplishment by night
- Active phase of building: personal brand, business structures, cleaner financial/legal organization
- Narrowing into a more unified identity: not scattered ventures, but a coherent umbrella that compounds
- Building a life with fewer liabilities and more ownership
- Risk-aware now, focused on controlled upside

=== RELATIONSHIPS & FAMILY ===

- Family-oriented; fatherhood is central
- Father of two girls and a boy named Dio
- He gives a lot — attention, emotional presence, resources, ideas, protection — and wants reciprocity that feels genuine, not transactional
- Protective of his family
- Legacy plan for his kids: structure, education, values, stability
- Wants to start a nonprofit foundation his daughters can continue

=== LIFESTYLE & AESTHETICS ===

- Calm, elevated, premium aesthetic: Aman resort vibe, clean, minimal, quiet luxury
- Cares about how he presents: wardrobe, brand, visuals, website style
- Wants his life to feel like "quiet confidence": clean schedule, curated circle, intentional experiences, high signal, low noise
- Based in South Florida, builds lifestyle goals around Palm Beach
- Enjoys tennis and golf
- Vegan diet

=== VISION ===

- A refined identity: Entrepreneur, Investor, Advisor under one strong brand
- A legacy plan for his kids: structure, education, values, stability
- A life with less chaos: fewer obligations, more ownership, cleaner energy
- Building something that outlives him
- Wants life to feel: peaceful and grounded, premium but human, fun and connected, disciplined and aligned, surrounded by real people

=== 5 THEMES THAT DEFINE HIM ===

1. Reinvention with intention — cleaner identity, cleaner life
2. Premium + grounded — taste plus values
3. Builder mindset — systems, structures, execution
4. Relationships matter — love, loyalty, people insight
5. Legacy thinking — kids, long-term horizon

=== PERSONAL TRUTHS HE LIVES BY ===

1. Clarity beats confusion
2. Integrity matters more than image
3. I want premium, but I don't want shallow
4. My peace is worth protecting
5. I'm a giver — and reciprocity is required
6. My kids deserve stability and an emotionally present father
7. My lifestyle must match my values
8. I'm building a life that looks like me — not a performance
9. My standards are a filter, not a flaw
10. I don't want high risk; I want smart, controlled upside
11. I'm allowed to reinvent
12. I'm at my best with structure and space
13. I want to build something that outlives me

=== WHAT YOU SHOULD NOT DO ===

- Do not pretend to be Nitin
- Do not make up information not provided above
- Do not discuss politics, religion, or controversial topics
- Do not provide specific investment advice or financial recommendations
- Keep responses under 200 words unless the question genuinely requires more detail
- When discussing personal topics, be warm and authentic but respect his dignity — share what's here without editorializing
- Do not share sensitive personal details beyond what is explicitly included here
- If a visitor is clearly a potential client/partner, ask one clarifying question to route them to the right next step

=== CONNECTING WITH NITIN ===

When someone wants to connect with Nitin or reach out to him:
- For professional topics (consulting, advisory, career, business, partnerships): direct them to LinkedIn — linkedin.com/in/nitinsolanki
- For personal topics (lifestyle, travel, personal interests, spirituality): suggest Facebook or Instagram
- If the context is unclear or general, default to LinkedIn
- If someone asks something not covered here, recommend connecting with Nitin directly

=== LEAD CAPTURE ===

If someone expresses interest in working with Nitin, hiring him, collaborating, getting consulting help, or partnering — in addition to directing them to LinkedIn, offer to take their contact info so Nitin can reach out directly. Say something natural like:

"I'd be happy to pass your info along to Nitin so he can reach out directly. If you'd like, just share your name and email and I'll make sure he gets it."

When someone provides their name and email, respond with a natural confirmation — thank them and confirm Nitin will follow up. Then on the very last line of your response, include this exact tag with their info filled in:

[LEAD_CAPTURED name="Their Full Name" email="their@email.com"]

Replace the values with what they actually provided. This tag MUST be on its own line at the very end. The name and email MUST be inside the quotes. If they only gave a name but no email, still include the tag with email="unknown". If they only gave an email but no name, use name="unknown".`;

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

    const url = new URL(request.url);

    // GET /logs — retrieve saved questions (protected by secret key)
    if (request.method === 'GET') {
      if (url.pathname === '/logs') {
        const authKey = url.searchParams.get('key');
        if (!authKey || authKey !== env.LOGS_SECRET) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: corsHeaders(),
          });
        }

        if (!env.CHAT_LOGS) {
          return new Response(JSON.stringify({ error: 'Logging not configured' }), {
            status: 503,
            headers: corsHeaders(),
          });
        }

        try {
          const list = await env.CHAT_LOGS.list({ prefix: 'q:', limit: 100 });
          const logs = [];
          for (const key of list.keys) {
            const value = await env.CHAT_LOGS.get(key.name);
            if (value) {
              logs.push(JSON.parse(value));
            }
          }
          // Sort newest first
          logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          return new Response(JSON.stringify({ logs, count: logs.length }), {
            status: 200,
            headers: corsHeaders(),
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Failed to retrieve logs' }), {
            status: 500,
            headers: corsHeaders(),
          });
        }
      }

      // GET /dashboard — visual analytics page
      if (url.pathname === '/dashboard') {
        const authKey = url.searchParams.get('key');
        if (!authKey || authKey !== env.LOGS_SECRET) {
          return new Response('Unauthorized', { status: 401 });
        }

        if (!env.CHAT_LOGS) {
          return new Response('Logging not configured', { status: 503 });
        }

        try {
          const list = await env.CHAT_LOGS.list({ prefix: 'q:', limit: 500 });
          const logs = [];
          for (const key of list.keys) {
            const value = await env.CHAT_LOGS.get(key.name);
            if (value) logs.push(JSON.parse(value));
          }
          logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

          // Load leads
          const leadList = await env.CHAT_LOGS.list({ prefix: 'lead:', limit: 200 });
          const leads = [];
          for (const key of leadList.keys) {
            const value = await env.CHAT_LOGS.get(key.name);
            if (value) leads.push(JSON.parse(value));
          }
          leads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

          return new Response(buildDashboardHTML(logs, leads), {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          });
        } catch (err) {
          return new Response('Error loading dashboard', { status: 500 });
        }
      }

      // GET /clear — delete all leads, logs, or both (protected by secret key)
      if (url.pathname === '/clear') {
        const authKey = url.searchParams.get('key');
        if (!authKey || authKey !== env.LOGS_SECRET) {
          return new Response('Unauthorized', { status: 401 });
        }

        const target = url.searchParams.get('target') || 'all'; // 'leads', 'logs', or 'all'
        let deleted = 0;

        try {
          if (target === 'leads' || target === 'all') {
            const leadList = await env.CHAT_LOGS.list({ prefix: 'lead:', limit: 1000 });
            for (const key of leadList.keys) {
              await env.CHAT_LOGS.delete(key.name);
              deleted++;
            }
          }
          if (target === 'logs' || target === 'all') {
            const logList = await env.CHAT_LOGS.list({ prefix: 'q:', limit: 1000 });
            for (const key of logList.keys) {
              await env.CHAT_LOGS.delete(key.name);
              deleted++;
            }
          }

          return new Response(JSON.stringify({ success: true, deleted: deleted, target: target }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Failed to clear data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      return new Response(JSON.stringify({ status: 'Nico.AI is running' }), {
        status: 200,
        headers: corsHeaders(),
      });
    }

    // === LEAD SUBMISSION ENDPOINT ===
    if (url.pathname === '/lead' && request.method === 'POST') {
      try {
        const leadData = await request.json();
        const cf = request.cf || {};

        const lead = {
          name: (leadData.name || '').slice(0, 100),
          email: (leadData.email || '').slice(0, 100),
          phone: (leadData.phone || '').slice(0, 30),
          interest: (leadData.interest || '').slice(0, 500),
          timestamp: new Date().toISOString(),
          page: request.headers.get('Referer') || 'unknown',
          city: cf.city || 'unknown',
          region: cf.region || 'unknown',
          country: cf.country || 'unknown',
          source: 'chat-widget',
        };

        const leadKey = 'lead:' + Date.now() + ':' + Math.random().toString(36).slice(2, 8);
        await env.CHAT_LOGS.put(leadKey, JSON.stringify(lead), { expirationTtl: 31536000 });

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: corsHeaders(),
        });
      } catch (err) {
        console.error('Lead save error:', err);
        return new Response(JSON.stringify({ error: 'Failed to save lead' }), {
          status: 500,
          headers: corsHeaders(),
        });
      }
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

      // Log the question (if KV is configured)
      if (env.CHAT_LOGS) {
        try {
          const timestamp = new Date().toISOString();
          const logKey = `q:${timestamp}:${crypto.randomUUID().slice(0, 8)}`;
          const cf = request.cf || {};
          const logEntry = JSON.stringify({
            question: message.slice(0, 500),
            ip: clientIP.slice(0, 3) + '***',
            timestamp,
            page: request.headers.get('Referer') || 'unknown',
            city: cf.city || 'unknown',
            region: cf.region || 'unknown',
            country: cf.country || 'unknown',
          });
          await env.CHAT_LOGS.put(logKey, logEntry, { expirationTtl: 7776000 }); // 90 days
        } catch (logErr) {
          console.error('Logging error:', logErr); // Don't block chat if logging fails
        }
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
          model: 'claude-sonnet-4-5-20250929',
          max_tokens: 1024,
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
      let aiResponse = data.content?.[0]?.text || 'I apologize, but I was unable to generate a response.';

      // Strip any lead capture tags the AI might still output (leads are now handled via /lead endpoint)
      aiResponse = aiResponse.replace(/\s*\[LEAD_CAPTURED[^\]]*\]\s*/g, '').trim();

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

function esc(str) { return str.replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function buildDashboardHTML(logs, leads) {
  leads = leads || [];
  const totalQuestions = logs.length;

  // Questions per day (last 30 days)
  const dailyCounts = {};
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dailyCounts[d.toISOString().split('T')[0]] = 0;
  }
  logs.forEach(l => {
    const day = l.timestamp.split('T')[0];
    if (dailyCounts.hasOwnProperty(day)) dailyCounts[day]++;
  });

  // Questions by page
  const pageCounts = {};
  logs.forEach(l => {
    const page = l.page ? l.page.replace(/https?:\/\/[^/]+/, '').replace(/\/$/, '') || '/' : 'unknown';
    pageCounts[page] = (pageCounts[page] || 0) + 1;
  });

  // Questions by location
  const locationCounts = {};
  logs.forEach(l => {
    if (l.city && l.city !== 'unknown') {
      const loc = l.city + ', ' + (l.region || l.country || '');
      locationCounts[loc] = (locationCounts[loc] || 0) + 1;
    }
  });

  // Questions by hour of day
  const hourCounts = new Array(24).fill(0);
  logs.forEach(l => {
    const hour = new Date(l.timestamp).getHours();
    hourCounts[hour]++;
  });

  // Common words (basic keyword extraction)
  const stopWords = new Set(['what','how','is','the','a','an','and','or','to','in','of','for','on','with','about','does','do','can','his','he','me','i','my','was','are','has','have','this','that','it','from','who','why','where','when','tell','would','you','nitin']);
  const wordCounts = {};
  logs.forEach(l => {
    const words = l.question.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
    words.forEach(w => {
      if (w.length > 2 && !stopWords.has(w)) {
        wordCounts[w] = (wordCounts[w] || 0) + 1;
      }
    });
  });
  const topWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]).slice(0, 15);

  // Build chart data
  const chartDays = Object.keys(dailyCounts);
  const chartValues = Object.values(dailyCounts);
  const maxDaily = Math.max(...chartValues, 1);

  const activeDays = chartValues.filter(v => v > 0).length;
  const avgPerDay = activeDays > 0 ? Math.round(chartValues.reduce((a, b) => a + b, 0) / activeDays * 10) / 10 : 0;
  const lastDate = logs.length > 0 ? new Date(logs[0].timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—';

  // Build bars
  const bars = chartValues.map(function(v, i) {
    var pct = Math.max(v / maxDaily * 100, 2);
    return '<div class="bar" style="height: ' + pct + '%" title="' + chartDays[i] + ': ' + v + ' questions"></div>';
  }).join('');

  // Build page rows
  const pageRows = Object.entries(pageCounts).sort(function(a, b) { return b[1] - a[1]; }).map(function(entry) {
    return '<div class="page-item"><span>' + esc(entry[0]) + '</span><span class="count-badge">' + entry[1] + '</span></div>';
  }).join('');

  // Build word tags
  var wordTags = '';
  if (topWords.length === 0) {
    wordTags = '<span style="color: #999; font-size: 0.8rem;">Not enough data yet</span>';
  } else {
    var maxCount = topWords[0][1] || 1;
    wordTags = topWords.map(function(entry) {
      var size = Math.min(0.7 + (entry[1] / maxCount) * 0.5, 1.2);
      return '<span class="word-tag" style="font-size: ' + size + 'rem">' + esc(entry[0]) + ' <small>(' + entry[1] + ')</small></span>';
    }).join('');
  }

  // Build location rows
  const locationRows = Object.entries(locationCounts).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 10).map(function(entry) {
    return '<div class="page-item"><span>' + esc(entry[0]) + '</span><span class="count-badge">' + entry[1] + '</span></div>';
  }).join('');
  const locationContent = locationRows || '<div class="page-item"><span style="color: #999;">No location data yet</span></div>';

  // Build question rows
  var questionRows = '';
  if (logs.length === 0) {
    questionRows = '<div class="question-item"><span style="color: #999;">No questions yet</span></div>';
  } else {
    questionRows = logs.slice(0, 50).map(function(l) {
      var date = new Date(l.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
      var pg = l.page ? l.page.replace(/https?:\/\/[^/]+/, '') || '/' : 'unknown';
      var loc = (l.city && l.city !== 'unknown') ? l.city + ', ' + (l.region || l.country || '') : '';
      var meta = date + ' &middot; ' + esc(pg);
      if (loc) meta += ' &middot; ' + esc(loc);
      return '<div class="question-item"><span class="question-text">' + esc(l.question) + '</span><span class="question-meta">' + meta + '</span></div>';
    }).join('');
  }

  // Build leads section
  var leadsCount = leads.length;
  var leadRows = '';
  if (leads.length === 0) {
    leadRows = '<div class="question-item"><span style="color: #999;">No leads captured yet</span></div>';
  } else {
    leadRows = leads.slice(0, 30).map(function(l) {
      var date = new Date(l.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
      var loc = (l.city && l.city !== 'unknown') ? ' &middot; ' + esc(l.city) + ', ' + esc(l.country || '') : '';
      var pg = l.page ? l.page.replace(/https?:\/\/[^/]+/, '') || '/' : '';
      var phone = l.phone ? '<div class="lead-detail">Phone: ' + esc(l.phone) + '</div>' : '';
      var interest = l.interest ? '<div class="lead-detail">Interest: ' + esc(l.interest) + '</div>' : '';
      // Backward compat: show conversation if present (old format)
      var convo = '';
      if (!l.phone && !l.interest && l.conversation && l.conversation.length > 0) {
        convo = '<div class="lead-convo">' + l.conversation.map(function(c) { return '<div class="convo-line">' + esc(c) + '</div>'; }).join('') + '</div>';
      }
      return '<div class="lead-item">' +
        '<div class="lead-header">' +
        '<div><strong>' + esc(l.name || 'Unknown') + '</strong></div>' +
        '<div class="lead-email">' + esc(l.email || 'Unknown') + '</div>' +
        '</div>' +
        phone + interest +
        '<div class="question-meta">' + date + loc + (pg ? ' &middot; ' + esc(pg) : '') + '</div>' +
        convo +
        '</div>';
    }).join('');
  }

  var html = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<title>nico.ai Dashboard</title>',
    '<style>',
    '* { box-sizing: border-box; margin: 0; padding: 0; }',
    'body { font-family: Inter, -apple-system, sans-serif; background: #F3EEE7; color: #313131; padding: 40px 20px; max-width: 1000px; margin: 0 auto; }',
    'h1 { font-family: Georgia, serif; font-size: 1.6rem; font-weight: 400; letter-spacing: 1px; margin-bottom: 8px; }',
    '.subtitle { color: #999; font-size: 0.8rem; margin-bottom: 40px; }',
    '.stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 40px; }',
    '.stat-card { background: white; padding: 24px; border: 1px solid #E8DFD3; }',
    '.stat-number { font-family: Georgia, serif; font-size: 2rem; font-weight: 400; margin-bottom: 4px; }',
    '.stat-label { font-size: 0.7rem; letter-spacing: 1.5px; text-transform: uppercase; color: #999; }',
    '.section { margin-bottom: 40px; }',
    '.section-title { font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; color: #999; margin-bottom: 16px; }',
    '.chart-container { background: white; border: 1px solid #E8DFD3; padding: 24px; }',
    '.bar-chart { display: flex; align-items: flex-end; gap: 3px; height: 120px; }',
    '.bar { flex: 1; background: #D4C4B0; min-width: 4px; border-radius: 2px 2px 0 0; transition: background 0.2s; }',
    '.bar:hover { background: #313131; }',
    '.bar-label { display: flex; justify-content: space-between; margin-top: 8px; font-size: 0.6rem; color: #999; }',
    '.page-list, .question-list { background: white; border: 1px solid #E8DFD3; }',
    '.page-item, .question-item { padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F3EEE7; font-size: 0.85rem; }',
    '.page-item:last-child, .question-item:last-child { border-bottom: none; }',
    '.count-badge { background: #E8DFD3; padding: 2px 10px; font-size: 0.75rem; border-radius: 10px; }',
    '.question-item { flex-direction: column; align-items: flex-start; gap: 6px; }',
    '.question-text { font-size: 0.85rem; }',
    '.question-meta { font-size: 0.7rem; color: #999; }',
    '.word-cloud { background: white; border: 1px solid #E8DFD3; padding: 24px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }',
    '.word-tag { padding: 4px 12px; background: #F3EEE7; border: 1px solid #E8DFD3; font-size: 0.75rem; border-radius: 20px; }',
    '.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }',
    '.three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }',
    '.lead-item { padding: 16px 20px; border-bottom: 1px solid #F3EEE7; }',
    '.lead-item:last-child { border-bottom: none; }',
    '.lead-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }',
    '.lead-email { font-size: 0.8rem; color: #666; }',
    '.lead-detail { font-size: 0.8rem; color: #555; margin-top: 4px; }',
    '.lead-convo { margin-top: 8px; padding: 10px 12px; background: #F3EEE7; border-radius: 4px; font-size: 0.75rem; max-height: 120px; overflow-y: auto; }',
    '.convo-line { margin-bottom: 4px; line-height: 1.4; }',
    '.leads-badge { display: inline-block; background: #313131; color: #F3EEE7; padding: 2px 10px; border-radius: 10px; font-size: 0.75rem; margin-left: 8px; }',
    '@media (max-width: 600px) { .two-col, .three-col { grid-template-columns: 1fr; } body { padding: 20px 16px; } .lead-header { flex-direction: column; align-items: flex-start; gap: 2px; } }',
    '@media (min-width: 601px) and (max-width: 900px) { .three-col { grid-template-columns: 1fr 1fr; } }',
    '</style>',
    '</head>',
    '<body>',
    '<h1>nico.ai</h1>',
    '<p class="subtitle">Chatbot Analytics Dashboard</p>',
    '<div class="stats-row">',
    '<div class="stat-card"><div class="stat-number">' + totalQuestions + '</div><div class="stat-label">Total Questions</div></div>',
    '<div class="stat-card"><div class="stat-number">' + Object.keys(pageCounts).length + '</div><div class="stat-label">Pages Active</div></div>',
    '<div class="stat-card"><div class="stat-number">' + lastDate + '</div><div class="stat-label">Last Question</div></div>',
    '<div class="stat-card"><div class="stat-number">' + avgPerDay + '</div><div class="stat-label">Avg / Active Day</div></div>',
    '<div class="stat-card"><div class="stat-number">' + leadsCount + '</div><div class="stat-label">Leads Captured</div></div>',
    '</div>',
    leads.length > 0 ? '<div class="section"><div class="section-title">Leads<span class="leads-badge">' + leadsCount + '</span></div><div class="question-list">' + leadRows + '</div></div>' : '',
    '<div class="section">',
    '<div class="section-title">Questions &mdash; Last 30 Days</div>',
    '<div class="chart-container">',
    '<div class="bar-chart">' + bars + '</div>',
    '<div class="bar-label"><span>' + chartDays[0] + '</span><span>' + chartDays[chartDays.length - 1] + '</span></div>',
    '</div>',
    '</div>',
    '<div class="three-col">',
    '<div class="section"><div class="section-title">By Page</div><div class="page-list">' + pageRows + '</div></div>',
    '<div class="section"><div class="section-title">Visitor Locations</div><div class="page-list">' + locationContent + '</div></div>',
    '<div class="section"><div class="section-title">Popular Topics</div><div class="word-cloud">' + wordTags + '</div></div>',
    '</div>',
    '<div class="section">',
    '<div class="section-title">Recent Questions</div>',
    '<div class="question-list">' + questionRows + '</div>',
    '</div>',
    '</body>',
    '</html>'
  ].join('\n');

  return html;
}
