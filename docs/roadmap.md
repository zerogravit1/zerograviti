# Rebrand Roadmap

The goal of this project is to rebuild [zerograviti.com](https://zerograviti.com) as a production engineering project that also serves as Jonathan Schaffer's personal site and technical portfolio.

## Phase 1 — Foundation

- [x] Scaffold the TypeScript application structure.
- [x] Add linting, formatting, typechecking, and unit-test tooling.
- [x] Add the first GitHub Actions validation workflow.
- [-] Add Docker support.
- [x] Build the minimal landing page around the new personal-brand message.
- [x] Add Playwright smoke coverage.
- [x] Deploy to DigitalOcean.

## Phase 2 — Engineering Signals

- [ ] Add observability and tracing.
- [ ] Add performance budgets and automated validation.
- [ ] Add accessibility checks and document the manual accessibility strategy.
- [ ] Add security and dependency scanning.
- [ ] Publish architecture and engineering decision records.
- [ ] Surface safe production health/build metadata on the site.

## Phase 3 — Portfolio Content

- [ ] Add About and experience content.
- [ ] Add project and case-study pages.
- [ ] Add resume links.
- [ ] Add engineering write-ups for selected architecture, testing, CI, observability, and performance decisions.

## Phase 4 — QA Sandbox

Once zerograviti.com is stable, begin building qasandbox.dev as the engineering lab rather than a second portfolio site.

- [ ] Define shared infrastructure that can be reused across both domains.
- [ ] Add a deliberately difficult Playwright test environment.
- [ ] Demonstrate multi-user/session workflows.
- [ ] Demonstrate asynchronous behavior and network mocking.
- [ ] Add observability-driven failure diagnostics.
- [ ] Explore assisted self-healing with auditable, reviewable locator repair suggestions.

## Guiding Principle

Build one production-quality platform first, then prove the architecture by extending it to a second product.
