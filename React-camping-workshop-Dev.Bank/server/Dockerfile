# --- Build stage ---
FROM node:18 AS build

WORKDIR /app

# Copy package and install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# --- Run stage ---
FROM node:18-slim

WORKDIR /app

# Copy from build
COPY --from=build /app /app

# Install only production deps
RUN npm install --omit=dev

# Expose port (change if needed)
EXPOSE 3000

CMD ["npm", "start"]
