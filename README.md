# AI Lead Qualifier — pipeline demo

Interactive portfolio demo of a production sales-qualification pipeline.

A new lead enters the system → gets enriched from open sources → scored by an LLM → routed to the right business developer → four contextual comments are posted into the CRM. In 86 seconds. For $0.13.

**Live demo:** https://<your-username>.github.io/ai-lead-qualifier-demo/

## What this shows

Six mock companies, each takes a different path through the pipeline:

- **YClients, Ozon, S7 Airlines** — different flavors of segment A/B leads.
- **Wildberries** — B-tier with legal risk (active founder dispute), demonstrates the size-adjusted scoring.
- **Меркурий-Торг** — segment D (junk), auto-rejected without human involvement.
- **Аэромакс** — identity mismatch guard triggers, enrichment fields cleared, deal flagged for manual review.

## Pipeline stages (real)

1. Bitrix webhook received
2. Perplexity search for open-source signals
3. DaData EGRUL lookup by INN
4. Identity mismatch guard (domain match vs. found company)
5. Claude Sonnet 4.6 scoring with strict JSON output and 4-strategy JSON repair
6. Postgres balancer picks least-loaded manager (advisory, never writes assignment)
7. Four AI comments posted to Bitrix timeline

## Production metrics behind the demo

Aggregated over two months of live operation (22 Jun — 3 Sep 2026, client name withheld):

- **951** unique leads processed
- **87%** enrichment success, **88.5%** scoring success
- **86 s** average cycle time (p95 · 124 s)
- **$0.13** average cost per lead
- **54%** auto-rejected on segment D — that's the point of the whole system

## Stack

React 19, Vite, TypeScript, Tailwind CSS v4, Framer Motion, React Router.

## Local development

```bash
pnpm install
pnpm dev
```

Open http://localhost:5173/ai-lead-qualifier-demo/.

## Deploy

Push to `main`. GitHub Actions workflow builds and deploys to GitHub Pages automatically.

Configure Pages source in your repo settings: **Settings → Pages → Source → GitHub Actions**.

## Underlying architecture (production)

n8n workflows on self-hosted Yandex Cloud, Docker, Postgres for analytics, Cloudflare tunnel + Caddy. Claude Sonnet 4.6 through OpenRouter with a DigitalOcean relay to bypass RU IP restrictions. Perplexity API for open-source enrichment, DaData for legal registry. Guarded deploy with SHA-hash verification, marker checks, and auto-rollback on failed post-deploy verification.

None of the production code is in this repo. This is a UI demo built from anonymized examples and aggregated metrics.
