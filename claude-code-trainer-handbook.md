# Claude Code — Trainer Handbook
## Demo Session: Capabilities, Setup & Team Adoption

---

**Document Type:** Trainer Delivery Guide  
**Session Format:** Demo-Only (No Participant Hands-On)  
**Recommended Duration:** 3.5 to 4 Hours (including breaks)  
**Audience:** Developers, Tech Leads, Engineering Managers  
**Trainer Prerequisite:** Claude Code installed, authenticated, sample project ready

---

## How to Use This Handbook

This handbook is your step-by-step script for the entire session. Each module includes:

- **Trainer Talking Points** — what to say, in plain language
- **Demo Steps** — exact commands to type, in order
- **What Participants Will See** — so you know when to pause and explain
- **Key Teaching Moments** — where to slow down and reinforce the concept
- **Transition Lines** — how to move cleanly to the next module

Do not read this handbook aloud. Use it as a pre-session preparation tool and keep it open as a reference during delivery. The talking points are written as prompts for natural speech, not as scripts.

---

## Pre-Session Checklist

Complete all of these before participants enter the room.

**Environment Setup**

- [ ] Claude Code installed globally: `npm install -g @anthropic-ai/claude-code`
- [ ] Authenticated with a valid Pro, Max, Team, or Enterprise account
- [ ] Terminal open, font size set to minimum 18pt for screen visibility
- [ ] A sample project repo cloned locally (Node.js or Python preferred — something with at least 10 files)
- [ ] VS Code or preferred editor open alongside terminal
- [ ] Browser open at `claude.ai` — you may need to reference it
- [ ] Screen resolution set so terminal and editor are both visible side by side

**Demo Project Preparation**

Create this folder structure before the session — you will build on it live:

```
demo-project/
├── src/
│   ├── auth/
│   │   ├── authService.js     ← deliberately has a bug (see Module 3 demo)
│   │   └── tokenHelper.js
│   ├── api/
│   │   ├── routes.js
│   │   └── middleware.js
│   └── utils/
│       └── validators.js
├── tests/
│   └── (empty — you will generate tests live)
├── package.json
└── README.md
```

Introduce a deliberate bug in `authService.js` — for example, a missing `await` on an async call, or a token expiry check that always returns `true`. You will use this in the bug fix demo.

**Slide / Screen Setup**

Keep this handbook open on a second screen or printed. Your primary screen should show only the terminal and editor.

---

## Session Opening (10 Minutes)

### Trainer Talking Points

Welcome participants and immediately set expectations for the session:

> "Today is a pure demo session. You will not type anything — your job is to watch, ask questions, and leave with a clear picture of what Claude Code can do and how to set it up for your team. Everything I show today, you can replicate tomorrow."

Establish the framing before the first demo:

> "Most of you have used Claude in a chat window. What I am showing today is completely different. Claude Code lives in your terminal, inside your project, with full access to your files and codebase. It is not answering questions about code. It is writing, running, debugging, and organizing code — on your behalf."

Introduce the six building blocks that the entire session is organized around. Write these on a whiteboard or show them on screen:

```
1. CLAUDE.md         → Project memory — what Claude knows about your project
2. Slash Commands    → Shortcuts you trigger manually
3. Skills            → Workflows Claude triggers automatically
4. Agents            → Specialist Claude instances for focused domains
5. Hooks             → Automation that fires at key moments
6. Plugins           → Packaging all of the above for your team
```

> "Every module today introduces one of these. By the end, you will see how they fit together into a complete team setup."

---

## Module 1 — What is Claude Code and First Run (15 Minutes)

### Trainer Talking Points

Start with the mental model, not the installation:

> "Claude Code is described as a coding assistant, but that undersells it. Think of it as a general computer automation agent that happens to be excellent at code. Anything you can do in a terminal — writing files, running tests, making Git commits, calling APIs — Claude Code can do on your behalf, guided by natural language."

Talk about where it runs:

> "It runs in the CLI, inside VS Code and JetBrains as extensions, in a standalone desktop app, and at claude.ai/code in the browser. Today we are in the terminal — which is where you get the fullest experience."

### Demo Steps — Installation

Show the installation even if it is already done. Participants need to see it is a one-line setup.

```bash
# Step 1 — Install globally
npm install -g @anthropic-ai/claude-code

# Step 2 — Check version
claude --version

# Step 3 — Start Claude Code
claude
```

On first launch, Claude Code will prompt for authentication. Show the login flow:

```
> 1. Claude account with subscription (Pro, Max, Team, or Enterprise)
> 2. Anthropic Console account (API billing)
```

Select option 1. A browser window opens for OAuth. Complete login and return to terminal.

### Demo Steps — First Interaction

Navigate to your demo project:

```bash
cd demo-project
claude
```

Type this as your first prompt — say nothing before you type it, let the output speak for itself:

```
Explain this codebase to me. Give me the architecture, the main components,
and what each file is responsible for.
```

**What Participants Will See:** Claude reads every file in the project and produces a structured summary of the architecture — without you configuring anything.

### Key Teaching Moment

Pause here. This is your first "wow" moment. Let it land before speaking:

> "I didn't tell Claude where anything was. I didn't set up a config file. I didn't describe the project. It read the codebase the same way a new developer would — by exploring the files. This is what I mean by 'it understands your codebase.' That understanding is the foundation for everything else in today's session."

### Transition Line

> "Now that you have seen Claude Code read a project, let me show you how to make it truly know your project — not just read it, but understand your team's rules, standards, and architecture. That is what CLAUDE.md is for."

---

## Module 2 — Project-Level Setup: Files and Folders (25 Minutes)

### Trainer Talking Points

This module covers the `.claude/` folder, `CLAUDE.md`, and `settings.json`. These three form the foundation of every team deployment.

> "When you open any project in Claude Code, it automatically looks for configuration files. These files tell Claude who you are as a team, what your standards are, and what it is and is not allowed to do. This is how you go from Claude being a generic AI to Claude being your team's AI."

### The Full Folder Structure — Show on Screen

Display this structure in your editor or terminal:

```
your-project/
├── CLAUDE.md                     ← Claude reads this every session
├── src/
│   └── CLAUDE.md                 ← Subsystem-specific rules (Claude finds these too)
├── .claude/
│   ├── settings.json             ← Permissions, model config, hooks
│   ├── commands/                 ← Custom slash commands (covered in Module 3)
│   │   ├── review.md
│   │   └── deploy.md
│   └── agents/                   ← Custom subagents
└── .mcp.json                     ← MCP server connections (covered in Module 7)
```

Also show the global user-level config:

```
~/.claude/
├── CLAUDE.md                     ← Applies to ALL your projects
├── commands/                     ← Your personal slash commands (all projects)
└── settings.json                 ← User-level preferences
```

Key point to make verbally:

> "Notice there are two levels — project level inside the repo, and user level in your home directory. Project-level files should be committed to Git so every team member gets them. User-level files are yours alone."

### Demo Steps — Creating CLAUDE.md

Navigate to the demo project and create `CLAUDE.md` live:

```bash
cd demo-project
touch CLAUDE.md
code CLAUDE.md   # or open in your editor
```

