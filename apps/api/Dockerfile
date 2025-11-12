# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js/Prisma/TurboRepo"

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Monorepo root
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential openssl 

# Copy monorepo config files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json ./

# Copy all workspace packages
COPY packages ./packages
COPY apps/api ./apps/api

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
RUN pnpm --filter @repo/database db:generate

# Build the optimized production bundle
RUN pnpm --filter @repo/api build:prod

# Final stage for app image
FROM base

# Copy only what we need for production
COPY --from=build /app/apps/api/dist/bundle.js /app/apps/api/dist/bundle.js
COPY --from=build /app/apps/api/dist/bundle.js.map /app/apps/api/dist/bundle.js.map
COPY --from=build /app/apps/api/.env.example /app/apps/api/.env.example
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/node_modules/@prisma /app/node_modules/@prisma

# Set working directory to API
WORKDIR /app/apps/api

# Start the server with the optimized bundle
EXPOSE 3001
CMD [ "node", "dist/bundle.js" ]
