# Dockerfile for Frontend

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Clean install based on package-lock.json
RUN npm ci

COPY . .
RUN npm run build

# Serve with a lightweight nginx server
FROM nginx:alpine
# Copy the built output from Vite (usually 'dist') to Nginx public folder
COPY --from=build /app/dist /usr/share/nginx/html
# Expose standard port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