Type this content live, explaining each section as you add it:

```markdown
# Project: Demo App — CLAUDE.md

## Tech Stack
- Runtime: Node.js 20
- Framework: Express.js
- Database: PostgreSQL with Prisma ORM
- Testing: Jest
- Language: TypeScript for all new code only

## Architecture
- `src/auth/` — authentication and token management
- `src/api/` — route handlers and middleware
- `src/utils/` — shared utility functions
- `tests/` — mirrors src structure, file.test.ts naming

## Coding Standards
- Always use async/await, never raw Promises
- All functions must have JSDoc comments
- No console.log in production code — use the logger utility
- Every new function must have at least one unit test

## What Claude Must Never Do
- Never modify .env or .env.* files
- Never push directly to main branch
- Never remove existing tests
- Never install packages without confirming with the developer

## PR and Git Standards
- Commit messages follow Conventional Commits: feat:, fix:, docs:, test:
- PR descriptions must include: what changed, why it changed, how to test
```

Save the file. Now demonstrate the before/after effect:

**Before CLAUDE.md — ask Claude to add a function:**

```bash
# Exit and restart without CLAUDE.md to show the difference
# (or show this conceptually by describing what raw output looks like)
```

**After CLAUDE.md — ask the same thing:**

```
Add a function to validate email addresses in validators.js
```

**What Participants Will See:** Claude produces TypeScript code with JSDoc comments, using async/await, with a test already written — all because CLAUDE.md defined those standards.

### Key Teaching Moment

> "CLAUDE.md is often called the project's memory card. Every time someone on your team opens this project in Claude Code, Claude already knows your standards. You do not brief it. You do not include instructions in every prompt. The rules are always there. This is how you make AI output consistent across an entire team."

### Demo Steps — settings.json

Create the permissions file:

```bash
mkdir -p .claude
touch .claude/settings.json
code .claude/settings.json
```

Type this content and explain each section:

```json
{
  "model": "claude-sonnet-4-6",
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git status)",
      "Bash(git diff)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Read(**)",
      "Write(src/**)",
      "Write(tests/**)"
    ],
    "ask": [
      "Bash(git push:*)",
      "Bash(npm install *)",
      "Write(package.json)"
    ],
    "deny": [
      "Read(./.env*)",
      "Read(./secrets/**)",
      "Read(./**/credentials*)",
      "Bash(rm -rf:*)",
      "Bash(curl:*)",
      "Bash(wget:*)"
    ]
  }
}
```

Explain each permission tier:

> "Allow means Claude does it without asking. Ask means Claude pauses and says 'I want to do this — may I?' Deny is a hard block — Claude cannot do it no matter what the prompt says. This is your safety guardrail."

Point out the deny list specifically:

> "Notice that `.env` files are on the deny list. This means even if a participant asks Claude to 'read my environment variables,' it cannot. The settings file protects you from accidental mistakes or prompt injection attempts."

### Key Teaching Moment

> "For enterprise teams, this settings file gets committed to Git. Every developer on the team gets the same permissions profile. Your security team defines the deny list once. Everyone is protected."

### Transition Line

> "Now your project has a memory and has safety rules. The next step is giving developers their own shortcuts — things they want to trigger quickly without typing a full prompt every time. That is slash commands."

---

## Module 3 — Slash Commands (20 Minutes)

### Trainer Talking Points

> "Slash commands are the simplest extension point in Claude Code. You create a Markdown file, put a prompt inside it, and that file becomes a command you can trigger by typing a forward slash. Think of them as saved, reusable prompts."

Show the distinction clearly:

> "There are two types: built-in commands that come with Claude Code, and custom commands that you create. I will show both."

### Demo Steps — Built-in Commands

Inside a Claude Code session, type each of these and briefly show what they do:

```
/help           → shows all available commands, including your custom ones
/clear          → clears the conversation context (start fresh)
/model          → switch between Claude models mid-session
/review         → triggers a code review on current context
/commit         → generates a conventional commit message for staged changes
/status         → shows current session and permissions status
```

Do not spend more than 30 seconds on each. The goal is awareness, not depth.

### Demo Steps — Creating Custom Slash Commands

Show the folder first:

```bash
ls .claude/commands/    # empty right now
```

Create the first command — a security review:

```bash
cat > .claude/commands/security-review.md << 'EOF'
You are a senior application security engineer with deep expertise in OWASP
Top 10 vulnerabilities and secure API design.

This is a Node.js/Express authentication API using JWT-based access tokens,
bcrypt password hashing, and an in-memory refresh token store. The codebase
has three layers: src/api/ (transport), src/auth/ (domain logic), and
src/utils/ (validators and logger).

Review the code currently in context for security vulnerabilities.

For each issue found, provide:
1. OWASP category and number
2. Severity: Critical / High / Medium / Low
3. Exact file and line number
4. What an attacker could do with this vulnerability — one sentence
5. A corrected code snippet

Focus areas:
- Authentication and authorization bypass
- Missing input validation or sanitization
- Sensitive data exposure in logs, responses, or error messages
- Insecure JWT handling: weak secrets, missing expiry, improper verification
- bcrypt misuse or async handling errors
- Hardcoded secrets or credentials

End with a severity summary table: Critical / High / Medium / Low counts
and one recommended immediate action.

Be direct and specific. Do not soften findings. Every vulnerability should
be reported exactly as it is.
EOF
```

Create a parameterized command — fixing a GitHub issue:

```bash
cat > .claude/commands/fix-issue.md << 'EOF'
You are a careful, experienced backend developer who makes minimal, surgical
changes to fix problems without introducing new ones.

This is a Node.js/Express authentication API. Follow the error handling
convention already established in the codebase: route handlers translate
known domain errors to HTTP status codes inline (for example,
'Invalid credentials' maps to 401), and pass everything unknown to next(err)
where the global errorHandler in middleware.js handles it and returns a
generic 500. Never leak internal error messages to clients from the global
handler.

Fix issue #$ARGUMENTS in this codebase.

Steps:
1. Understand exactly what the issue is describing
2. Identify the minimum set of files that need to change
3. Make only the changes necessary to resolve the issue — nothing more
4. Write or update tests to cover the fix
5. Summarise: what changed, which files were affected, and how to verify

Always follow the standards in CLAUDE.md. Do not modify .env files or push
any changes.

Be conservative. If something is not broken, do not touch it.
EOF
```

Create the commit message command:

```bash
cat > .claude/commands/commit.md << 'EOF'
You are a senior developer writing a commit message that will be read during
code review and referenced in the git log for months to come.

This project follows Conventional Commits. Valid types are: feat, fix, test,
refactor, docs, chore, perf. Valid scopes are the folder names: auth, api,
utils, config, tests.

First run git diff --staged to inspect exactly what has changed. Base the
commit message entirely on what you observe — do not guess or summarise from
memory.

Generate a Conventional Commits message for the staged changes.

Format:
  type(scope): short summary under 72 characters

  - Bullet point explaining what changed and why, not how
  - One bullet per logical change group
  - Reference issue numbers if visible in the diff (e.g. closes #204)

Output only the commit message. No explanation, no commentary, no preamble.

Be precise and factual. Avoid filler words like update, improve, fix up,
tweak, or adjust. Every word should earn its place.
EOF
```

