FROM php:7.1-fpm-alpine

RUN apk update && apk add curl && \
    curl -sS https://getcomposer.org/installer | php \
    && chmod +x composer.phar && mv composer.phar /usr/local/bin/composer

RUN apk add nodejs && node -v
RUN apk add npm && npm -v
RUN npm set registry https://registry.npm.taobao.org

RUN cat README.md