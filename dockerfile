FROM node:lts as dependencies
WORKDIR /gpt3-writer
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /gpt3-writer
COPY . .
COPY --from=dependencies /gpt3-writer/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /gpt3-writer
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /gpt3-writer/public ./public
COPY --from=builder /gpt3-writer/.next ./.next
COPY --from=builder /gpt3-writer/node_modules ./node_modules
COPY --from=builder /gpt3-writer/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
