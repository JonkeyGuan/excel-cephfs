FROM registry.access.redhat.com/ubi8/nodejs-18:latest

COPY package*.json ./

RUN npm install --production

FROM registry.access.redhat.com/ubi8/nodejs-18-minimal:latest

COPY --from=0 /opt/app-root/src/node_modules /opt/app-root/src/node_modules
COPY ./*.js* /opt/app-root/src

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080
CMD ["npm", "start"]
