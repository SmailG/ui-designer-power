FROM node:20-alpine

LABEL version="1.1.6"
LABEL description="UI Designer & Design-to-Code Kiro Power"

WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY scripts ./scripts
COPY src ./src

RUN npm install -g pnpm@9.0.0
RUN pnpm install --frozen-lockfile
RUN pnpm build

CMD ["node", "dist/index.js"]
