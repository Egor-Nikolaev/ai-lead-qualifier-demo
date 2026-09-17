import { motion } from 'framer-motion'

const stages = [
  {
    n: '01',
    title: 'Bitrix webhook',
    body: 'New deal event fires. Filter cuts off legacy backlog by ID. Pipeline scoped to inbound-only for safety.',
  },
  {
    n: '02',
    title: 'Enrichment',
    body: 'Perplexity pulls open sources: site, revenue, media, signals. DaData resolves the legal entity via INN. Identity mismatch guard blocks contamination when the model finds the wrong company.',
  },
  {
    n: '03',
    title: 'Scoring',
    body: 'Claude Sonnet 4.6 through OpenRouter, strict JSON output. Robust parser handles four broken-JSON recovery strategies. Named errors, no silent drop.',
  },
  {
    n: '04',
    title: 'Routing',
    body: 'Postgres balancer picks the least loaded manager from bizdev_managers. Weight from stage-based load table. Hard limit prevents skew. Advisory only. A human writes the assignment.',
  },
  {
    n: '05',
    title: 'Comments',
    body: 'Four blocks land in the deal timeline: enrichment, scoring, follow-up draft, bizdev recommendation. Follow-up is not sent. Assignment is not written. Everything stays reversible.',
  },
]

const principles = [
  {
    title: 'Guarded deploy, not brave deploy',
    body: 'Every release runs preflight with SHA hash of the live code, verifies structure and markers after PUT, and auto-rolls back if verification fails. Backups of workflow JSON before each release.',
  },
  {
    title: 'Robust JSON parsing',
    body: 'LLMs sometimes return broken JSON. Four inline recovery strategies: strip markdown fences, slice the object between first { and last }, remove trailing commas, repair string tokens. If all fail, throw a named error into the existing catch, never drop silently.',
  },
  {
    title: 'Identity mismatch guard',
    body: 'When enrichment finds a company that doesn\'t match the expected domain, red flags are wiped completely and the record is marked for manual review. Prevents foreign-company facts leaking into scoring.',
  },
  {
    title: 'Regression tests before production',
    body: 'Every closed bug gets a regression test that fails on the unfixed code and passes on the fix. Ten of ten green before any deploy. Blackbox tests run on real deals with Bitrix mutations intercepted.',
  },
]

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 pt-16 pb-24">
      <p className="eyebrow mb-4">Architecture</p>
      <h1 className="display-2 mb-6 text-balance max-w-[900px]">
        Five stages. Five safety nets. Everything reversible.
      </h1>
      <p className="text-[17px] text-ink-3 max-w-[720px] mb-16 text-pretty">
        The pipeline runs on n8n workflows, Claude Sonnet 4.6 through OpenRouter, DaData for legal registry, Perplexity for open-source search, Postgres for analytics, and Bitrix24 as the CRM.
      </p>

      <section className="mb-24">
        <p className="eyebrow mb-8">Flow</p>
        <div className="border-t hairline">
          {stages.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_240px_1fr] gap-6 py-8 border-b hairline"
            >
              <div className="text-[13px] font-mono text-ink-4 pt-1">{s.n}</div>
              <div className="text-[19px] font-semibold text-ink tracking-tight">{s.title}</div>
              <p className="text-[15px] text-ink-3 leading-[1.55] text-pretty col-span-2 md:col-span-1">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <p className="eyebrow mb-8">Principles</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
            >
              <h3 className="text-[19px] font-semibold text-ink tracking-tight mb-2">{p.title}</h3>
              <p className="text-[15px] text-ink-3 leading-[1.55] text-pretty">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <p className="eyebrow mb-8">Stack</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden border hairline">
          {[
            ['Orchestration', 'n8n (self-hosted)'],
            ['LLM', 'Claude Sonnet 4.6'],
            ['LLM gateway', 'OpenRouter · DO relay'],
            ['Search', 'Perplexity API'],
            ['Legal registry', 'DaData'],
            ['Storage', 'Postgres'],
            ['CRM', 'Bitrix24 REST'],
            ['Infra', 'Yandex Cloud · Docker'],
          ].map(([label, value]) => (
            <div key={label} className="bg-canvas p-6">
              <div className="text-[12px] text-ink-4">{label}</div>
              <div className="mt-1 text-[15px] font-medium text-ink">{value}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
