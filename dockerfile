FROM node:lts as dependencies
WORKDIR /gpt3-writer-stoic
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /gpt3-writer-stoic
COPY . .
COPY --from=dependencies /gpt3-writer-stoic/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /gpt3-writer-stoic
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /gpt3-writer-stoic/public ./public
COPY --from=builder /gpt3-writer-stoic/.next ./.next
COPY --from=builder /gpt3-writer-stoic/node_modules ./node_modules
COPY --from=builder /gpt3-writer-stoic/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
