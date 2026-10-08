# AI Lead Qualifier — pipeline demo

Interactive portfolio demo of a production sales-qualification pipeline.

A new lead enters the system → gets enriched from open sources → scored by an LLM → a responsible manager is recommended → four contextual comments are posted into the CRM. In 86 seconds on average.

The pipeline is deterministic and human-in-the-loop by design: it never sends an email and never reassigns a deal on its own. Final actions stay with a human.

**Live demo:** https://egor-nikolaev.github.io/ai-lead-qualifier-demo/

## What this shows

Six fictional companies, each taking a different path through the pipeline. Names and data are invented for the demo; real client names are not disclosed.

- **СервисДеск, МаркетЛайн, АэроВектор** — different flavors of segment A/B leads.
- **ТоргПлатформа** — B-tier with legal risk, demonstrates the size-adjusted scoring.
- **Вектор-Снаб** — segment D, routed out of the active queue; the decision is still confirmed by a person.
- **СкайТех** — identity mismatch guard triggers, enrichment fields cleared, deal flagged for manual review.

## Pipeline stages

1. Bitrix24 webhook received
2. Open-source enrichment: company site, DaData (EGRUL by INN), SerpAPI
3. Identity mismatch guard (domain match vs. found company)
4. LLM scoring with strict JSON output and schema validation
5. Postgres balancer recommends the least-loaded manager (advisory only, never writes the assignment)
6. Four AI comments posted to the Bitrix24 timeline

## Production metrics behind the demo

Aggregated over the production window of a 2024 contract project, 22 June — 31 August, about ten weeks. Client name withheld.

- **951** unique leads processed
- **87.0%** enrichment success, **88.5%** scoring success
- **86 s** average cycle time (p95 ≈ 124 s)
- **≈ $0.05** model cost per card, calculated from token usage after the switch to GPT-4o; DaData, SerpAPI and infrastructure are counted separately
- **53.6%** of scored leads fell into segment D and were taken out of the active queue

Three classes of production incidents were found and closed: same-name company substitution, revenue parsed without a currency unit, and invalid model JSON.

## Stack

Demo: React 19, Vite, TypeScript, Tailwind CSS v4, Framer Motion, React Router.

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

OpenAI API (GPT-4 Turbo, later GPT-4o) with JSON mode and Structured Outputs, n8n workflows, REST API Bitrix24, PostgreSQL for analytics and the call log, Docker Compose on a VPS. DaData for the legal registry, SerpAPI and the company site for open-source signals. Reliability came from engineering rather than prompting: idempotency keys, timeouts, retries only on 429 and 5xx with backoff, a typed number parser, a own validator with a limited retry and a manual queue for broken model output.

None of the production code is in this repo. This is a UI demo built from fictional examples and aggregated metrics.
