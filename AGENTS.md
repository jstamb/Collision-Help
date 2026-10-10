# Agent instructions

<!-- clarity:start -->
## Clarity: read first, write back, land on `main`
This repo is tracked in Clarity as `collision-help` (hub: `jstamb/clarity-hub`; contract: its `CLARITY.md`).

- **Before work:** run `clarity brief` if the CLI exists. Otherwise read `projects/collision-help/status.md`, `projects/collision-help/questions.md` and the hub's `lessons/` scoped `global`, `project:collision-help` or stack:docker, stack:nextjs, stack:react, stack:supabase, e.g. `gh api repos/jstamb/clarity-hub/contents/projects/collision-help/status.md -H "Accept: application/vnd.github.raw"`. Treat `checked` lessons as rules; `draft` ones are unconfirmed — verify before acting.
- **Branches:** name them `<agent>/<topic>` (`grokbot/`, `studio/`, `hermes/`, `omarchy/`), add a `Clarity-Agent: <agent>` commit trailer, and finish with a PR to `main`. Work not on `main` is not live. Never force-push.
- **Write back:** `clarity log`, `clarity status set --file -`, `clarity lesson add` (after any correction, root-caused bug or failed deploy) (pass `--agent <you> --model <id>`). Without the CLI, open a PR to `jstamb/clarity-hub` on `<agent>/collision-help-<yyyy-mm-dd>` changing only `projects/collision-help/**` or `lessons/**`.
<!-- clarity:end -->
