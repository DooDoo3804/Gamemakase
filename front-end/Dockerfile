FROM node:18.12.1-alpine as builder
WORKDIR "/app"
COPY package.json yarn.lock ./
RUN yarn install --production=false
COPY . .
ENV PATH /front-end/node_modules/.bin:$PATH
RUN yarn build

FROM nginx
RUN mkdir /app
WORKDIR /app
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
COPY --from=builder /app/build /app/build
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]