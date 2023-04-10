FROM node:16-alpine

ENV APP_ROOT /app

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

EXPOSE 5000

RUN yarn

CMD yarn start
