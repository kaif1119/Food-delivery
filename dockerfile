# Stage 1: Build React Frontend
FROM node:20-alpine AS Frontend_builder

WORKDIR /Frontend

COPY ./Frontend/package*.json ./

RUN npm install

COPY ./Frontend ./

RUN npm run build

# Stage 2: Serve Backend & static files
FROM node:20-alpine

WORKDIR /Backend

# Install dependencies
COPY ./Backend/package*.json ./

RUN npm install --production

# Copy backend source files
COPY ./Backend ./

# Copy built frontend assets so path.join(path.resolve(), '../Frontend/dist') works correctly inside the container
COPY --from=Frontend_builder /Frontend/dist /Frontend/dist

EXPOSE 3000
CMD ["npm", "start"]