Create the GitHub issue creation command:

```bash
cat > .claude/commands/create-issue.md << 'EOF'
You are a senior developer raising a well-structured GitHub issue for your team.

This is a Node.js/Express authentication API. You have just identified a problem,
a missing feature, or a technical debt item in this codebase.

Based on the code currently in context, create a GitHub issue using the GitHub
MCP tool.

Structure the issue as follows:

Title: [type]: short description — use feat, bug, chore, or perf as prefix

Body:
## Summary
One paragraph describing the problem or requirement clearly.

## Current Behaviour
What happens today (for bugs) or what is missing (for features).

## Expected Behaviour
What should happen after this issue is resolved.

## Files Affected
List the specific files and functions relevant to this issue.

## Acceptance Criteria
- [ ] Checkbox list of conditions that must be true for this issue to be closed

Use the GitHub MCP to post this issue to the repository. Confirm with the
issue URL once created.

Be specific. Use file names and function names. No vague language.
EOF
```

Create a personal standup command (global, all projects):

```bash
mkdir -p ~/.claude/commands
cat > ~/.claude/commands/standup.md << 'EOF'
You are a senior developer preparing a daily standup update for your team.

This is a Node.js/Express authentication API project. Check
git log --since="00:00" --oneline and git diff HEAD to understand
what actually changed today.

Draft a standup update based only on what you find in the git history
and open files — do not invent or assume work that is not visible.

Format:
Yesterday: [completed items — specific function or file names]
Today:     [in-progress items based on uncommitted changes or open TODOs]
Blockers:  [failing tests, TODO/FIXME comments, incomplete functions]

Keep each section to 3 bullet points maximum.
Use specific names — file names, function names, issue numbers where visible.

Be factual and brief. No filler. Write it as if reading it aloud in 30 seconds.
EOF
```

### Demo Steps — Running the Commands

Now demonstrate all four project commands in workflow order. Frame this as the **full bug lifecycle in the terminal**:

```
/security-review
```

Claude audits the auth module and finds a problem — for example, the token expiry logic has no cleanup for stale refresh tokens in the store.

```
/create-issue
```

Claude drafts a structured GitHub issue from that finding — title, summary, current behaviour, expected behaviour, files affected, acceptance criteria — and posts it directly to GitHub via MCP. It returns the issue URL.

> "The issue is now tracked on GitHub. I did not open a browser. I did not copy and paste anything."

```
/fix-issue 1
```

Claude pulls issue #1, reads the description, identifies the relevant code in `authService.js`, makes the fix, and writes a test.

```
/commit
```

Claude runs `git diff --staged`, reads what actually changed, and produces a Conventional Commits message referencing the issue number.

Then show the personal command:

```
/standup
```

**What Participants Will See:** Four commands covering the entire bug lifecycle — find, track, fix, commit — without leaving the terminal once.

Point out the `/commit` behaviour specifically:

> "Watch what Claude does before writing a single word of the commit message — it runs `git diff --staged` first. It reads before it writes. That is the prompt at work. Without that instruction, Claude would guess from memory and often get the scope wrong."

Point out the `/create-issue` and `/fix-issue` connection:

> "These two commands work as a pair. `/create-issue` raises the issue on GitHub. `/fix-issue` consumes it. The issue number is the handoff between them. This is Claude Code participating in your actual GitHub workflow — not a simulation of it."

> "Note: `/create-issue` and `/fix-issue` require the GitHub MCP server to be connected. We will set that up properly in the MCP module. For now, understand the command structure — in Module 8 you will see it working end to end."

### Key Teaching Moment

> "Notice the difference between project commands and personal commands. The files in `.claude/commands/` live inside your Git repo — when you commit them, every team member gets those commands automatically. The files in `~/.claude/commands/` are yours alone, across all your projects. Personal productivity versus team standards."

> "Notice also that the four project commands tell a complete story in sequence: `/security-review` finds the problem, `/create-issue` tracks it, `/fix-issue` solves it, `/commit` records it. That is the entire bug lifecycle — and every step is a single command."

Point out the `/help` output:

> "When a developer types `/help` in your project, your custom commands appear in the list alongside the built-in ones. Claude Code does not distinguish between them. Your team commands become first-class citizens."

### Transition Line

> "Slash commands are triggered by you. But what if you want Claude to automatically bring in specialized knowledge — without you remembering to ask? That is what Skills are for."

---

## Module 4 — Skills (20 Minutes)

### Trainer Talking Points

> "Skills are the next layer up from slash commands. Instead of you typing a command, Claude Code reads the task and decides which skill to apply. You author the skill once — Claude uses it whenever the task matches."

Draw the distinction clearly with a table on screen or whiteboard:

```
Slash Commands    → You type /command to trigger
Skills            → Claude reads context, applies skill automatically
```

> "The analogy I use: slash commands are like bookmarks. Skills are like training someone. You write down how to handle a type of problem, and Claude uses that guidance whenever that problem appears."

### Demo Steps — Creating a Skill

Show the folder structure first:

```bash
mkdir -p .claude/skills/code-review
touch .claude/skills/code-review/SKILL.md
code .claude/skills/code-review/SKILL.md
```

Type this skill definition live:

```markdown
---
name: code-review
description: >
  Use this skill when the task involves reviewing, auditing, or assessing
  code quality, security, or test coverage. Triggers on phrases like
  "review this", "check this code", "audit the auth module", or any
  request to evaluate existing code.
---

# Code Review Skill

When performing a code review, always cover all four dimensions in order:

## 1. Security
- Check for injection vulnerabilities (SQL, command, path traversal)
- Verify authentication and authorization on every endpoint
- Confirm sensitive data is never logged or exposed in responses

## 2. Performance
- Identify N+1 query patterns
- Flag synchronous operations that should be async
- Note missing database indexes on queried fields

## 3. Test Coverage
- List functions that have no test coverage
- Identify edge cases not covered by existing tests
- Suggest specific test cases with example inputs and expected outputs

## 4. Code Quality
- Flag violations of standards defined in CLAUDE.md
- Identify duplicated logic that should be extracted
- Note missing error handling

Produce output as a structured report with a severity level (Critical / High / Medium / Low)
for each finding. End with a summary score out of 10 and one concrete recommended first action.
```

Now demonstrate auto-invocation:

```
Look at the auth module and tell me if there are any problems.
```

**What Participants Will See:** Claude reads the phrase "tell me if there are any problems" and automatically invokes the code-review skill — producing the full four-dimension report without you typing `/code-review`.

### Demo Steps — Manual-Only Skill (Disable Auto-Invocation)

Create a deploy skill that only you can trigger:

```bash
mkdir -p .claude/skills/deploy
cat > .claude/skills/deploy/SKILL.md << 'EOF'
---
name: deploy
description: Deploy the application to the staging environment
disable-model-invocation: true
allowed-tools: Bash(npm:*), Bash(git:*)
---

# Deployment Skill

Deploy steps in exact order:
1. Run `npm run test` — abort if any test fails
2. Run `npm run build`
3. Run `git tag` with today's date and increment patch version
4. Push the tag to origin
5. Confirm deployment URL is responding with HTTP 200

Never deploy if:
- Any test is failing
- There are uncommitted changes in src/
- The current branch is not staging or main
EOF
```

