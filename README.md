# Medusa B2B Storefront Recipe App

<!-- #ZEROPS_EXTRACT_START:intro# -->
Next.js 15 App Router B2B storefront for [medusa-b2b](https://github.com/zerops-recipe-apps/medusa-b2b) — company accounts, quotes, and Medusa storefront APIs over SSR. Deploy as the `nextstore` service (or `nextstoredev` / `nextstorestage`) from the [Medusa B2B recipe](https://app.zerops.io/recipes/medusa-b2b) on [Zerops](https://zerops.io).
<!-- #ZEROPS_EXTRACT_END:intro# -->

Used within [Medusa B2B recipe](https://app.zerops.io/recipes/medusa-b2b) for the Zerops platform.

⬇️ **Deploy the full stack (backend + storefront)**

[![Deploy on Zerops](https://github.com/zeropsio/recipe-shared-assets/blob/main/deploy-button/light/deploy-button.svg)](https://app.zerops.io/recipes/medusa-b2b?environment=small-production)

![cover](https://github.com/zeropsio/recipe-shared-assets/blob/main/covers/svg/cover-nextjs.svg)

## Repositories

| Repo | Role |
| --- | --- |
| [medusa-b2b](https://github.com/zerops-recipe-apps/medusa-b2b) | Medusa API + admin |
| [medusa-b2b-frontend](https://github.com/zerops-recipe-apps/medusa-b2b-frontend) (this repo) | Next.js storefront |

The backend seeds a publishable key and can call `/api/internal/reload-env` on this app after deploy (`RELOAD_SECRET` / `REVALIDATE_SECRET`).

## Local development

```bash
yarn install
cp .env.template .env.local
```

Set `NEXT_PUBLIC_MEDUSA_BACKEND_URL` to your Medusa URL (for example `http://localhost:9000`) and `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` from the Medusa admin.

```bash
yarn dev   # http://localhost:8000
```

## Integration Guide

<!-- #ZEROPS_EXTRACT_START:integration-guide# -->

### 1. Adding `zerops.yml`

Standalone Next.js service — only **`dev`** and **`prod`**. Vault injects `CHANNEL_PUBLISHABLE_KEY` and `RELOAD_SECRET`; this file maps public `NEXT_PUBLIC_*` values.

```yaml
zerops:
  - setup: prod
    build:
      base: nodejs@24
      envVariables:
        NEXT_PUBLIC_MEDUSA_BACKEND_URL: ${API_URL}
        NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: ${CHANNEL_PUBLISHABLE_KEY}
        NEXT_PUBLIC_BASE_URL: ${APP_URL}
      buildCommands:
        - yarn
        - yarn build
      deployFiles:
        - .next
        - package.json
        - next.config.js
        - node_modules
        - public
    deploy:
      readinessCheck:
        httpGet:
          port: 8000
          path: /api/health
    run:
      ports:
        - port: 8000
          httpSupport: true
      envVariables:
        MEDUSA_BACKEND_URL: http://${MEDUSA_HOST}:9000

  - setup: dev
    build:
      deployFiles: ./
      buildCommands:
        - yarn
    # SSH workspace — yarn dev on port 8000
```

`dev` must deploy `./` so a git-connected workspace does not drop sources on push. See [zerops.yml](zerops.yml) for search and object-storage URLs.

<!-- #ZEROPS_EXTRACT_END:integration-guide# -->
