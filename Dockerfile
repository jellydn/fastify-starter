# Use Node.js 20 alpine image as builder
FROM node:20.11.0-alpine as builder

# Set up working directory
RUN mkdir /app
WORKDIR /app

# Upgrade and install git
RUN apk --no-cache add git

# Copy essential files
COPY package.json pnpm-lock.yaml tsconfig.json package-lock.json ./
COPY package-lock.json ./

# Install dependencies and build
RUN npm install -g pnpm
RUN pnpm install
ENV NODE_ENV=production
RUN pnpm run build

# Set up the production image
FROM node:20.11.0-alpine
WORKDIR /app

# Copy build output from builder
COPY --from=builder /app .

# Expose port for health check with fly.io
EXPOSE 8888

# Start the application
CMD ["pnpm", "start:prod"]
