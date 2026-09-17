import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, ChevronRight, Sparkles, Users, Mail, Building2, Copy, Check } from 'lucide-react'
import clsx from 'clsx'
import { COMPANIES, type Priority } from '../data/companies'
import { formatCount, formatRub } from '../data/metrics'

export default function Result() {
  const { id } = useParams<{ id: string }>()
  const company = useMemo(() => COMPANIES.find((c) => c.id === id) ?? COMPANIES[0], [id])

  return (
    <div className="mx-auto max-w-[1120px] px-6 pt-14 pb-24">
      <div className="mb-10 flex items-center gap-2 text-[13px] text-ink-4">
        <Link to="/" className="hover:text-ink transition-colors">Overview</Link>
        <ChevronRight size={12} />
        <Link to={`/pipeline/${company.id}`} className="hover:text-ink transition-colors">Pipeline</Link>
        <ChevronRight size={12} />
        <span className="text-ink">{company.name}</span>
      </div>

      <div className="flex items-start justify-between gap-6 mb-14">
        <div>
          <p className="eyebrow mb-4">Qualified lead</p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border hairline-strong flex items-center justify-center text-[22px] font-semibold text-ink">
              {company.logo}
            </div>
            <div>
              <h1 className="display-2">{company.name}</h1>
              <div className="mt-2 text-[15px] text-ink-3">
                {company.industry} · <a href="#" className="underline decoration-line hover:text-ink transition-colors">{company.website}</a>
              </div>
            </div>
          </div>
        </div>
        <SegmentPill segment={company.scoring.segment} weight={company.scoring.weight} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-line rounded-2xl overflow-hidden border hairline">
        <EnrichmentCard company={company} />
        <ScoringCard company={company} />
        <FollowupCard company={company} />
        <BizdevCard company={company} />
      </div>

      <TimingBar company={company} />
    </div>
  )
}

function SegmentPill({ segment, weight }: { segment: string; weight: number }) {
  const styles: Record<string, string> = {
    A: 'bg-ink text-canvas',
    B: 'bg-canvas-4 text-ink',
    C1: 'bg-canvas-3 text-ink-2',
    C2: 'bg-canvas-3 text-ink-2',
    D: 'bg-canvas-3 text-ink-4',
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="flex items-center gap-4"
    >
      <div className={clsx('h-14 px-5 rounded-full flex items-center gap-3', styles[segment])}>
        <span className="text-[12px] font-semibold tracking-wider uppercase opacity-70">Segment</span>
        <span className="text-[28px] font-semibold tracking-tight leading-none">{segment}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[12px] text-ink-4">Weight</span>
        <span className="text-[26px] font-semibold tabular-nums text-ink">{weight}</span>
      </div>
    </motion.div>
  )
}

function Card({
  icon,
  label,
  children,
  delay = 0,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-canvas p-8 md:p-9"
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="text-ink-4">{icon}</span>
        <span className="eyebrow mb-0">{label}</span>
      </div>
      {children}
    </motion.section>
  )
}

