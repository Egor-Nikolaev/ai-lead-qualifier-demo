export type Segment = 'A' | 'B' | 'C1' | 'C2' | 'D'
export type Priority = 'high' | 'medium' | 'low'
export type Confidence = 'high' | 'medium' | 'low'

export interface Signal {
  text: string
  source: string
  date: string
  severity: 'critical' | 'warning' | 'info'
}

export interface CompanyResult {
  id: string
  name: string
  website: string
  industry: string
  logo: string

  enrichment: {
    legal_name: string
    inn: string
    revenue_rub: number | null
    revenue_note?: string
    employees: number | null
    founded: number
    key_person: string
    key_person_role: string
    summary: string
    demand_signals: string[]
    media_mentions: string[]
    confidence: Confidence
  }

  scoring: {
    segment: Segment
    weight: number
    category: string
    reason: string
    psychotype: string
    red_flags: Signal[]
    scoring_factors: { factor: string; points: number }[]
  }

  followup: {
    subject: string
    body: string
  }

  bizdev: {
    recommended_manager: string
    priority: Priority
    reason: string
    reasoning: string[]
  }

  timing: {
    enrichment_ms: number
    scoring_ms: number
    cost_usd: number
    tokens_in: number
    tokens_out: number
    model: string
  }
}

export const COMPANIES: CompanyResult[] = [
  {
    id: 'yclients',
    name: 'YClients',
    website: 'yclients.com',
    industry: 'SaaS / Beauty tech',
    logo: 'Y',
    enrichment: {
      legal_name: 'ООО «Уай-клиентс»',
      inn: '7728848223',
      revenue_rub: 4_100_000_000,
      employees: 620,
      founded: 2010,
      key_person: 'Юрий Петров',
      key_person_role: 'CEO & founder',
      summary:
        'Cloud CRM for beauty and wellness. 55k salons, 10M end users. Actively expanding into medical, fitness and dental verticals. Owned by Sber Ecosystem since 2020.',
      demand_signals: [
        'Rebranded corporate identity in Feb 2026',
        'Hired VP of Brand from Yandex in Q1',
        'Announced expansion into 3 new verticals',
      ],
      media_mentions: [
        'RBC — YClients invests 800M ₽ in AI-driven scheduling',
        'vc.ru — case study of Sber-owned SaaS growth',
      ],
      confidence: 'high',
    },
    scoring: {
      segment: 'A',
      weight: 9,
      category: 'IT and online services',
      reason:
        'Federal SaaS leader in beauty vertical, part of Sber ecosystem, fresh rebrand and hiring of brand director create a strong window for branding proposal.',
      psychotype: 'Analytical, evidence-driven; expects case studies and ROI, not creative theater.',
      red_flags: [],
      scoring_factors: [
        { factor: 'Revenue signal', points: 3 },
        { factor: 'ICP match', points: 3 },
        { factor: 'Fresh demand signal', points: 2 },
        { factor: 'Decision-maker identified', points: 1 },
      ],
    },
    followup: {
      subject: 'Про ваш ребрендинг и продуктовую линейку',
      body:
        'Юрий, здравствуйте.\n\nВидел ваш февральский ребрендинг и объявление о выходе в медицину, фитнес и стоматологию. Из внешнего наблюдателя выглядит так, что три новых вертикали пока идут под тем же визуальным зонтиком, что и основной бренд.\n\nМы в ONY отвечаем как раз за это: helping SaaS-платформам разложить бренд по вертикалям без потери материнской узнаваемости. Показать пару кейсов на 20 минут?',
    },
    bizdev: {
      recommended_manager: 'Кирилл С.',
      priority: 'high',
      reason:
        'Load-weight у Кирилла на этой неделе 3 из 4, есть свободный слот. Плюс он уже вёл сделку в SaaS-сегменте.',
      reasoning: [
        'Manager load: 3/4 (below HARD_LIMIT)',
        'Prior experience in SaaS vertical',
        'No conflicting active deals with parent group (Sber)',
      ],
    },
    timing: {
      enrichment_ms: 58_240,
      scoring_ms: 24_180,
      cost_usd: 0.128,
      tokens_in: 6420,
      tokens_out: 1180,
      model: 'claude-sonnet-4.6 via OpenRouter',
    },
  },
  {
    id: 'ozon',
    name: 'Ozon',
    website: 'ozon.ru',
    industry: 'E-commerce / Marketplace',
    logo: 'O',
    enrichment: {
      legal_name: 'ООО «Интернет решения»',
      inn: '7704217370',
      revenue_rub: 424_000_000_000,
      employees: 33_000,
      founded: 1998,
      key_person: 'Александр Шульгин',
      key_person_role: 'CEO',
      summary:
        'One of the two dominant Russian marketplaces. Publicly traded (MOEX). Fintech arm Ozon Bank grew 3x in 2025. Currently pushing sub-brands Ozon Fresh and Ozon Travel as standalone products.',
      demand_signals: [
        'Ozon Fresh launched dedicated marketing team in Q1 2026',
        'Job posts for Head of Brand at Ozon Bank',
        'Media coverage on planned super-app consolidation',
      ],
      media_mentions: [
        'Vedomosti — Ozon Bank profit up 218% YoY',
        'RBC — Ozon Travel gains 12% market share',
      ],
      confidence: 'high',
    },
    scoring: {
      segment: 'A',
      weight: 10,
      category: 'E-commerce and marketplaces',
      reason:
        'Federal-scale marketplace expanding into sub-brands under one super-app roof. Multiple simultaneous branding needs (Fresh, Bank, Travel). Highest possible weight.',
      psychotype: 'Data-first, procurement-heavy. Long sales cycle. Requires formal RFP process.',
      red_flags: [
        {
          text: 'Procurement policy usually requires tender participation',
          source: 'ozon.ru/legal',
          date: '2026-08-15',
          severity: 'warning',
        },
      ],
      scoring_factors: [
        { factor: 'Revenue signal', points: 3 },
        { factor: 'ICP match', points: 3 },
        { factor: 'Multiple product lines', points: 2 },
        { factor: 'Decision-maker identified', points: 2 },
      ],
    },
    followup: {
      subject: 'Sub-brand architecture: Fresh, Bank, Travel',
      body:
        'Александр, здравствуйте.\n\nПишу коротко и по делу. Мы видим три отдельных продуктовых направления Ozon, которые сейчас конкурируют за внимание внутри одной оболочки: Fresh, Bank, Travel. У каждого свой tone of voice, но общая архитектура пока читается как один бренд.\n\nМы в ONY занимаемся такими историями (умеем разложить sub-brands без каннибализации основной марки). Готов прислать один тесно связанный кейс за 5 минут чтения.',
    },
    bizdev: {
      recommended_manager: 'Юлия Г.',
      priority: 'high',
      reason:
        'BDM_OWNER_OVERRIDES закрепляет Ozon за Юлией. Load 2/4, есть возможность подключиться в новую сделку.',
      reasoning: [
        'Manual override: Ozon assigned to Юлия',
        'Manager load: 2/4',
        'Previous positive contact from Q2 (contract 2026-M-118)',
      ],
    },
    timing: {
      enrichment_ms: 71_120,
      scoring_ms: 28_940,
      cost_usd: 0.152,
      tokens_in: 8210,
      tokens_out: 1420,
      model: 'claude-sonnet-4.6 via OpenRouter',
    },
  },
  {
    id: 's7',
    name: 'S7 Airlines',
    website: 's7.ru',
    industry: 'Aviation',
    logo: 'S',
    enrichment: {
      legal_name: 'АО «Авиакомпания «Сибирь»',
      inn: '5448100656',
      revenue_rub: 189_000_000_000,
      employees: 12_400,
      founded: 1992,
      key_person: 'Дмитрий Куделькин',
      key_person_role: 'CMO',
      summary:
        'Second-largest Russian airline. Consistently rated highest in customer experience among Russian carriers. Loyalty program S7 Priority is often cited as best-in-class. Sanctions pressure since 2022 limits international routes.',
      demand_signals: [
        'Launched new domestic hub in Novosibirsk (Feb 2026)',
        'Announced tender for creative agency partnership',
      ],
      media_mentions: [
        'Kommersant — S7 restructures loyalty program',
        'Aviaport — new fleet delivery schedule',
      ],
      confidence: 'high',
    },
    scoring: {
      segment: 'B',
      weight: 7,
      category: 'Transport and logistics',
      reason:
        'Strong brand with existing agency relationships. Recent tender opening is a real window. B rather than A due to sanctions pressure limiting scope.',
      psychotype: 'Design-literate, values craft. CMO is ex-agency side.',
      red_flags: [
        {
          text: 'Sanctions on aviation sector — international scope limited',
          source: 'kommersant.ru',
          date: '2026-07-22',
          severity: 'warning',
        },
      ],
      scoring_factors: [
        { factor: 'Revenue signal', points: 3 },
        { factor: 'ICP match (transport)', points: 1 },
        { factor: 'Open tender', points: 2 },
        { factor: 'Decision-maker identified', points: 1 },
      ],
    },
    followup: {
      subject: 'Про тендер и S7 Priority',
      body:
        'Дмитрий, здравствуйте.\n\nВидел объявление о тендере и знаю, что S7 Priority у вас традиционно самое сильное направление в отрасли. Хочется предложить не типовую заявку, а короткий 15-минутный созвон: обсудить, как можно расширить логику Priority на другие точки контакта, не размывая её самой.\n\nЕсли неактуально, тоже нормально, просто скажите.',
    },
    bizdev: {
      recommended_manager: 'Андрей М.',
      priority: 'high',
      reason:
        'Опыт с транспортными брендами, свободный слот на этой неделе.',
      reasoning: [
        'Prior transport brand: РЖД pitch 2025',
        'Manager load: 1/4',
      ],
    },
    timing: {
      enrichment_ms: 62_800,
      scoring_ms: 26_100,
      cost_usd: 0.134,
      tokens_in: 7020,
      tokens_out: 1240,
      model: 'claude-sonnet-4.6 via OpenRouter',
    },
  },
  {
    id: 'unknown-llc',
    name: 'ООО «Меркурий-Торг»',
    website: 'merkurij-torg.example',
    industry: 'Wholesale / Unknown',
    logo: 'M',
    enrichment: {
      legal_name: 'ООО «Меркурий-Торг»',
      inn: '7728881029',
      revenue_rub: 42_000_000,
      employees: 8,
      founded: 2023,
      key_person: 'Иван Смирнов',
      key_person_role: 'Генеральный директор',
      summary:
        'Small trading company registered in 2023. Minimal digital footprint. No confirmed public activity beyond legal registration.',
      demand_signals: [],
      media_mentions: [],
      confidence: 'low',
    },
    scoring: {
      segment: 'D',
      weight: 2,
      category: 'B2B / B2C services',
      reason:
        'No demand signal, no digital footprint, minimal revenue, no clear brief. Likely tire-kicker or bot-submitted form. Recommend polite rejection.',
      psychotype: 'Unknown, insufficient data.',
      red_flags: [
        {
          text: 'Company registered 8 months ago, no operational history',
          source: 'egrul',
          date: '2026-01-14',
          severity: 'warning',
        },
        {
          text: 'No public website, only INN and phone',
          source: 'egrul',
          date: '2026-09-11',
          severity: 'info',
        },
      ],
      scoring_factors: [
        { factor: 'Revenue signal', points: 0 },
        { factor: 'ICP match', points: 0 },
        { factor: 'Demand signal', points: 0 },
        { factor: 'Decision-maker identified', points: 1 },
        { factor: 'Task clarity', points: 1 },
      ],
    },
    followup: {
      subject: 'Спасибо за обращение',
      body:
        'Иван, здравствуйте.\n\nСпасибо за обращение. К сожалению, на данный момент мы не работаем со стартапами до посевной стадии. Если у вас будет более зрелый запрос через 6-12 месяцев, будем рады вернуться к диалогу.',
    },
    bizdev: {
      recommended_manager: '—',
      priority: 'low',
      reason: 'Segment D auto-response, ручное вмешательство не требуется.',
      reasoning: [
        'Segment D → auto-decline template',
        'No manager assignment',
      ],
    },
    timing: {
      enrichment_ms: 41_200,
      scoring_ms: 18_400,
      cost_usd: 0.092,
      tokens_in: 4820,
      tokens_out: 720,
      model: 'claude-sonnet-4.6 via OpenRouter',
    },
  },
  {
    id: 'wildberries',
    name: 'Wildberries',
    website: 'wildberries.ru',
    industry: 'E-commerce / Marketplace',
    logo: 'W',
    enrichment: {
      legal_name: 'ООО «Вайлдберриз»',
      inn: '7721546864',
      revenue_rub: 2_500_000_000_000,
      employees: 90_000,
      founded: 2004,
      key_person: 'Татьяна Бакальчук',
      key_person_role: 'Founder',
      summary:
        'Largest Russian marketplace by GMV. Merged with Russ (outdoor advertising) in 2024, creating RVB Group. Major internal restructuring in progress. Ongoing public conflict inside the founder family.',
      demand_signals: [
        'Post-merger brand architecture unresolved (RVB umbrella + WB + Russ)',
        'Hiring for Group Brand Director',
      ],
      media_mentions: [
        'Vedomosti — RVB Group takes shape after merger',
        'Kommersant — internal family dispute continues in court',
      ],
      confidence: 'high',
    },
    scoring: {
      segment: 'B',
      weight: 6,
      category: 'E-commerce and marketplaces',
      reason:
        'Large brand with clear architecture problem, but active internal family dispute and ongoing legal proceedings make timing risky. B-tier with caution note.',
      psychotype: 'Fast-moving, tolerant of chaos, decision-making non-linear.',
      red_flags: [
        {
          text: 'Active court proceedings between founders — decision authority unclear',
          source: 'kommersant.ru',
          date: '2026-06-30',
          severity: 'critical',
        },
        {
          text: 'Post-merger integration incomplete, multiple contradictory stakeholders',
          source: 'vedomosti.ru',
          date: '2026-07-15',
          severity: 'warning',
        },
      ],
      scoring_factors: [
        { factor: 'Revenue signal', points: 3 },
        { factor: 'ICP match', points: 2 },
        { factor: 'Real branding problem', points: 2 },
        { factor: 'Legal risk penalty', points: -1 },
      ],
    },
    followup: {
      subject: 'Про архитектуру после RVB',
      body:
        'Здравствуйте.\n\nМы наблюдаем за тем, как складывается новая архитектура RVB Group, и понимаем, что запрос на бренд-архитектуру сейчас, вероятно, откладывается до стабилизации акционерного контура.\n\nЕсли ситуация внутри устаканится и появится готовность обсуждать — напишите, вернёмся с показательным кейсом холдинговой архитектуры за 20 минут.',
    },
    bizdev: {
      recommended_manager: 'Екатерина В.',
      priority: 'medium',
      reason:
        'Приоритет средний из-за юридических рисков. Рекомендуем follow-up через квартал, не срочный контакт.',
      reasoning: [
        'Manager load: 2/4',
        'Deferred due to legal risk',
        'Suggested follow-up: 2027-Q1',
      ],
    },
    timing: {
      enrichment_ms: 68_400,
      scoring_ms: 27_320,
      cost_usd: 0.148,
      tokens_in: 7810,
      tokens_out: 1360,
      model: 'claude-sonnet-4.6 via OpenRouter',
    },
  },
  {
    id: 'identity-mismatch',
    name: 'Аэромакс',
    website: 'kronshtadt.ru',
    industry: 'Industrial / UAV',
    logo: 'A',
    enrichment: {
      legal_name: '—',
      inn: '—',
      revenue_rub: null,
      revenue_note: 'Field cleared: identity mismatch detected',
      employees: null,
      founded: 0,
      key_person: '—',
      key_person_role: '—',
      summary:
        'Identity mismatch. Perplexity returned data about ГК «Аэромакс» (Moscow, UAV holding), but the requesting domain kronshtadt.ru belongs to a different aerospace company. Enrichment halted, manual verification required.',
      demand_signals: [],
      media_mentions: [],
      confidence: 'low',
    },
    scoring: {
      segment: 'C2',
      weight: 4,
      category: 'Industry and production',
      reason:
        'Enrichment could not confidently resolve the company. Sending to scoring with empty enrichment. Manual review required before proceeding.',
      psychotype: 'Unknown.',
      red_flags: [
        {
          text: 'Identity mismatch: expected Аэромакс (kronshtadt.ru), found different Аэромакс (aeromax-group.ru)',
          source: 'internal guard',
          date: '2026-09-11',
          severity: 'critical',
        },
      ],
      scoring_factors: [
        { factor: 'Task clarity', points: 1 },
        { factor: 'Domain match check failed', points: 0 },
      ],
    },
    followup: {
      subject: 'Уточнение по компании',
      body:
        'Здравствуйте.\n\nСпасибо за обращение. Чтобы корректно подготовиться к первому созвону, уточните, пожалуйста, точное юридическое название компании и ИНН. Мы обнаружили несколько разных организаций с похожим названием.',
    },
    bizdev: {
      recommended_manager: '—',
      priority: 'medium',
      reason:
        'Ждём подтверждения от клиента, потом переоценим сегмент и назначим менеджера.',
      reasoning: [
        'Blocked on manual verification',
        'No manager assignment until identity confirmed',
      ],
    },
    timing: {
      enrichment_ms: 39_800,
      scoring_ms: 12_600,
      cost_usd: 0.081,
      tokens_in: 4210,
      tokens_out: 640,
      model: 'claude-sonnet-4.6 via OpenRouter',
    },
  },
]
