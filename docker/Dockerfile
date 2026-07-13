FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/react/package.json ./packages/react/
COPY packages/vue/package.json ./packages/vue/
COPY packages/angular/package.json ./packages/angular/
COPY packages/web-components/package.json ./packages/web-components/
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/react/node_modules ./packages/react/node_modules
COPY --from=deps /app/packages/vue/node_modules ./packages/vue/node_modules
COPY --from=deps /app/packages/angular/node_modules ./packages/angular/node_modules
COPY --from=deps /app/packages/web-components/node_modules ./packages/web-components/node_modules
COPY . .
RUN pnpm generate
RUN pnpm build

FROM base AS verifier
COPY --from=builder /app .
RUN pnpm lint

FROM base AS publisher
COPY --from=builder /app .
RUN pnpm publish:ci