function EnrichmentCard({ company }: { company: typeof COMPANIES[0] }) {
  const e = company.enrichment
  return (
    <Card icon={<Building2 size={14} strokeWidth={2} />} label="Enrichment · company profile">
      <h3 className="text-[19px] font-semibold text-ink mb-2 tracking-tight">{e.legal_name}</h3>
      <p className="text-[14px] text-ink-3 leading-[1.5] text-pretty mb-6">{e.summary}</p>

      <dl className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6">
        <div>
          <dt className="text-[12px] text-ink-4">INN</dt>
          <dd className="text-[14px] font-mono text-ink tabular-nums">{e.inn}</dd>
        </div>
        <div>
          <dt className="text-[12px] text-ink-4">Founded</dt>
          <dd className="text-[14px] font-mono text-ink tabular-nums">{e.founded || '—'}</dd>
        </div>
        <div>
          <dt className="text-[12px] text-ink-4">Revenue</dt>
          <dd className="text-[14px] font-mono text-ink tabular-nums">{formatRub(e.revenue_rub)}</dd>
        </div>
        <div>
          <dt className="text-[12px] text-ink-4">Employees</dt>
          <dd className="text-[14px] font-mono text-ink tabular-nums">{formatCount(e.employees)}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[12px] text-ink-4">Key person</dt>
          <dd className="text-[14px] text-ink">
            {e.key_person} <span className="text-ink-4">· {e.key_person_role}</span>
          </dd>
        </div>
      </dl>

      {e.demand_signals.length > 0 && (
        <div className="mt-6 pt-6 border-t hairline">
          <p className="text-[12px] text-ink-4 mb-3">Recent demand signals</p>
          <ul className="space-y-2">
            {e.demand_signals.map((s) => (
              <li key={s} className="text-[14px] text-ink-2 leading-[1.5] flex gap-2">
                <span className="mt-2 w-1 h-1 rounded-full bg-ink-4 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <span className="text-[12px] text-ink-4">Confidence</span>
        <ConfidenceBadge value={e.confidence} />
      </div>
    </Card>
  )
}

function ScoringCard({ company }: { company: typeof COMPANIES[0] }) {
  const s = company.scoring
  return (
    <Card icon={<Sparkles size={14} strokeWidth={2} />} label="Scoring · reasoning">
      <p className="text-[15px] text-ink leading-[1.5] mb-5 text-pretty">{s.reason}</p>

      <div className="mb-6">
        <p className="text-[12px] text-ink-4 mb-3">Category</p>
        <span className="inline-flex h-7 px-3 rounded-full bg-canvas-3 text-[13px] font-medium text-ink-2">
          {s.category}
        </span>
      </div>

      {s.red_flags.length > 0 && (
        <div className="mb-6 pt-6 border-t hairline">
          <p className="text-[12px] text-ink-4 mb-3">Red flags</p>
          <ul className="space-y-3">
            {s.red_flags.map((f) => (
              <li key={f.text} className={clsx(
                'p-3 rounded-lg text-[13px] flex gap-2.5',
                f.severity === 'critical' && 'bg-[#fff5f5] text-[#8f1c1c]',
                f.severity === 'warning' && 'bg-[#fff8ec] text-[#7a4a05]',
                f.severity === 'info' && 'bg-canvas-3 text-ink-2',
              )}>
                <AlertTriangle size={14} strokeWidth={2} className="mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="leading-[1.5]">{f.text}</div>
                  <div className="mt-1 text-[11px] opacity-70 font-mono">{f.source} · {f.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-6 border-t hairline">
        <p className="text-[12px] text-ink-4 mb-3">Scoring factors</p>
        <div className="space-y-2">
          {s.scoring_factors.map((f) => (
            <div key={f.factor} className="flex items-baseline justify-between text-[13px]">
              <span className="text-ink-2">{f.factor}</span>
              <span className={clsx(
                'font-mono tabular-nums',
                f.points > 0 && 'text-ink',
                f.points === 0 && 'text-ink-4',
                f.points < 0 && 'text-[#8f1c1c]',
              )}>
                {f.points > 0 ? '+' : ''}{f.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

function FollowupCard({ company }: { company: typeof COMPANIES[0] }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(company.followup.body).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    })
  }
  return (
    <Card icon={<Mail size={14} strokeWidth={2} />} label="Follow-up · draft (safe mode)">
      <div className="mb-5">
        <div className="text-[12px] text-ink-4 mb-1">Subject</div>
        <div className="text-[15px] font-medium text-ink">{company.followup.subject}</div>
      </div>
      <div className="rounded-xl bg-canvas-2 border hairline p-5">
        <pre className="whitespace-pre-wrap font-sans text-[14px] leading-[1.55] text-ink-2 text-pretty">
{company.followup.body}
        </pre>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[12px] text-ink-4">Not sent · draft only</span>
        <button
          onClick={copy}
          className="h-8 px-3 rounded-full border hairline-strong text-[12px] font-medium text-ink-2 inline-flex items-center gap-1.5 hover:bg-canvas-3 transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </Card>
  )
}

function BizdevCard({ company }: { company: typeof COMPANIES[0] }) {
  const b = company.bizdev
  return (
    <Card icon={<Users size={14} strokeWidth={2} />} label="BizDev · routing recommendation">
      <div className="flex items-start justify-between gap-5 mb-6">
        <div>
          <div className="text-[12px] text-ink-4 mb-1">Assigned to</div>
          <div className="text-[22px] font-semibold text-ink tracking-tight">{b.recommended_manager}</div>
        </div>
        <PriorityBadge value={b.priority} />
      </div>

      <p className="text-[14px] text-ink-3 leading-[1.5] mb-6 text-pretty">{b.reason}</p>

      <div className="pt-6 border-t hairline">
        <p className="text-[12px] text-ink-4 mb-3">Reasoning trace</p>
        <ul className="space-y-2">
          {b.reasoning.map((r) => (
            <li key={r} className="text-[13px] font-mono text-ink-2 flex gap-2">
              <span className="text-ink-4">→</span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-[12px] text-ink-4">
        ASSIGNED_BY_ID is <span className="font-mono text-ink-2">not</span> written · human decides
      </div>
    </Card>
  )
}

function ConfidenceBadge({ value }: { value: string }) {
  const styles: Record<string, string> = {
    high: 'text-[#0a5a2a] bg-[#e6f7ec]',
    medium: 'text-[#7a4a05] bg-[#fff8ec]',
    low: 'text-[#8f1c1c] bg-[#fff5f5]',
  }
  return (
    <span className={clsx('h-6 px-2.5 rounded-full text-[11px] font-semibold flex items-center capitalize', styles[value])}>
      {value}
    </span>
  )
}

function PriorityBadge({ value }: { value: Priority }) {
  const styles: Record<Priority, string> = {
    high: 'bg-ink text-canvas',
    medium: 'bg-canvas-4 text-ink',
    low: 'bg-canvas-3 text-ink-4',
  }
  return (
    <span className={clsx('h-7 px-3 rounded-full text-[12px] font-semibold flex items-center capitalize', styles[value])}>
      {value}
    </span>
  )
}

function TimingBar({ company }: { company: typeof COMPANIES[0] }) {
  const t = company.timing
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="mt-8 rounded-2xl border hairline bg-canvas-2 p-6"
    >
      <div className="flex flex-wrap gap-y-4 items-baseline justify-between">
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          <MetaStat label="Enrichment" value={`${(t.enrichment_ms / 1000).toFixed(1)}s`} />
          <MetaStat label="Scoring" value={`${(t.scoring_ms / 1000).toFixed(1)}s`} />
          <MetaStat label="Total tokens" value={formatCount(t.tokens_in + t.tokens_out)} />
          <MetaStat label="Cost" value={`$${t.cost_usd.toFixed(3)}`} />
        </div>
        <span className="font-mono text-[12px] text-ink-4">{t.model}</span>
      </div>
    </motion.div>
  )
}

function MetaStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[12px] text-ink-4">{label}</div>
      <div className="text-[17px] font-semibold text-ink tabular-nums">{value}</div>
    </div>
  )
}