Explain the `disable-model-invocation: true` flag:

> "This flag means Claude will never auto-trigger this skill, no matter what someone asks. It only runs when you explicitly call it as `/deploy`. This is important for destructive or irreversible operations. You want a human to consciously choose to deploy — not have it happen because Claude inferred it was time."

### Demo Steps — write-tests Skill (Auto-invoked)

Create the third skill — test writing. This one auto-invokes, so Claude generates tests as part of completing any task that produces new code:

```bash
mkdir -p .claude/skills/write-tests
cat > .claude/skills/write-tests/SKILL.md << 'EOF'
---
name: write-tests
description: >
  Use this skill automatically whenever a new function, method, or module is
  added or modified. Triggers on phrases like "add a function", "create a
  utility", "implement this", or any task that produces new testable code.
  Do not wait to be asked — write tests as part of completing the task.
---

# Write Tests Skill

You are a senior QA engineer who writes exhaustive Jest test suites for
Node.js applications.

This project uses Jest with Supertest for integration tests. Test files live
in tests/ mirroring the src/ structure, named with a .test.js suffix.
The logger uses structured JSON output — do not assert on console output.
JWT_SECRET defaults to 'dev-secret-key' in tests — do not assert real
security behaviour against this default.

## When to Invoke
Automatically invoke this skill when:
- A new function is added to any file in src/
- An existing function is modified in a way that changes its behaviour
- A new module or route is created

## What to Produce
For each new or modified function, generate tests covering:
1. The happy path with valid inputs
2. Edge cases: empty strings, null, undefined, zero, boundary values
3. Error cases and expected thrown exceptions or returned false values

## Rules
- Use describe() blocks per function with clear test() descriptions
- Do not mock unless the function has an external dependency
- Mirror the source file path under tests/ with a .test.js suffix
- Run npm test after writing to confirm all new tests pass
- Append to an existing test file if one already exists for that module

Be thorough. Prioritise edge cases and error paths over happy paths.
EOF
```

Demonstrate the auto-invocation by asking Claude to add the password strength function:

```
Add a function to validate password strength — must have uppercase, lowercase,
a number, and a special character, minimum 10 characters.
```

**What Participants Will See:** Claude adds `validatePasswordStrength` to `validators.js` AND immediately writes tests for it in `tests/utils/validators.test.js` — without being asked. The skill triggered automatically because the task produced new testable code.

Point out what did not happen:

> "I did not type '/write-tests'. I did not say 'and write tests for it'. Claude added tests because the skill tells it that producing new code and producing tests are the same task. This is the difference between a skill and a command — one you remember to invoke, the other just happens."

### Key Teaching Moment

> "Skills give Claude domain expertise that persists across your entire team. A senior developer writes each skill once — with all the things your team actually cares about. The code review skill carries your review standards. The write-tests skill carries your testing conventions. From that point on, every developer on the team works with those standards built in — automatically."

### Transition Line

> "Skills give Claude reusable domain expertise. But what if you want to go further — give Claude a completely different persona and specialisation for a whole category of work? A database expert that only ever thinks about data. A security analyst that only ever thinks about vulnerabilities. That is what Agents are for."

---

## Module 5 — Agents: Specialist Claude Instances (20 Minutes)

### Trainer Talking Points

Start by separating Agents from everything the audience has seen so far:

> "Everything we have built — CLAUDE.md, commands, skills — applies to Claude Code as a whole. Agents are different. An agent is a separate Claude instance with its own persona, its own specialisation, its own set of allowed tools, and its own isolated context window. You are not customising Claude. You are creating a specialist."

Draw the distinction between Skills and Agents clearly — this is the question participants will have:

> "A skill tells the main Claude how to handle a specific type of task. An agent is a completely separate Claude that you hand a task off to. The main Claude delegates to it. The agent works in isolation, goes deep in its domain, and returns a result — without polluting the main session's context."

Show the comparison:

```
Skill    → Claude learns a technique and applies it inline
Agent    → Claude hands work off to a specialist, gets results back
```

> "The analogy is the difference between a developer who has read a security book and a dedicated security engineer on your team. The skill is the book. The agent is the engineer."

### Demo Steps — Understanding the Agents Folder

Show the folder location:

```bash
ls .claude/agents/
```

An agent lives in a single Markdown file inside `.claude/agents/`. Each file is one agent. The filename becomes the agent's identifier.

```
.claude/
└── agents/
    ├── db-specialist.md       ← A database domain expert
    ├── security-analyst.md    ← A security-focused reviewer
    └── pr-summariser.md       ← Summarises PRs for non-technical stakeholders
```

### Demo Steps — Creating a Custom Agent

Create the database specialist agent live:

```bash
touch .claude/agents/db-specialist.md
code .claude/agents/db-specialist.md
```

Type this agent definition, explaining each section as you go:

```markdown
---
name: db-specialist
description: >
  A PostgreSQL and Prisma ORM specialist. Use this agent when tasks involve
  database schema design, query optimisation, migration files, index strategy,
  or any Prisma model changes. Invoke with: "ask the db-specialist to..."
  or "use the db agent to review this query".
allowed-tools:
  - Read
  - Bash(npx prisma *)
  - Bash(psql *)
model: claude-sonnet-4-6
---

# Database Specialist Agent

You are a senior database engineer with deep expertise in PostgreSQL and Prisma ORM.
You think exclusively about data — schema correctness, query performance, index
strategy, and migration safety. You do not write application logic.

## Your Responsibilities
- Review Prisma schema files for correctness and best practices
- Identify missing indexes on frequently queried or joined fields
- Flag N+1 query patterns in Prisma calls
- Write and validate database migration files
- Suggest query rewrites for performance

## Your Standards
- Every foreign key must have a corresponding index
- Migrations must be reversible unless explicitly told otherwise
- Never suggest dropping columns without a deprecation migration first
- Always check for cascading delete implications before schema changes

## Output Format
For schema reviews: list each finding with table name, field name, issue, and fix.
For query reviews: show the original, explain the problem, show the optimised version.
For migrations: produce the full Prisma migration file, ready to run.
```

Now create a second agent — the security analyst:

```bash
cat > .claude/agents/security-analyst.md << 'EOF'
---
name: security-analyst
description: >
  A security-focused code reviewer specialising in authentication, authorisation,
  input validation, and OWASP Top 10 vulnerabilities. Invoke when you need a
  dedicated security review: "ask the security-analyst to audit this file".
allowed-tools:
  - Read
  - Bash(npm audit)
  - Bash(grep *)
model: claude-sonnet-4-6
---

# Security Analyst Agent

You are a senior application security engineer. You read code exclusively through
a security lens. You do not suggest feature improvements or code style changes.
You find vulnerabilities and you explain how to fix them.

## Your Focus Areas
- Authentication bypass and broken access control
- Injection vulnerabilities: SQL, command, path traversal
- Sensitive data exposure in logs, responses, or error messages
- Insecure token handling: weak secrets, missing expiry, improper storage
- Missing input validation and sanitisation
- Dependency vulnerabilities (flag for npm audit review)

## OWASP Categorisation
Tag every finding with its OWASP Top 10 category where applicable.

## Output Format
For each finding:
- OWASP Category
- Severity: Critical / High / Medium / Low
- File and line number
- What an attacker could do with this vulnerability
- Exact fix with corrected code snippet

End with: total finding count by severity, and one recommended immediate action.
EOF
```

