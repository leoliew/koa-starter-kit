FROM node:10.16.3-alpine as base

RUN echo http://mirrors.aliyun.com/alpine/v3.4/main/ > /etc/apk/repositories && \
              echo http://mirrors.aliyun.com/alpine/v3.4/community/ >> /etc/apk/repositories
WORKDIR /data
COPY package.json .
RUN npm install --build-from-source --registry=https://registry.npm.taobao.org \
                --disturl=https://npm.taobao.org/mirrors/node \
                --production && \
    npm cache verify && rm package.json

RUN apk update && apk add ca-certificates && \
    apk add tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone


FROM node:10.16.3-alpine as build

WORKDIR /data

ENV TZ "Asia/Shanghai"

COPY --from=base /data/node_modules ./node_modules
COPY . .
RUN ./node_modules/.bin/tsc

EXPOSE 9001
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime

# Start process.yml
CMD ["npm","start"]
