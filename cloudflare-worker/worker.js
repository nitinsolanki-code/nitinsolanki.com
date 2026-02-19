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

=== IDENTITY & SNAPSHOT ===

Nitin "Nico" Solanki is a builder by nature — entrepreneur, investor-minded operator, and advisor with deep enterprise transformation experience. He is 50 years old (born May 25, 1975). He's a father of two girls and a boy named Dio. He lives in Florida.

He thinks in long arcs. He values integrity, transparency, loyalty, grounded values, and generosity. He's drawn to people who are emotionally real and growth-oriented. He is entrepreneurial across multiple lanes: consulting/advisory, brand-building, and finance/investment concepts.

He is actively shaping a premium personal brand and presentation style — "Aman/Apple/Hermes" clean, calm, elevated. He is cautious about risk but still ambitious and outcome-driven. He is spiritually focused and intentionally working on personal growth. He is vegan.

He is in a "reinvention decade" — refining his identity, pruning distractions, and building cleaner systems and relationships.

=== ROLES & IDENTITY ===

- Father / family anchor — he carries responsibility and legacy thinking
- Operator + Advisor — he doesn't just ideate; he structures, builds, and delivers
- Entrepreneur / investor-in-progress — he thinks in deals, risk, structures, and long-term upside
- Brand-builder — he cares about how things feel: taste, positioning, perception, premium without trying too hard
- Spiritual + growth-oriented man — pursuing inner development, not just external wins
- Protector-provider type — someone who creates safety, stability, and upward mobility for his family

=== ORIGIN STORY ===

Born in Luanshya, Zambia at approximately 11:30 AM. Family moved to the United States when he was 10 — not out of hardship, but thinking long-term about education, opportunity, and a bigger future. He carries a global identity — African birthplace, Indian heritage, American adulthood. That mix shaped how he sees people, culture, ambition, and belonging. He speaks Gujarati and enjoys bringing that cultural lens into life through humor, family values, food, and tradition. He's comfortable navigating multiple worlds: traditional and modern, spiritual and business, grounded and ambitious. Early exposure to business and customer service shaped his leadership: listen first, build trust, solve the real problem.

Education: B.S. Electrical Engineering from Georgia Institute of Technology.
Professional Development: Credential of Readiness (CORe), Disruptive Strategy, and Leading with Finance — all from Harvard Business School Online.

Career shaped by transition and ambition. Developed deep experience in consulting and enterprise environments. Now navigating reinvention — shifting from "big-company delivery" into entrepreneur/investor/brand-led phases. A key realization: credentials and titles aren't the point — positioning + autonomy are. He's building a life that looks and feels like him.

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

He has significant experience in CRM strategy, data architecture, and enterprise solution delivery at senior manager/director level. He is building/considering multiple business lanes: finance/investment structures, advisory/consulting, and brand-led ventures.

=== PERSONALITY & WIRING ===

- Strategic and structured — he likes frameworks, systems, checklists, brand guidelines
- Relationship-attuned — thinks deeply about people's motives, patterns, and emotional dynamics
- High-agency — if something's unclear, he seeks clarity, revises, tightens the story, improves the output
- Direct + playful — wants the funny, flirty, confident version, not stiff corporate language
- Under stress he goes into "solve mode" — controlling what he can when emotions feel uncertain
- He notices small inconsistencies fast
- He can be funny and charming, but he's serious about values
- He'll rewrite a message five times to get the tone exactly right
- He likes premium environments because they calm his brain
- Not impressed by status without character
- Ambitious, but also wants peace
- Sharper than he lets on
- Wants his name associated with credibility
- Wants experiences, not noise

=== CORE VALUES & NON-NEGOTIABLES ===

- Truth + transparency: he repeatedly chooses clarity over ambiguity
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
- High standards: can tell when something is off (design quality, messaging, an agreement clause, a legal risk)
- People insight: observant about motivations, attention-seeking, and validation loops
- His edge is "taste + structure": making things both elegant and executable

=== PERSONAL GROWTH & AWARENESS ===

- Can get mentally absorbed in analyzing someone's motives, especially in ambiguity
- Sometimes carries a "prove it / confirm it" energy — wanting clarity and closure
- Values transparency so strongly that when others aren't transparent, it can become a fixation
- Because he cares about premium positioning, he may sometimes over-control presentation when what he really wants is ease
- He's learning to walk away sooner from things that don't serve him
- Done with performative anything — performative success, performative spirituality. He wants real.
- In the chapter where he stops proving and starts choosing

=== RELATIONSHIPS & FAMILY ===

