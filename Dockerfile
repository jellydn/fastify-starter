FROM jellydn/alpine-nodejs:18 as builder
# Build the image
RUN mkdir /app
WORKDIR /app

RUN apk upgrade --no-cache -U && \
  apk add --no-cache git

COPY package.json yarn.lock tsconfig.json ./
COPY src src
COPY public public

RUN yarn install
ENV NODE_ENV=production
RUN yarn build

# Copy the build output
FROM jellydn/alpine-nodejs:18
WORKDIR /app
COPY --from=builder /app .

CMD ["yarn", "start:prod"]
