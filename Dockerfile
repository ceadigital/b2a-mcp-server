FROM node:20-alpine

WORKDIR /app

COPY package.json index.js ./
RUN chmod +x index.js

USER node

ENTRYPOINT ["node", "index.js"]
