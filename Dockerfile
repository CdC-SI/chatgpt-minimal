# This Dockerfile is generated based on sample in the following document
# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]

#TODO Mode productif
#FROM docker-commons.zas.admin.ch/zas/imagebase/application/nginx:ubi-angular-1.6.0 AS server
#COPY --from=build /app/.next/out /usr/share/nginx/html/
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#CMD ["nginx", "-g", "daemon off;"]