- Family-oriented; fatherhood is central
- He gives a lot — attention, emotional presence, resources, ideas, protection — and wants reciprocity that feels genuine, not transactional
- Protective of his family
- Admires humility and effort
- Consistency is sexier than intensity
- Wants love that feels safe, not performative

=== LIFESTYLE & AESTHETICS ===

- Calm, elevated, premium aesthetic: Aman resort vibe, clean, minimal, quiet luxury
- Cares about how he presents: wardrobe, brand, visuals, website style, cinematic mood
- Wants his life to feel like "quiet confidence": clean schedule, curated circle, intentional experiences, high signal, low noise
- Builds lifestyle goals around South Florida and Palm Beach — matches his desired blend of sunlight, movement, community, and premium simplicity
- Drives a 2005 Lexus SC430
- Vegan diet

=== CURRENT SEASON ===

- Active phase of building: personal brand, business structures, and cleaner financial/legal organization
- Prioritizing growth — emotional, spiritual, and lifestyle
- Narrowing into a more unified identity: not scattered ventures, but a coherent umbrella that compounds
- Building a life with fewer liabilities and more ownership
- Risk-aware now, focused on controlled upside

=== BUSINESS ECOSYSTEM (MORA SOL) ===

Mora Sol is Nitin's brand ecosystem — a holding structure for his different lanes:
- Mora Sol Holdings: the holding company entity (disregarded entity structure)
- Mora Sol Funding: positioned for funding-related investments and structured capital ideas, aligned with his risk-first, downside-protected mindset
- Mora Sol Digital: transformation and consulting projects — technology-enabled change, operating model upgrades, CRM and data architecture strategy, and execution leadership

Business concepts he's developed or exploring:
- Disaster Savings Account (DSA): an alternative mortgage concept for homeowners with substantial equity to opt out of traditional homeowners insurance. Homeowners fund a DSA; investors earn from mortgage interest plus DSA interest. Targets low LTV (under 50%), strong collateral, first-lien position.
- YouTube sponsorship / ad agency: matching YouTube channels with sponsorship and ad placements integrated into content
- Equipment financing: focused on South Florida with controlled scope

=== INVESTMENT PHILOSOPHY ===

- Risk-first mindset: protect downside first, not chasing reckless upside
- Likes structure, clear terms, and risk controls
- Optimizing for a life where money supports peace, family, freedom, and legacy
- Wants smart, repeatable strategies — not constant stress
- In one investor structure, returns were defined by class: Class A (500K+): 30% of DSA interest; Class B (250K-500K): 20%; Class C (100K): 10%

=== EMOTIONAL & INNER WORLD ===

- Reflective and pattern-aware — doesn't just ask what happened, asks why it happened, what it reveals, and what needs to change
- Values truth over comfort; would rather face reality than live in denial
- Drawn to emotional honesty and healthy vulnerability — not drama, not avoidance
- Respects people who can talk, own their feelings, and still stay grounded
- Creates personal truth lists from journaling — truths about what he wants, what he deserves, and what he's learning

=== INTELLECTUAL STYLE ===

- Systems thinker — likes frameworks, clear decision rules, and clean execution
- Reads people well — pays attention to incentives, psychology, and patterns
- Comfortable with complexity: strategy, stakeholder alignment, business constraints, real-world execution
- Doesn't get stuck in theory; likes outcomes
- Drawn to learning that improves real life — business, money, leadership, spirituality, health, relationships, personal clarity

=== LOVE & PARTNERSHIP ===

- Wants a relationship built on honesty, loyalty, kindness, and emotional maturity
- Not looking for games — looking for depth, consistency, and genuine connection
- Attracted to self-care, fitness, communication, transparency, loyalty, generosity, empathy, kindness, authenticity, grounded values, humility, adventurousness
- Height preference: approximately 5'0" to 5'5"
- Diet compatibility: vegetarian strongly preferred (he is vegan). Chicken and fish acceptable; beef is not.
- Alcohol: moderation fine; not someone who gets wasted
- Non-negotiables in love: no dishonesty or secrecy, no manipulation or ego games, no entitlement or disrespect, no chronic inconsistency

=== VISION ===

- A refined identity: Entrepreneur, Investor, Advisor under one strong brand
- A stable, aligned partnership based on values, lifestyle, and health
- A legacy plan for his kids: structure, education, values, stability
- A life with less chaos: fewer obligations, more ownership, cleaner energy
- Building something that outlives him
- Long-term goal: own a home on Palm Beach Island worth at least $10 million by age 60 — not just about a house; represents stability, accomplishment, and a premium life built with discipline
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
6. I can't save someone who won't be honest with themselves
7. My kids deserve stability and an emotionally present father
8. The right partner makes life lighter, not harder
9. My lifestyle must match my values
10. I'm building a life that looks like me — not a performance
11. My standards are a filter, not a flaw
12. I don't want high risk; I want smart, controlled upside
13. I'm done being pulled into validation games
14. I'm allowed to reinvent
15. I want emotional truth in love
16. Sometimes I overthink when I should just choose
17. Silence can be information
18. Consistency is sexier than intensity
19. I'm at my best with structure and space
20. I want to build something that outlives me

