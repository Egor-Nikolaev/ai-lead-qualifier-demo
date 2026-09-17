import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { COMPANIES } from '../data/companies'
import { PROD_METRICS } from '../data/metrics'

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-[1120px] px-6 pt-24 pb-16">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Production case, portfolio demo
        </motion.p>
        <motion.h1
          className="display-1 text-balance max-w-[880px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          A pipeline that reads a new lead, decides if it&rsquo;s worth pursuing, and writes the first reply.
        </motion.h1>
        <motion.p
          className="mt-6 text-[20px] leading-[1.4] text-ink-3 max-w-[720px] text-pretty"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          Every inbound deal gets enriched from open sources, scored by a large language model, routed to the right business developer, and turned into four contextual comments inside the CRM. In 86 seconds. For {PROD_METRICS.cost_per_lead_usd} USD.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link
            to={`/pipeline/${COMPANIES[0].id}`}
            className="h-11 px-5 rounded-full bg-ink text-canvas text-[15px] font-medium inline-flex items-center gap-1.5 hover:bg-ink-2 transition-colors"
          >
            Run the pipeline
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
          <Link
            to="/how"
            className="h-11 px-5 rounded-full text-[15px] font-medium text-ink-2 inline-flex items-center hover:text-ink transition-colors"
          >
            How it works
          </Link>
        </motion.div>
      </section>

      <section className="border-t hairline">
        <div className="mx-auto max-w-[1120px] px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
            <Stat value="951" label="unique leads processed" note="22 Jun — 3 Sep 2026" />
            <Stat value="88.5%" label="scoring success rate" note="855 of 966" />
            <Stat value="86 s" label="average cycle time" note="p95 · 124 s" />
            <Stat value="$0.13" label="cost per lead" note="enrichment + scoring" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-3">Try it on a real company</p>
            <h2 className="headline">Pick a lead. Watch it get qualified.</h2>
          </div>
          <p className="text-[15px] text-ink-4 hidden md:block max-w-[280px] text-right">
            Six examples that show the different paths a lead can take through the pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line rounded-2xl overflow-hidden border hairline">
          {COMPANIES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.03 * i }}
              className="bg-canvas"
            >
              <Link
                to={`/pipeline/${c.id}`}
                className="group block p-7 h-full transition-colors hover:bg-canvas-2"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-9 h-9 rounded-full border hairline-strong flex items-center justify-center text-[15px] font-semibold text-ink">
                    {c.logo}
                  </div>
                  <SegmentBadge segment={c.scoring.segment} />
                </div>
                <div className="text-[19px] font-semibold text-ink tracking-tight">{c.name}</div>
                <div className="mt-1 text-[13px] text-ink-4">{c.industry}</div>
                <p className="mt-5 text-[14px] leading-[1.5] text-ink-3 line-clamp-3">
                  {c.scoring.reason}
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-[13px] font-medium text-ink group-hover:gap-2 transition-all">
                  Run
                  <ArrowRight size={14} strokeWidth={2} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

function Stat({ value, label, note }: { value: string; label: string; note: string }) {
  return (
    <div>
      <div className="text-[44px] leading-none font-semibold tracking-tight text-ink">{value}</div>
      <div className="mt-3 text-[14px] text-ink-2">{label}</div>
      <div className="mt-1 text-[12px] text-ink-4">{note}</div>
    </div>
  )
}

function SegmentBadge({ segment }: { segment: string }) {
  const colors: Record<string, string> = {
    A: 'bg-ink text-canvas',
    B: 'bg-canvas-4 text-ink-2',
    C1: 'bg-canvas-3 text-ink-3',
    C2: 'bg-canvas-3 text-ink-3',
    D: 'bg-canvas-3 text-ink-4',
  }
  return (
    <span className={`h-6 px-2.5 rounded-full text-[11px] font-semibold tracking-wide flex items-center ${colors[segment]}`}>
      {segment}
    </span>
  )
}
