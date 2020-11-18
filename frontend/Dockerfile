FROM node:15.2 as builder
# RUN mkdir /app && chown -R node:node /app
EXPOSE 3000
WORKDIR /app
# COPY --chown=node:node package.json package-lock*.json ./
COPY package*.json next.config.js ./
RUN npm install
# RUN npm ci && npm cache clean --force

FROM builder as development
CMD [ "npm", "run", "dev" ]

# Untested - Fix build and export to new image with .. nginx?
# FROM builder AS production
# CMD [ "node", "./src/app.js" ]