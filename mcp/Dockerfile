FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY scripts ./scripts
COPY src ./src
COPY tsconfig.json ./

RUN npm install -g pnpm@9.0.0
RUN pnpm install --frozen-lockfile
RUN pnpm build

CMD ["node", "dist/index.js"]
