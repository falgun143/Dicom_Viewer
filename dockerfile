FROM node:18.17.0-alpine    

WORKDIR /app               

# Copy package files and config files first
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Install dependencies
RUN npm ci --silent

# Copy source code
COPY . .

EXPOSE 5173               

# Use development server with host flag to allow external connections
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]