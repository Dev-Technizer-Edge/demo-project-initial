# Claude Code — Built-in Slash Commands Reference

> **Source:** Official Claude Code Docs (code.claude.com/docs/en/commands)  
> **Last updated:** April 2026 | Claude Code v2.1.x  
> **Note:** Commands marked **[Skill]** are bundled skills (prompt-based, not hardcoded logic). Not every command appears for every user — availability depends on your platform, plan, and environment.

---

## Session & Context Management

| Command | Purpose |
|---|---|
| `/clear` | Clear conversation history and free up context. **Aliases:** `/reset`, `/new` |
| `/compact [instructions]` | Compact conversation with optional focus instructions (e.g., `/compact keep architecture decisions`) |
| `/context` | Visualize current context usage as a colored grid. Shows optimization suggestions and capacity warnings |
| `/btw <question>` | Ask a quick side question without adding it to the main conversation thread |
| `/rewind` | Rewind the conversation and/or code to a previous checkpoint. **Alias:** `/checkpoint` |
| `/resume [session]` | Resume a past session by ID or name, or open a session picker. **Alias:** `/continue` |
| `/rename [name]` | Rename the current session. Without a name, auto-generates one from conversation history |
| `/branch [name]` | Create a branch (fork) of the current conversation at this point. **Alias:** `/fork` |
| `/export [filename]` | Export the current conversation as plain text. Without filename, opens dialog to copy or save |
| `/copy [N]` | Copy the last assistant response to clipboard. `/copy 2` copies the second-to-last. Press `w` in picker to write to file |

---

## Model & Configuration

