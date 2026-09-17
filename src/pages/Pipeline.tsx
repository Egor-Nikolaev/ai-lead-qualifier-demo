import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { COMPANIES } from '../data/companies'

interface Stage {
  key: string
  label: string
  detail: string
  duration: number
}

export default function Pipeline() {
  const params = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const company = useMemo(
    () => COMPANIES.find((c) => c.id === params.id) ?? COMPANIES[0],
    [params.id],
  )

  // Real ONY timings compressed 12x for demo playback.
  // Actual seconds shown in Result page metadata card.
  const SPEED = 12
  const stages: Stage[] = useMemo(
    () => [
      { key: 'webhook', label: 'Bitrix webhook received', detail: `Deal #${3800 + COMPANIES.indexOf(company)} · onCrmDealAdd`, duration: 220 },
      { key: 'enrich_perplexity', label: 'Enrichment · Perplexity search', detail: 'Open-source signals, media, reputation', duration: Math.round((company.timing.enrichment_ms * 0.85) / SPEED) },
      { key: 'enrich_dadata', label: 'Enrichment · DaData EGRUL', duration: 380, detail: 'INN, revenue, director, sanctions' },
      { key: 'identity', label: 'Identity mismatch guard', detail: 'Domain match check against expected company', duration: 260 },
      { key: 'scoring', label: 'Scoring · Claude Sonnet 4.6', detail: 'JSON output · segment, weight, red flags', duration: Math.round(company.timing.scoring_ms / SPEED) },
      { key: 'routing', label: 'Routing recommendation', detail: 'Postgres balancer · manager_load_week', duration: 240 },
      { key: 'comments', label: '4 comments posted to Bitrix', detail: 'Enrichment · Scoring · Follow-up · BizDev', duration: 560 },
    ],
    [company],
  )

  const [current, setCurrent] = useState(-1)
  const [done, setDone] = useState<Set<string>>(new Set())
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const startedAt = useRef<number | null>(null)

  // Reset on company change
  useEffect(() => {
    setCurrent(-1)
    setDone(new Set())
    setElapsed(0)
    setRunning(false)
    startedAt.current = null
  }, [company.id])

  // Elapsed timer
  useEffect(() => {
    if (!running || startedAt.current === null) return
    const id = window.setInterval(() => {
      setElapsed(Date.now() - (startedAt.current ?? Date.now()))
    }, 60)
    return () => window.clearInterval(id)
  }, [running])

  // Run stages
  const runPipeline = () => {
    setCurrent(0)
    setDone(new Set())
    setRunning(true)
    startedAt.current = Date.now()

    let cumulative = 0
    stages.forEach((s, i) => {
      cumulative += s.duration
      window.setTimeout(() => {
        setDone((d) => new Set(d).add(s.key))
        if (i < stages.length - 1) setCurrent(i + 1)
        else {
          setRunning(false)
          window.setTimeout(() => navigate(`/result/${company.id}`), 900)
        }
      }, cumulative)
    })
  }

  const totalPlanned = stages.reduce((s, x) => s + x.duration, 0)
  const progress = Math.min(1, elapsed / totalPlanned)

  return (
    <div className="mx-auto max-w-[880px] px-6 pt-16 pb-24">
      <div className="mb-10">
        <p className="eyebrow mb-4">Company</p>
        <CompanyPicker current={company.id} />
      </div>

      <div className="rounded-2xl border hairline bg-canvas-2 p-8 md:p-10">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border hairline-strong flex items-center justify-center text-[17px] font-semibold text-ink bg-canvas">
                {company.logo}
              </div>
              <div>
                <div className="text-[22px] font-semibold text-ink tracking-tight">{company.name}</div>
                <div className="text-[13px] text-ink-4">{company.industry} · {company.website}</div>
              </div>
            </div>
          </div>
          <div className="text-right tabular-nums">
            <div className="text-[13px] text-ink-4">Elapsed · demo</div>
            <div className="text-[26px] font-semibold tracking-tight text-ink">
              {(elapsed / 1000).toFixed(1)}s
            </div>
            <div className="mt-1 text-[11px] font-mono text-ink-4">
              actual · {((company.timing.enrichment_ms + company.timing.scoring_ms) / 1000).toFixed(0)}s
            </div>
          </div>
        </div>

        <div className="h-[3px] w-full rounded-full bg-canvas-4 overflow-hidden mb-8">
          <motion.div
            className="h-full bg-ink"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ ease: 'linear', duration: 0.06 }}
          />
        </div>

        <ol className="space-y-4">
          {stages.map((s, i) => {
            const isDone = done.has(s.key)
            const isActive = i === current && !isDone && running
            const isPending = !isDone && !isActive
            return (
              <li
                key={s.key}
                className={clsx(
                  'flex items-start gap-4 py-3 border-b hairline last:border-b-0 transition-opacity',
                  isPending && current === -1 && 'opacity-40',
                  isPending && current > -1 && 'opacity-30',
                )}
              >
                <span className="mt-0.5 w-6 h-6 flex items-center justify-center shrink-0">
                  <AnimatePresence mode="wait">
                    {isDone ? (
                      <motion.span
                        key="d"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                        className="w-5 h-5 rounded-full bg-ink flex items-center justify-center text-canvas"
                      >
                        <Check size={12} strokeWidth={3} />
                      </motion.span>
                    ) : isActive ? (
                      <motion.span
                        key="a"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full border-[1.5px] border-ink border-t-transparent animate-spin"
                      />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-canvas-4" />
                    )}
                  </AnimatePresence>
                </span>
                <div className="flex-1">
                  <div className={clsx('text-[15px] font-medium', isPending ? 'text-ink-3' : 'text-ink')}>
                    {s.label}
                  </div>
                  <div className="mt-0.5 text-[13px] text-ink-4">{s.detail}</div>
                </div>
                <div className="text-[12px] font-mono text-ink-4 tabular-nums pt-0.5">
                  {isDone ? `${(s.duration / 1000).toFixed(1)}s` : ''}
                </div>
              </li>
            )
          })}
        </ol>

        <div className="mt-10 flex items-center justify-between">
          <div className="text-[12px] font-mono text-ink-4">
            {company.timing.model}
          </div>
          {current === -1 && (
            <button
              onClick={runPipeline}
              className="h-11 px-5 rounded-full bg-ink text-canvas text-[15px] font-medium inline-flex items-center gap-1.5 hover:bg-ink-2 transition-colors"
            >
              Start pipeline
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          )}
          {done.size === stages.length && (
            <Link
              to={`/result/${company.id}`}
              className="h-11 px-5 rounded-full bg-ink text-canvas text-[15px] font-medium inline-flex items-center gap-1.5 hover:bg-ink-2 transition-colors"
            >
              See result
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function CompanyPicker({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const active = COMPANIES.find((c) => c.id === current) ?? COMPANIES[0]
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-11 pl-4 pr-3 rounded-full border hairline-strong bg-canvas text-[15px] font-medium text-ink inline-flex items-center gap-2 hover:bg-canvas-2 transition-colors"
      >
        {active.name}
        <ChevronDown size={14} strokeWidth={2} className={clsx('transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <>
          <button className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-label="Close" />
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 mt-2 min-w-[260px] rounded-2xl border hairline bg-canvas shadow-xl overflow-hidden"
          >
            {COMPANIES.map((c) => (
              <Link
                key={c.id}
                to={`/pipeline/${c.id}`}
                onClick={() => setOpen(false)}
                className={clsx(
                  'block px-4 py-3 text-[14px] hover:bg-canvas-3 transition-colors border-b hairline last:border-b-0',
                  c.id === current && 'bg-canvas-3',
                )}
              >
                <div className="font-medium text-ink">{c.name}</div>
                <div className="text-[12px] text-ink-4">{c.industry}</div>
              </Link>
            ))}
          </motion.div>
        </>
      )}
    </div>
  )
}
