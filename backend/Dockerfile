
FROM node:15.2 as builder
ENV NODE_ENV=production
RUN mkdir /app && chown -R node:node /app
USER node
EXPOSE 5001
WORKDIR /app
COPY --chown=node:node package.json package-lock*.json ./
RUN npm ci && npm cache clean --force

FROM builder AS development
ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm install --only=development
CMD [ "nodemon", "./src/app.js", "-L"]

# Untested
FROM builder AS production
CMD [ "node", "./src/app.js" ]