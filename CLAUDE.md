# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

<!-- BEGIN @przeprogramowani/10x-cli -->

## 10x course skills

Course skills (`/10x-*`) live in `.claude/skills/`; each `SKILL.md` documents when to use it and what it writes.

## Never write to `context/archive/`

Archived changes are immutable; if a resolved target path starts with `context/archive/`, abort with: "This change is archived. Open a new change with `/10x-new` instead."

<!-- END @przeprogramowani/10x-cli -->