| Command | Purpose |
|---|---|
| `/model [model]` | Switch the AI model mid-session. Use left/right arrows to also adjust effort level |
| `/effort [low\|medium\|high\|max\|auto]` | Set the model effort/thinking level. `max` is Opus 4.6 only and applies to current session only |
| `/fast [on\|off]` | Toggle fast mode on or off |
| `/config` | Open the settings interface (theme, model, output style, preferences). **Alias:** `/settings` |
| `/theme` | Change the color theme, including colorblind-accessible (daltonized) and ANSI variants |
| `/color [color\|default]` | Set the prompt bar color for the current session. Options: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan` |
| `/output-style [style]` | Set response formatting style (Default, Explanatory, Learning, or custom). Use `/output-style:new` to create one |

---

## Agentic Workflows (Bundled Skills)

> These use the same skill mechanism you can write yourself — a prompt handed to Claude, which Claude can also invoke automatically.

| Command | Purpose |
|---|---|
| `/batch <instruction>` | **[Skill]** Orchestrate large-scale changes across a codebase in parallel. Decomposes into 5–30 independent units, spawns one background agent per unit in isolated git worktrees, each opens a PR. Example: `/batch migrate src/ from Solid to React` |
| `/simplify [focus]` | **[Skill]** Review recently changed files for code reuse, quality, and efficiency by spawning three review agents in parallel, then applies fixes. Example: `/simplify focus on memory efficiency` |
| `/debug [description]` | **[Skill]** Enable debug logging for the session and troubleshoot by reading the session debug log. Optionally describe the issue to focus analysis |
| `/loop [interval] [prompt]` | **[Skill]** Run a prompt repeatedly while the session stays open. Claude self-paces if no interval is given. Example: `/loop 5m check if the deploy finished` |
| `/claude-api` | **[Skill]** Load Claude API reference material for your project's language (Python, TypeScript, Java, Go, etc.). Also auto-activates when your code imports the Anthropic SDK |

---

## Permissions & Tools

| Command | Purpose |
|---|---|
| `/permissions` | Manage allow/ask/deny rules for tool permissions interactively. **Alias:** `/allowed-tools` |
| `/hooks` | View and configure hook rules for tool events |
| `/mcp` | Manage MCP server connections and OAuth authentication |
| `/add-dir <path>` | Add a working directory for file access during the current session |
| `/sandbox` | Toggle sandbox mode (available on supported platforms only) |

---

## Project Initialization & Memory

| Command | Purpose |
|---|---|
| `/init` | Initialize the project with a `CLAUDE.md` guide. Set `CLAUDE_CODE_NEW_INIT=1` for an interactive flow covering skills, hooks, and memory files |
| `/memory` | Edit `CLAUDE.md` memory files, enable/disable auto-memory, and view auto-memory entries |
| `/skills` | List all available skills |
| `/agents` | Manage subagent configurations — view, create, and edit subagents |

---

## Git, Code Review & CI

| Command | Purpose |
|---|---|
| `/diff` | Open an interactive diff viewer for uncommitted changes and per-turn diffs. Use arrows to navigate files and turns |
| `/security-review` | Analyze pending changes on the current branch for security vulnerabilities (injection, auth issues, data exposure) |
| `/autofix-pr [prompt]` | Spawn a web session that watches the current branch's PR and pushes fixes when CI fails or reviewers leave comments. Requires `gh` CLI |
| `/install-github-app` | Set up the Claude GitHub Actions app for automated PR reviews |

---

## IDE & Interface

| Command | Purpose |
|---|---|
| `/ide` | Manage IDE integrations and show status |
| `/desktop` | Continue the current session in the Claude Code Desktop app (macOS and Windows). **Alias:** `/app` |
| `/terminal-setup` | Configure terminal keybindings (Shift+Enter etc.) for VS Code, Alacritty, Warp |
| `/keybindings` | Open or create your keybindings configuration file |

---

## Account & Billing

| Command | Purpose |
|---|---|
| `/login` | Sign in to your Anthropic account |
| `/logout` | Sign out of your Anthropic account |
| `/cost` | Show token usage and cost statistics |
| `/usage` | Show plan usage limits and rate limit status |
| `/extra-usage` | Configure extra usage to keep working when rate limits are hit |
| `/upgrade` | Open the upgrade page to switch to a higher plan tier |
| `/privacy-settings` | View and update privacy settings (Pro and Max only) |
| `/passes` | Share a free week of Claude Code with friends (only visible if eligible) |

---

## Cloud, Remote & Teleport

| Command | Purpose |
|---|---|
| `/schedule [description]` | Create, update, list, or run Cloud scheduled tasks conversationally |
| `/remote-control` | Make this session available for remote control from claude.ai. **Alias:** `/rc` |
| `/remote-env` | Configure the default remote environment for web sessions started with `--remote` |
| `/teleport` | Pull a Claude Code on the web session into your terminal — opens a session picker. **Alias:** `/tp` |
| `/ultraplan <prompt>` | Draft a plan in an ultraplan session, review it in browser, then execute remotely or send back to terminal |
| `/autofix-pr [prompt]` | Spawn a web session watching the current PR for CI failures and review comments |

---

## Utility & Information

| Command | Purpose |
|---|---|
| `/help` | Show help and all available commands |
| `/doctor` | Diagnose and verify your Claude Code installation and settings |
| `/status` | Open Settings → Status tab (version, model, account, connectivity). Works while Claude is responding |
| `/stats` | Visualize daily usage, session history, streaks, and model preferences |
| `/insights` | Generate a report analyzing your Claude Code sessions for patterns and friction points |
| `/context` | Visualize current context usage — shows free space and per-category breakdown |
| `/release-notes` | View the changelog in an interactive version picker |
| `/feedback [report]` | Submit feedback to Anthropic. **Alias:** `/bug` |
| `/plan [description]` | Enter plan mode. Pass a description to begin immediately: `/plan fix the auth bug` |
| `/tasks` | List and manage background tasks. **Alias:** `/bashes` |
| `/powerup` | Walk through Claude Code features with interactive animated demos |
| `/team-onboarding` | Generate a team onboarding guide from your last 30 days of Claude Code usage |
| `/voice` | Toggle push-to-talk voice dictation (requires Claude.ai account) |
| `/mobile` | Show QR code to download the Claude mobile app. **Aliases:** `/ios`, `/android` |
| `/exit` | Exit the CLI. **Alias:** `/quit` |

---

## Setup & Platform-Specific

| Command | Purpose |
|---|---|
| `/setup-bedrock` | Configure Amazon Bedrock authentication, region, and model pins interactively (only visible when `CLAUDE_CODE_USE_BEDROCK=1`) |
| `/setup-vertex` | Configure Google Vertex AI authentication, project, and region interactively (only visible when `CLAUDE_CODE_USE_VERTEX=1`) |
| `/install-slack-app` | Install the Claude Slack app via OAuth browser flow |
| `/plugin` | Manage Claude Code plugins |
| `/reload-plugins` | Reload all active plugins to apply changes without restarting |
| `/chrome` | Configure Claude in Chrome extension settings |

---

## MCP Prompts (Dynamic)

MCP servers can expose prompts that appear as commands in the format:

```
/mcp__<server-name>__<prompt-name>
```

These are dynamically discovered from connected MCP servers and vary per user setup.

---

## Model Aliases (for `/model` command)

| Alias | Resolves To | Best For |
|---|---|---|
| `default` | Clears override, uses plan default | Resetting to recommended |
| `best` | Latest Opus | Most capable available |
| `sonnet` | Sonnet 4.6 | Daily coding (default) |
| `opus` | Opus 4.6 | Complex reasoning |
| `haiku` | Haiku 4.5 | Fast, simple tasks |
| `sonnet[1m]` | Sonnet 4.6 (1M context) | Very long sessions |
| `opus[1m]` | Opus 4.6 (1M context) | Large codebase analysis |
| `opusplan` | Opus (plan) → Sonnet (execute) | Best of both worlds |

---

## Thinking Keywords (Prompt-Level)

> These only work in Claude Code's terminal — not in claude.ai chat or the API.

| Keyword | Effect |
|---|---|
| `ultrathink` | Triggers high effort for that one turn, then reverts to session default |

> **Note:** The old tier ladder (`think` → `think hard` → `megathink` → `ultrathink`) was a v1 mechanism. On modern Claude 4.6 models with adaptive thinking, phrases like "think" and "think hard" are treated as regular prompt instructions, not system-mapped triggers. Use `/effort` for persistent control.

---

## Effort Levels (for `/effort` command)

| Level | Behaviour | Persists Across Sessions |
|---|---|---|
| `low` | Faster, less thorough | Yes |
| `medium` | Default for Pro/Max | Yes |
| `high` | Deep reasoning | Yes |
| `max` | Maximum (Opus 4.6 only) | No (current session only) |
| `auto` | Reset to model default | — |

---

## Key Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Shift+Tab` | Cycle through permission modes: Normal → Auto-Accept → Plan Mode |
| `Ctrl+O` | Toggle verbose mode (shows extended thinking as gray italic text) |
| `Ctrl+G` | Open current plan in your default text editor |
| `Ctrl+T` | Toggle background task list display |
| `Option+T` / `Alt+T` | Enable/disable extended thinking |
| `Esc Esc` (double tap) | Time machine — browse all prompts from current session |
| `↑ arrow` | Navigate back through past prompts (even from previous sessions) |

---

## CLI Flags (at Startup)

```bash
claude --model <alias|name>          # Set model for this session
claude --name "session-name"         # Start with a named session
claude -n "session-name"             # Short form
claude --continue                    # Resume last session
claude -c                            # Short form
claude --resume [session]            # Open session picker or resume by name/ID
claude -r                            # Short form
claude --from-pr 142                 # Resume session linked to a PR
claude --teleport [session-id]       # Pull a cloud session to terminal
claude --remote "task description"   # Start a task in the cloud
claude --permission-mode plan        # Start in Plan Mode
claude --worktree [name]             # Start in an isolated git worktree
claude --debug                       # Start with debug logging enabled
claude -p "prompt"                   # Headless / non-interactive mode
```

---

## Where Sessions Are Stored

```
~/.claude/projects/<encoded-project-path>/*.jsonl
```

Each `.jsonl` file is a complete conversation record. Sessions never auto-delete.

---

*Source: [Claude Code Commands Reference](https://code.claude.com/docs/en/commands) — Official Anthropic Documentation*
