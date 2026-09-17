export const PROD_METRICS = {
  period: '22 June — 3 September 2026',
  unique_leads: 951,
  enrichment_success_rate: 0.87,
  scoring_success_rate: 0.885,
  routing_recommendations: 965,
  cycle_avg_seconds: 86,
  cycle_p95_seconds: 124,
  cost_per_lead_usd: 0.13,
  weekly_range: { min: 29, max: 156, avg: 85 },

  segments: [
    { segment: 'D', count: 458, share: 0.54, label: 'auto-reject / junk' },
    { segment: 'C1', count: 154, share: 0.18, label: 'small-mid' },
    { segment: 'A', count: 118, share: 0.14, label: 'top-tier' },
    { segment: 'B', count: 60, share: 0.07, label: 'mid-market' },
    { segment: 'C2', count: 65, share: 0.075, label: 'startup / potential' },
  ],

  top_categories: [
    { name: 'IT and online services', count: 125 },
    { name: 'Media / marketing / events', count: 75 },
    { name: 'Real estate and construction', count: 53 },
    { name: 'Retail', count: 42 },
    { name: 'Finance and insurance', count: 41 },
    { name: 'Agencies', count: 39 },
    { name: 'Fashion and lifestyle', count: 29 },
    { name: 'FMCG', count: 21 },
  ],

  weekly_volume: [
    { week: '22 Jun', scored: 156 },
    { week: '29 Jun', scored: 124 },
    { week: '06 Jul', scored: 62 },
    { week: '13 Jul', scored: 65 },
    { week: '20 Jul', scored: 97 },
    { week: '27 Jul', scored: 74 },
    { week: '03 Aug', scored: 53 },
    { week: '10 Aug', scored: 75 },
    { week: '17 Aug', scored: 79 },
    { week: '24 Aug', scored: 29 },
    { week: '31 Aug', scored: 41 },
  ],
}

export const formatRub = (n: number | null | undefined): string => {
  if (n === null || n === undefined) return '—'
  if (n >= 1_000_000_000_000) return `${(n / 1_000_000_000_000).toFixed(1)} трлн ₽`
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)} млрд ₽`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)} млн ₽`
  return `${n.toLocaleString('ru-RU')} ₽`
}

export const formatCount = (n: number | null | undefined): string => {
  if (n === null || n === undefined) return '—'
  return n.toLocaleString('ru-RU')
}