### Demo Steps — Invoking an Agent

Show three ways to invoke an agent:

**Method 1 — Natural language delegation:**
```
Ask the db-specialist to review the Prisma schema in this project
and identify any missing indexes.
```

**Method 2 — Direct mention by name:**
```
Use the security-analyst agent to audit authService.js.
```

**Method 3 — Via the /agents command:**
```
/agents
```

This shows a list of all available agents. Participants can see the agents you have created appear alongside any built-in ones.

**What Participants Will See:** Claude Code spawns the named agent in its own context window. The agent reads only what it needs, applies its specialised persona, and returns a focused report. The main session context is not polluted with the agent's working.

### Demo Steps — Comparing Agent vs Main Claude Output

This is the most effective demo moment in this module. Run it back to back.

**First — ask main Claude directly:**
```
Review authService.js for security issues.
```

Note the output — it will be a general review covering multiple concerns.

**Then — delegate to the security-analyst agent:**
```
Use the security-analyst agent to audit authService.js.
```

**What Participants Will See:** The agent's output is narrower, deeper, and structured differently. It uses OWASP categories. It ignores code style. It is entirely focused on security. The contrast between the two outputs is the teaching moment.

Pause here and ask the room:

> "Which report would you rather show your CISO?"

### Key Teaching Moment — Agents vs Skills vs Slash Commands

Bring the three concepts together with a clear decision framework:

```
Use a Slash Command when:
→ You want a repeatable prompt you trigger manually
→ Example: /commit, /security-review

Use a Skill when:
→ You want Claude to automatically apply expertise based on context
→ Example: Claude auto-invokes code-review skill when you ask it to "check the code"

Use an Agent when:
→ You want a fully isolated specialist with its own persona and tool permissions
→ You want context isolation — the agent's work does not bleed into the main session
→ You want a different model or tool set for a specific domain
→ Example: database expert, security analyst, technical writer, PR summariser
```

> "The key differentiator for agents is isolation. When you hand work to an agent, the main Claude session does not accumulate the context from that work. For large tasks — auditing a whole module, reviewing a complex schema — this isolation keeps the main session clean and focused."

### Demo Steps — Agents in Plugins

Show that agents are a first-class plugin component, just like commands and skills:

```
my-team-plugin/
├── .claude-plugin/
│   └── plugin.json
├── commands/
├── skills/
├── agents/                    ← Agents go here in the plugin
│   ├── db-specialist.md
│   └── security-analyst.md
└── hooks/
    └── hooks.json
```

Update the `plugin.json` to include agents:

```json
{
  "name": "demo-team-plugin",
  "version": "1.1.0",
  "description": "Standard Claude Code setup for our engineering team",
  "commands": ["commands/"],
  "skills": ["skills/"],
  "agents": ["agents/"],
  "hooks": "hooks/hooks.json"
}
```

> "Once agents are in the plugin, every developer who installs the plugin gets the full team roster of specialists. New developer joins on Monday, installs the plugin, and immediately has access to the same database expert and security analyst that the senior team has been using."

### Transition Line

> "Agents give Claude specialised identities for focused work. The next layer works at a different level entirely — not what Claude knows or who Claude is, but what happens automatically around Claude's actions. Those are Hooks."

---

## Module 6 — Hooks (20 Minutes)

### Trainer Talking Points

Show the four hook types on screen:

```
PostToolUse    → fires after Claude writes, edits, or runs something
PreToolUse     → fires before Claude runs a command (can block it)
Stop           → fires when Claude finishes a task
Notification   → fires when Claude needs your attention
```

> "The most common use case is PostToolUse — run a linter or formatter every time Claude writes a file. This means Claude's output always meets your code quality standards, even if Claude's output was slightly off-format."

### Demo Steps — Adding Hooks to settings.json

Open `.claude/settings.json` and add the hooks section:

```json
{
  "model": "claude-sonnet-4-6",
  "permissions": {
    "allow": ["Bash(npm run *)", "Bash(git status)", "Bash(git diff)", "Bash(git add *)", "Bash(git commit *)"],
    "ask": ["Bash(git push:*)", "Bash(npm install *)"],
    "deny": ["Read(./.env*)", "Read(./secrets/**)", "Bash(rm -rf:*)"]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx eslint --fix 2>/dev/null || true"
          }
        ]
      },
      {
        "matcher": "Write(*.py)",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs python -m black"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude finished\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

Walk through each hook as you type it:

**Hook 1 — Auto-lint JavaScript/TypeScript after every file write:**

> "Every time Claude writes or edits a file, ESLint runs automatically with auto-fix. Claude's output is always linted. You never have to remind Claude to produce clean code."

**Hook 2 — Auto-format Python files:**

> "Same idea — Black runs on every `.py` file Claude touches. Consistent formatting, automatically."

**Hook 3 — Desktop notification when Claude finishes:**

> "This is quality of life. When you give Claude a large task — build this feature, refactor this module — you do not sit watching the terminal. You go do something else. When Claude finishes, you get a desktop notification. This changes how you use Claude Code for long-running tasks."

Now demonstrate: Give Claude a multi-file task that creates new files without touching `authService.js`:

```
Add request rate limiting middleware to the API layer.
Create a rateLimiter.js file in src/api/ that limits each IP to
100 requests per 15 minutes. Apply it to all /api/auth routes in routes.js
and add a unit test for it in tests/api/.
```

While Claude works, turn away from the screen briefly. When the notification fires, come back.

**What Participants Will See:** Claude creates `src/api/rateLimiter.js`, edits `src/api/routes.js`, and creates `tests/api/rateLimiter.test.js`. ESLint runs automatically after each file is written — participants see it fire three separate times. The desktop notification appears when the task is complete.

Point out the ESLint runs specifically:

> "Watch the terminal between each file Claude writes. That is ESLint running automatically — not because I asked, but because the hook fired. Three files written, three linting passes, zero manual commands."

### Key Teaching Moment

> "Notice something important: I did not ask Claude to lint the code. I did not ask Claude to notify me. These things happened because of the configuration, not because of the prompt. This is how you make quality automatic rather than manual. The developer's job becomes directing the work — the infrastructure handles the standards."

**For Tech Leads and Engineering Managers specifically:**

> "Hooks are how you enforce team standards without relying on individuals to remember. You write the hook once in `settings.json`, commit it to Git, and every developer on the team gets that quality gate automatically. Code review stops being the place where you catch formatting issues, because formatting issues no longer exist by the time code reaches review."

### Transition Line

> "We now have configuration, commands, skills, agents, and automation all working together. The challenge is — how do you share all of this with your team? How does a new developer get everything set up with one command instead of spending a day configuring? That is what Plugins solve."

---

## Module 7 — Plugins: Packaging and Sharing Your Setup (20 Minutes)

### Trainer Talking Points

> "Everything we have built in the last five modules — the commands, skills, agents, and hooks — lives in your project. But what if you want to share a set of capabilities across multiple projects? Or distribute your entire team setup to a new developer in one command? Plugins solve this."

Describe the problem clearly:

> "Without plugins, when a new developer joins your team, someone sends them a Slack message saying 'copy this commands folder, add these entries to settings.json, install these MCP servers.' Two hours later they have a slightly different setup than everyone else. Plugins make your entire Claude Code configuration installable."

### Demo Steps — Plugin Folder Structure

Show the structure on screen:

```bash
mkdir -p my-team-plugin/.claude-plugin
mkdir -p my-team-plugin/commands
mkdir -p my-team-plugin/agents
mkdir -p my-team-plugin/skills/code-review
mkdir -p my-team-plugin/hooks
touch my-team-plugin/.claude-plugin/plugin.json
```

Create the `plugin.json` manifest:

```bash
cat > my-team-plugin/.claude-plugin/plugin.json << 'EOF'
{
  "name": "my-team-plugin",
  "version": "1.0.0",
  "description": "Standard Claude Code setup for our engineering team",
  "author": "Engineering Team",
  "commands": ["commands/"],
  "agents": ["agents/"],
  "skills": ["skills/"],
  "hooks": "hooks/hooks.json"
}
EOF
```

Call out the critical mistake to avoid:

> "One important rule: the `commands/`, `agents/`, `skills/`, and `hooks/` directories go at the plugin root level — not inside the `.claude-plugin/` directory. Only `plugin.json` goes inside `.claude-plugin/`. This trips up everyone the first time."

Create the hooks configuration for the plugin:

```bash
cat > my-team-plugin/hooks/hooks.json << 'EOF'
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx eslint --fix 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
EOF
```

### Demo Steps — Installing a Plugin

Show how someone installs a plugin from a marketplace:

```bash
# Inside a Claude Code session:
/plugin install github:anthropics/claude-code/plugins/pr-review-toolkit
```

Show the available plugins command:

```bash
/plugin list
```

Show how to reload after making changes to a plugin during development:

```bash
/reload-plugins
```

### Demo Steps — Team Marketplace

Explain the enterprise use case:

> "Your plugin lives in a Git repository. You give Claude Code the URL of that repository, and it becomes your team's private marketplace. Every developer runs one command and gets your entire standardized setup."

Show the conceptual command (narrate if you cannot do live):

```bash
# In managed settings, admin sets the team marketplace URL:
# "marketplaceUrl": "https://github.com/yourcompany/claude-code-plugins"

