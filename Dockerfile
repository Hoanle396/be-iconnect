FROM node:14.17.6

WORKDIR /be-design
COPY . .
RUN npm i -g nest
RUN npm install  --force
# RUN yarn build
CMD ["yarn", "start"]
EXPOSE 4000