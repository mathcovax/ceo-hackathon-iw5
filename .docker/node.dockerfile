FROM node:22.15.0-alpine3.21

RUN apk add --no-cache \
	coreutils \
	build-base \
	cairo-dev \
	jpeg-dev \
	pango-dev \
	giflib-dev \
	pixman-dev \
	python3 \
	g++ \
	make

ENV npm_config_python=/usr/bin/python3