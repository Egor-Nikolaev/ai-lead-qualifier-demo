import { motion } from 'framer-motion'
import { PROD_METRICS } from '../data/metrics'

export default function Metrics() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 pt-16 pb-24">
      <p className="eyebrow mb-4">Real production numbers · client name withheld</p>
      <h1 className="display-2 mb-4 text-balance max-w-[900px]">
        951 leads, {Math.round(PROD_METRICS.enrichment_success_rate * 100)}% enrichment success, {PROD_METRICS.cycle_avg_seconds} seconds per cycle.
      </h1>
      <p className="text-[17px] text-ink-3 max-w-[720px]">
        Aggregated from the Postgres analytics tables (<span className="font-mono text-[15px]">lead_enrichment</span>, <span className="font-mono text-[15px]">lead_scoring</span>, <span className="font-mono text-[15px]">lead_routing</span>) over the period {PROD_METRICS.period}. No leaked customer names.
      </p>

      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 pb-14 border-b hairline">
        <BigStat value="951" label="unique leads processed" />
        <BigStat value="88.5%" label="scoring success" />
        <BigStat value="86 s" label="avg cycle time" note={`p95 · ${PROD_METRICS.cycle_p95_seconds} s`} />
        <BigStat value={`$${PROD_METRICS.cost_per_lead_usd}`} label="cost per lead" />
      </div>

      <section className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <SegmentDistribution />
        <WeeklyVolume />
      </section>

      <section className="mt-16">
        <p className="eyebrow mb-5">Top industries by volume</p>
        <div className="rounded-2xl border hairline overflow-hidden">
          {PROD_METRICS.top_categories.map((c, i) => {
            const max = PROD_METRICS.top_categories[0].count
            return (
              <div key={c.name} className="flex items-center border-b hairline last:border-b-0 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(c.count / max) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-y-0 left-0 bg-canvas-3"
                />
                <div className="relative flex-1 flex items-center justify-between py-4 px-5">
                  <span className="text-[15px] text-ink">{c.name}</span>
                  <span className="text-[14px] font-mono tabular-nums text-ink-2">{c.count}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function BigStat({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-[52px] leading-none font-semibold tracking-tight text-ink tabular-nums">{value}</div>
      <div className="mt-3 text-[14px] text-ink-2">{label}</div>
      {note && <div className="mt-1 text-[12px] text-ink-4">{note}</div>}
    </motion.div>
  )
}

function SegmentDistribution() {
  const totalScored = PROD_METRICS.segments.reduce((s, x) => s + x.count, 0)
  return (
    <div>
      <p className="eyebrow mb-5">Segment distribution · {totalScored} scored leads</p>
      <div className="space-y-5">
        {PROD_METRICS.segments.map((s, i) => (
          <div key={s.segment}>
            <div className="flex items-baseline justify-between mb-1.5">
              <div className="flex items-baseline gap-3">
                <span className="text-[22px] font-semibold text-ink tracking-tight tabular-nums w-8">{s.segment}</span>
                <span className="text-[13px] text-ink-4">{s.label}</span>
              </div>
              <div className="tabular-nums text-[13px] text-ink-3">
                {s.count} <span className="text-ink-4">· {Math.round(s.share * 100)}%</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-canvas-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.share * 100}%` }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-ink"
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[13px] text-ink-4 max-w-[420px]">
        The 54% D-segment share is the point of the whole system: those leads are auto-rejected and never reach a human.
      </p>
    </div>
  )
}

function WeeklyVolume() {
  const max = Math.max(...PROD_METRICS.weekly_volume.map((w) => w.scored))
  return (
    <div>
      <p className="eyebrow mb-5">Weekly volume · 11 weeks</p>
      <div className="flex items-end gap-2 h-[220px] pt-4">
        {PROD_METRICS.weekly_volume.map((w, i) => (
          <div key={w.week} className="flex-1 flex flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(w.scored / max) * 200}px` }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-ink rounded-t-sm relative"
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] font-mono tabular-nums text-ink-3">
                {w.scored}
              </span>
            </motion.div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[11px] font-mono text-ink-4">
        <span>{PROD_METRICS.weekly_volume[0].week}</span>
        <span>{PROD_METRICS.weekly_volume[PROD_METRICS.weekly_volume.length - 1].week}</span>
      </div>
      <p className="mt-6 text-[13px] text-ink-4 max-w-[420px]">
        Range from {PROD_METRICS.weekly_range.min} to {PROD_METRICS.weekly_range.max} leads per week, averaging {PROD_METRICS.weekly_range.avg}.
      </p>
    </div>
  )
}