# Developer installs the team setup:
/plugin install your-team-plugin
```

> "From that point on, every developer has the same commands, the same skills, the same hooks. When you update the plugin — add a new command, tighten a hook — developers run `/plugin install your-team-plugin` again and they are current."

### Key Teaching Moment

> "This is the answer to the adoption question that every Engineering Manager asks: 'How do we make sure everyone uses it the right way?' You encode the right way into a plugin. You do not rely on documentation and training. The tool itself enforces the standards."

For the audience of engineering managers:

> "Think about what this means for onboarding. A new developer joins. They clone the repo. They run `claude` and install one plugin. In ten minutes they have the same Claude Code environment as a senior developer who has been configuring theirs for six months. The institutional knowledge is in the plugin, not in someone's head."

### Transition Line

> "The last capability I want to show you is MCP — how Claude Code connects to the tools your team already uses, like GitHub, Jira, Slack, and your internal systems."

---

## Module 8 — MCP Servers: Connecting Your Ecosystem (15 Minutes)

### Trainer Talking Points

> "MCP stands for Model Context Protocol. Think of it as a universal connector — it lets Claude Code talk to external tools and services using a standardized interface. GitHub, databases, design tools, internal APIs — anything with an MCP server can be connected."

> "Without MCP, Claude knows about your code. With MCP, Claude knows about your code and your GitHub issues and your Jira tickets and your Slack messages. It works across your entire development ecosystem."

> "In the Commands module, I introduced `/create-issue` and `/fix-issue` and said they need MCP to work. This is where we connect that MCP and run the full workflow end to end."

### Demo Steps — Connecting the GitHub MCP Server

```bash
# Connect to GitHub
claude mcp add github npx @anthropic/github-mcp