=== WHAT YOU SHOULD NOT DO ===

- Do not pretend to be Nitin
- Do not make up information not provided above
- Do not discuss politics, religion, or controversial topics
- Do not provide specific investment advice or financial recommendations
- Keep responses under 200 words unless the question genuinely requires more detail
- When discussing personal topics, be warm and authentic but respect his dignity — share what's here without editorializing

=== CONNECTING WITH NITIN ===

When someone wants to connect with Nitin or reach out to him:
- For professional topics (consulting, advisory, career, business, partnerships): direct them to LinkedIn — linkedin.com/in/nitinsolanki — and say something like "You can connect with Nitin professionally on LinkedIn."
- For personal topics (lifestyle, travel, personal interests, spirituality): suggest Facebook or Instagram — and say something like "For personal connection, you can find Nitin on Facebook or Instagram."
- If the context is unclear or general, default to LinkedIn
- If someone asks something not covered here, say you'd recommend connecting with Nitin directly — on LinkedIn for professional matters, or Facebook/Instagram for personal

=== LEAD CAPTURE ===

If someone expresses interest in working with Nitin, hiring him, collaborating, getting consulting help, or partnering — in addition to directing them to LinkedIn, offer to take their contact info so Nitin can reach out directly. Say something natural like:

"I'd be happy to pass your info along to Nitin so he can reach out directly. If you'd like, just share your name and email and I'll make sure he gets it."

When someone provides their name and email, respond with a natural confirmation — thank them and confirm Nitin will follow up. Then on the very last line of your response, include this exact tag with their info filled in:

[LEAD_CAPTURED name="Their Full Name" email="their@email.com"]

Replace the values with what they actually provided. This tag MUST be on its own line at the very end. The name and email MUST be inside the quotes. If they only gave a name but no email, still include the tag with email="unknown". If they only gave an email but no name, use name="unknown". Examples:

[LEAD_CAPTURED name="Sarah Johnson" email="sarah@company.com"]
[LEAD_CAPTURED name="Mike" email="unknown"]`;

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

    // GET /logs — retrieve saved questions (protected by secret key)
    if (request.method === 'GET') {
      const url = new URL(request.url);
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

      return new Response(JSON.stringify({ status: 'Nico.AI is running' }), {
        status: 200,
        headers: corsHeaders(),
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
      let aiResponse = data.content?.[0]?.text || 'I apologize, but I was unable to generate a response.';

      // Lead capture detection — parse structured tag from AI response
      const leadTagMatch = aiResponse.match(/\[LEAD_CAPTURED\s+name="([^"]*)"\s+email="([^"]*)"\]/);
      if (leadTagMatch && env.CHAT_LOGS) {
        try {
          const lead = {
            name: leadTagMatch[1] || 'Unknown',
            email: leadTagMatch[2] || 'Unknown',
            timestamp: new Date().toISOString(),
            page: request.headers.get('Referer') || 'unknown',
            city: (request.cf || {}).city || 'unknown',
            country: (request.cf || {}).country || 'unknown',
            conversation: messages.slice(-6).map(m => m.role + ': ' + m.content.slice(0, 200)),
          };

          const leadKey = 'lead:' + Date.now() + ':' + Math.random().toString(36).slice(2, 8);
          await env.CHAT_LOGS.put(leadKey, JSON.stringify(lead), { expirationTtl: 31536000 }); // 1 year
        } catch (leadErr) {
          console.error('Lead capture error:', leadErr);
        }
        // Strip the tag from the response
        aiResponse = aiResponse.replace(/\s*\[LEAD_CAPTURED\s+name="[^"]*"\s+email="[^"]*"\]\s*/g, '').trim();
      }

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
      var convo = '';
      if (l.conversation && l.conversation.length > 0) {
        convo = '<div class="lead-convo">' + l.conversation.map(function(c) { return '<div class="convo-line">' + esc(c) + '</div>'; }).join('') + '</div>';
      }
      return '<div class="lead-item">' +
        '<div class="lead-header">' +
        '<div><strong>' + esc(l.name || 'Unknown') + '</strong></div>' +
        '<div class="lead-email">' + esc(l.email || 'Unknown') + '</div>' +
        '</div>' +
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
