FROM node:24-alpine AS base

RUN corepack enable && corepack prepare pnpm@11.9.0 --activate

WORKDIR /app

# Install dependencies
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

# Build the application
FROM deps AS build

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN pnpm build

# Production image
FROM node:24-alpine AS production

WORKDIR /app

RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 appuser

COPY --from=build --chown=appuser:appgroup /app/.output ./

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

USER appuser

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server/index.mjs"]