# Verify it is connected
claude mcp list
```

Show the `.mcp.json` file that is created:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@anthropic/github-mcp"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

> "This file gets committed to the repo. Every developer who clones the project gets the MCP configuration automatically. They just need to set their own `GITHUB_TOKEN` in their environment."

### Demo Steps — The Full Bug Lifecycle (End-to-End)

This is the centrepiece demo of the entire session. Run all five steps without pausing between them. Let the chain of actions speak for itself.

**Step 1 — Find a problem**

```
/security-review
```

Claude audits `authService.js` and finds that the refresh token store has no expiry cleanup — stale tokens accumulate in memory indefinitely, which is both a memory leak and a potential security risk.

**Step 2 — Raise it as a tracked GitHub issue**

```
/create-issue
```

Claude drafts a structured issue from the finding — title, summary, current behaviour, expected behaviour, files affected, acceptance criteria — and posts it directly to GitHub via MCP.

**What Participants Will See:** Claude returns a live GitHub issue URL. Pause here. Open the URL in a browser briefly to show the issue actually exists on GitHub with the full structured content Claude wrote.

> "I did not open GitHub. I did not fill in a form. I did not copy and paste anything. The issue is live on GitHub right now — written by Claude from the code it read."

**Step 3 — Fix the issue**

```
/fix-issue 1
```

Claude pulls issue #1 from GitHub via MCP, reads the description, locates the relevant code in `authService.js`, implements the fix — adding a `cleanupExpiredTokens` function to the refresh token store — and writes a unit test for it.

**What Participants Will See:** Claude reads from GitHub and writes to the codebase in the same action. It references the issue description to guide the fix.

**Step 4 — Commit the fix**

```bash
git add .
```

```
/commit
```

Claude runs `git diff --staged`, reads exactly what changed, and produces a Conventional Commits message referencing the issue number — for example: `fix(auth): remove stale refresh tokens on expiry (closes #1)`.

**Step 5 — Update the standup**

```
/standup
```

Claude reads today's git log, sees the commit, and drafts the standup update ready to paste into Slack or Teams.

**What Participants Will See:** The complete developer workflow — audit, raise, fix, commit, report — executed in the terminal without switching to a browser, Jira, Slack, or any other tool.

Pause here and make the point explicitly:

> "Five commands. Zero context switching. The entire bug lifecycle — from finding a problem to having a commit on record and a standup update ready — done without leaving the terminal once. That is what MCP makes possible. The commands existed before MCP. MCP is what gives them reach."

### Demo Steps — Admin MCP Controls

Show the enterprise controls in `settings.json`:

```json
{
  "permissions": {
    "allowedMcpServers": ["github", "jira"],
    "deniedMcpServers": ["*social*", "*personal*"]
  }
}
```

> "Admins can define which MCP servers are permitted across the organization. The deny list takes absolute precedence. You allow your sanctioned integrations — GitHub, Jira, your internal tools — and block everything else."

### Key Teaching Moment

> "The practical impact of MCP is that Claude stops being a tool you use in isolation and becomes a participant in your actual workflow. It knows what is in the sprint. It knows what is in the backlog. It raises issues, fixes them, and tells the team what it did — all through the same commands your developers already know."

For Engineering Managers specifically:

> "Think about the audit trail this creates. Every issue raised by Claude is on GitHub. Every fix references an issue number. Every commit is traceable. You get the speed of AI assistance with the traceability of a proper engineering workflow."

---

## Module 9 — Agent Teams: Parallel AI Development (15 Minutes)

### Trainer Talking Points

> "Everything we have shown so far is one Claude instance working with you. Agent Teams is a newer capability that lets you run multiple Claude Code instances in parallel, coordinated as a team. One instance acts as the lead, the others execute specialized work simultaneously."

> "The analogy is moving from single-threaded to multi-threaded development. Tasks that would take one Claude instance an hour to do sequentially can be done by three instances in parallel in twenty minutes."

### Demo Steps — Enable and Start an Agent Team

Enable agent teams (this requires a settings flag):

```bash
# Add to settings.json or set as environment variable
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

Note for participants:

> "Agent teams are currently an experimental feature. You need to explicitly enable them. This is intentional — they use significantly more tokens than a single session."

Start an agent team with a PR review scenario:

```
Create an agent team to review PR #47.

Spawn three reviewers:
- Reviewer 1: focused exclusively on security implications
- Reviewer 2: focused on performance and scalability
- Reviewer 3: validating test coverage and edge cases

Have them each review independently, then synthesize findings into a single report.
```

**What Participants Will See:** Three sub-sessions spawn. Each reads the same PR with a different lens. The lead collects their findings and produces a combined report.

### Demo Steps — Delegate Mode

Show how to keep the lead focused on coordination:

> "There is a feature called Delegate Mode. When enabled, the team lead is restricted to coordination only — it cannot write code or implement anything. It only assigns tasks, reviews teammate output, and synthesizes results. Without this, the lead sometimes tries to do everything itself."

```
/delegate-mode on
```

### Key Teaching Moment

> "Think about your most time-consuming code reviews. Security plus performance plus test coverage — a thorough review takes a senior developer two to three hours. With an agent team, all three dimensions are reviewed simultaneously in minutes. Each reviewer goes deep in its area without context-switching."

Point out the cost consideration:

> "I want to be transparent: agent teams consume significantly more tokens than a single session. Each teammate has its own context window. For routine tasks — formatting, small bug fixes, documentation — a single session is more cost-effective. Agent teams are for tasks where parallel investigation genuinely adds value: complex reviews, large refactors, multi-layer features."

---

## Module 10 — Setting Up Claude Code for Your Team (20 Minutes)

### Trainer Talking Points

This is the implementation module. The audience shifts here to Tech Leads and Engineering Managers.

> "Everything I have shown today is technically impressive. But the question every Engineering Manager is thinking is: 'How do I actually roll this out to 50 developers?' Let me walk through that."

### Step-by-Step Team Rollout — Walk Through Each Step

**Step 1 — Licensing and Seat Assignment**

> "On the Team plan, Claude Code is included with every seat. If your organization needs premium seats for heavier workloads, the admin assigns them from the admin panel. You do not manage individual API keys — users authenticate with their organizational account."

Show the seat types:

```
Standard Seat   → Claude + Claude Code, standard usage limits
Premium Seat    → Claude + Claude Code, higher usage limits for heavy users
```

**Step 2 — Create the Team Configuration Repository**

> "Create a dedicated Git repository for your Claude Code team configuration. This is separate from your product code. It holds your plugin, your shared CLAUDE.md templates, your approved MCP server list."

```bash
mkdir claude-code-team-config
cd claude-code-team-config
git init

# Structure:
claude-code-team-config/
├── plugin/                    ← Your team plugin
│   ├── .claude-plugin/
│   │   └── plugin.json
│   ├── commands/
│   ├── agents/
│   ├── skills/
│   └── hooks/
├── templates/
│   ├── CLAUDE.md.template     ← Starter CLAUDE.md for new projects
│   └── settings.json.template ← Starter permissions config
└── README.md                  ← Setup instructions for developers
```

**Step 3 — Write the Team CLAUDE.md Templates**

> "Create a CLAUDE.md template for each project type your team works on — Node.js microservice, Python data pipeline, React frontend, and so on. New projects start from the template and customize it."

**Step 4 — Build and Publish the Plugin**

> "Package your commands, skills, agents, and hooks into the plugin. Push the repository to GitHub or your internal Git host. This becomes your team marketplace URL."

**Step 5 — Admin Policy Setup**

Show the managed settings controls:

> "In the Claude admin panel, you can push settings to all Claude Code users in your organization. You define the approved MCP servers, the deny list for permissions, and the team marketplace URL. Developers cannot override managed settings."

```json
{
  "managedSettings": {
    "marketplaceUrl": "https://github.com/yourcompany/claude-code-plugins",
    "permissions": {
      "deniedMcpServers": ["*personal*"],
      "deny": ["Read(./.env*)", "Bash(rm -rf:*)"]
    }
  }
}
```

**Step 6 — Developer Onboarding Checklist**

Give participants this as a concrete takeaway:

```
New Developer Onboarding — Claude Code Setup

1. Install Claude Code: npm install -g @anthropic-ai/claude-code
2. Run claude and authenticate with your organizational account
3. Clone the project repo (CLAUDE.md and .claude/ are already inside it)
4. Open the project folder in terminal and run: claude
5. Install the team plugin: /plugin install [team-marketplace-url]
6. Type /help — verify team commands appear in the list
7. Done. You now have the full team setup.
```

> "Six steps. Fifteen minutes. Every developer has the exact same environment."

### Key Teaching Moment — For Engineering Managers

> "The question I always get is about governance: 'How do we know what Claude is doing?' The answer is the deny list in settings.json, the Compliance API for enterprise plans, and the admin usage analytics dashboard. You have visibility into which models are being used, how many tokens are consumed per user, and which tools are being invoked. This is not a shadow IT problem. It is a managed, governed tool deployment."

---

## Module 11 — Live Q&A Scenarios (15 Minutes)

### Trainer Notes

Use this module to address common questions and concerns from the audience. Below are the most frequent questions and suggested responses. Do not read these — use them to prepare.

**"How does Claude Code handle sensitive source code? Is it sent to Anthropic?"**

> "By default, the code in your project is sent to Anthropic's API to provide the responses. For enterprises with data residency or confidentiality requirements, Anthropic offers a zero data retention option through the API. The settings.json deny list also prevents Claude Code from reading specific files — you can block it from ever seeing your secrets or proprietary algorithms."

**"What happens when Claude makes a mistake? It could break our code."**

> "Three answers. First, Claude Code always shows you what it plans to do before it does it for destructive operations. Second, you should always be working in a branch — never let Claude Code work directly on main. Third, Claude Code integrates with Git, so every change is tracked. If something goes wrong, `git diff` and `git checkout` bring you back. The `ask` permissions tier is specifically for operations you want to approve before they happen."

**"How much does this cost for a team of 50 developers?"**

> "The Team plan has standard and premium seats at different price points. Heavy users get premium seats; lighter users get standard. There is also an extra usage option for when teams hit their included limits — admins set spending caps per user so there are no billing surprises. The right answer depends on your usage patterns — I would recommend a pilot with a small group first to understand your team's actual consumption."

**"We use GitHub Copilot already. Why switch?"**

> "They are different tools. Copilot is primarily inline code completion inside an editor. Claude Code is a terminal-based agent that operates at the codebase level — it plans, reasons, reads multiple files, and executes sequences of actions. Many teams use both: Copilot for line-by-line completion while typing, Claude Code for larger tasks like feature builds, refactors, and reviews. They are complementary, not mutually exclusive."

**"Can Claude Code access our internal documentation or wiki?"**

> "Yes, through MCP. If your documentation system has an MCP server — or you build one — Claude Code can query it directly. It then reasons across your code and your documentation simultaneously. This is particularly powerful for onboarding: a new developer asks 'how does our payment system work?' and Claude reads both the code and the architecture docs."

---

## Closing — The Mental Model (5 Minutes)

### Trainer Talking Points

End the session by returning to the six building blocks introduced at the opening:

> "We started today with six layers. Let me connect them now that you have seen each one."

Write or display this final model:

```
CLAUDE.md         What Claude knows about your project, always
Slash Commands    What you trigger on demand, with one keystroke
Skills            What Claude brings automatically, based on context
Agents            Specialist Claude instances you delegate focused work to
Hooks             What happens without anyone asking, enforced by config
Plugins           How all of this travels with every developer, instantly
```

> "Together, these six layers do something significant: they move Claude Code from being a personal productivity tool to being a team capability. The standards your best developer has in their head become configuration that every developer has in their terminal. The expertise of your senior engineers becomes agents that every junior developer can consult."

End with the mindset reframe — the most important idea to leave participants with:

> "The developers who will get the most from Claude Code are the ones who stop thinking of themselves as the ones who write the code. They start thinking of themselves as the ones who direct, review, and improve the code. Claude handles the implementation. You handle the judgment. That is a better use of a senior developer's time — and it is available starting today."

---

## Post-Session Handout Reference

Share the following with participants after the session.

### Quick Command Reference

```bash
# Installation
npm install -g @anthropic-ai/claude-code

# Start Claude Code in a project
cd your-project && claude

# Built-in slash commands
/help              List all commands
/clear             Clear context
/model             Switch model
/review            Review current code
/commit            Generate commit message
/status            Session status
/plugin list       Show installed plugins
/plugin install    Install a plugin
/reload-plugins    Reload plugins after changes

# MCP management
claude mcp add <name> <command>     Add a server
claude mcp list                     List servers
claude mcp remove <name>            Remove a server
```

### File Locations Quick Reference

```
Project Level (commit to Git)
├── CLAUDE.md                        Project context and rules
├── .claude/settings.json            Permissions and hooks
├── .claude/commands/*.md            Team slash commands
├── .claude/agents/*.md              Custom specialist agents
└── .claude/skills/*/SKILL.md       Team skills

User Level (personal, all projects)
~/.claude/CLAUDE.md                  Your personal context
~/.claude/commands/*.md              Your personal commands
~/.claude/agents/*.md                Your personal agents
~/.claude/settings.json              Your personal preferences

Plugin Structure
plugin-name/
├── .claude-plugin/plugin.json   Manifest only
├── commands/                    Slash commands
├── agents/                      Specialist agents
├── skills/                      Skills
├── hooks/hooks.json             Hooks config
└── .mcp.json                    MCP servers
```

### CLAUDE.md Starter Template

```markdown
# Project: [Name] — CLAUDE.md

## Tech Stack
- [Runtime, framework, database, test framework]

## Architecture
- [Key folder: what it contains]
- [Key folder: what it contains]

## Coding Standards
- [Language / style rules]
- [Naming conventions]
- [Error handling approach]
- [Logging approach]

## Testing
- [Test framework and file naming convention]
- [Coverage expectations]

## Git Standards
- [Branch naming]
- [Commit message format]
- [PR requirements]

## What Claude Must Never Do
- Never modify .env or .env.* files
- Never push to main directly
- [Add project-specific restrictions]
```

### settings.json Security Template

```json
{
  "model": "claude-sonnet-4-6",
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git status)",
      "Bash(git diff)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Read(**)",
      "Write(src/**)",
      "Write(tests/**)"
    ],
    "ask": [
      "Bash(git push:*)",
      "Bash(npm install *)",
      "Write(package.json)"
    ],
    "deny": [
      "Read(./.env*)",
      "Read(./secrets/**)",
      "Read(./**/credentials*)",
      "Read(./**/*.key)",
      "Bash(rm -rf:*)",
      "Bash(curl:*)",
      "Bash(wget:*)"
    ]
  }
}
```

---

## Trainer Notes — Timing Guide

| Module | Topic | Duration |
|--------|-------|----------|
| Opening | Framing and six-layer model | 10 min |
| 1 | Installation and first run | 15 min |
| 2 | CLAUDE.md and settings.json | 25 min |
| — | Break | 10 min |
| 3 | Slash commands | 20 min |
| 4 | Skills | 20 min |
| 5 | Agents | 20 min |
| 6 | Hooks | 20 min |
| — | Break | 10 min |
| 7 | Plugins | 20 min |
| 8 | MCP servers | 15 min |
| 9 | Agent teams | 15 min |
| 10 | Team rollout | 20 min |
| 11 | Q&A scenarios | 15 min |
| Closing | Mental model wrap-up | 5 min |
| **Total** | | **~220 min / ~3.75 hrs** |

---

## Trainer Notes — Common Demo Failures and Recovery

**Claude Code is not authenticated**

Run `claude` and follow the login prompt. If you see "session expired," run `/logout` then `claude` again.

**Claude produces unexpected output during a demo**

Do not apologize or express frustration. Say: "This is actually a useful thing to see — Claude's output varies. In a real workflow, this is where your CLAUDE.md standards and hooks would normalize the output. Let me show you what happens when the config is in place."

**A hook fails to run**

Say: "The hook syntax is environment-dependent. On this machine the linter isn't globally installed — in your actual setup you would use the project-local version. The concept is the same: any shell command can be a hook."

**MCP server connection fails**

Narrate the demo instead: "I'll walk you through what this looks like when connected. In your environment with a valid GitHub token, this is the command and this is what Claude returns." Show a screenshot if you have one prepared.

**Participants ask to try something themselves**

Acknowledge the enthusiasm: "I love that instinct — that is exactly the right way to learn this. Today we are staying in demo mode so we can cover the full breadth in the time we have. I will share the full handbook with setup instructions, and you can run this entire session yourself in your own terminal by end of day."

---

*End of Handbook*

*Prepared for: Claude Code Demo Session*  
*Reference: docs.claude.com/en/docs/claude-code/overview*
