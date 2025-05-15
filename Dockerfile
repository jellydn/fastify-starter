# Use Node.js lts alpine image as builder
FROM node:22.15.1-alpine as builder

# Set up working directory
RUN mkdir /app
WORKDIR /app

# Upgrade and install git
RUN apk --no-cache add git

# Copy essential files
COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY src src

# Install dependencies and build
RUN npm install -g pnpm
RUN pnpm install
ENV NODE_ENV=production
RUN pnpm run build

# Set up the production image
FROM node:22.15.1-alpine
WORKDIR /app

# Copy build output from builder
COPY --from=builder /app .

# Expose port for health check with fly.io
EXPOSE 3000/tcp

# Set SERVER_HOSTNAME environment variable
ENV SERVER_HOSTNAME=0.0.0.0
ENV PORT=3000

# Start the application
CMD ["npm", "run", "start:prod"]
