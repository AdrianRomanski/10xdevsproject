---
starter_id: nestjs
package_manager: npm
project_name: white-apron
hints:
  language_family: js
  team_size: solo
  deployment_target: fly
  ci_provider: github-actions
  ci_default_flow: auto-deploy-on-merge
  bootstrapper_confidence: verified
  path_taken: custom
  quality_override: false
  self_check_answers:
    typed: true
    from_official_starter: true
    conventions: true
    docs_current: true
    can_judge_agent: true
  has_auth: true
  has_payments: false
  has_realtime: false
  has_ai: true
  has_background_jobs: false
---

## Why this stack

Solo developer shipping white-apron, a personal culinary-progress tracker, in a 3-week after-hours timeline. The user explicitly chose an Angular frontend paired with a NestJS backend over the recommended full-stack default (10x-astro-starter); both frameworks clear all four agent-friendly quality gates (typed, convention-based, popular in JS training data, well-documented), so no quality override applies. NestJS is recorded as the hand-off's starter_id because it carries the load-bearing business logic — account-scoped persistence, unique dish+cuisine XP dedup, and login/logout (FR-001, FR-002, FR-006) — while Angular is a second, manual scaffold not automated by this hand-off. Auth and AI-suggestion (FR-009, post-MVP) feature flags are set; payments, realtime, and background jobs are out of scope per the PRD. Deployment defaults to fly, NestJS's first-listed target, keeping ops minimal for a solo timeline. CI runs on GitHub Actions with auto-deploy-on-merge. The five-point self-check came back clean, so no friction nudge fired.
