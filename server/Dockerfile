# --- Build stage ---
# Use a full Node image for dependency resolution and caching
FROM node:20 AS build

WORKDIR /app

# Copy package and install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# --- Run stage ---
# Use Debian-based slim image and install OpenSSL (required by Prisma)
FROM node:20-bookworm-slim

WORKDIR /app

# Install OpenSSL and certificates (fix Prisma libssl/openssl error)
RUN apt-get update -y \
	&& apt-get install -y --no-install-recommends openssl ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

# Copy built app sources
COPY --from=build /app /app

# Install only production deps
RUN npm install --omit=dev

# Generate Prisma Client in the final environment to match OS/openssl
RUN npx prisma generate

# Expose port (change if needed)
ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]
