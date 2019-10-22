# Python 3.6.7
FROM python:3.6.7-alpine3.6

RUN mkdir -p /crdt && apk update && apk add bash

COPY requirements.txt /crdt

COPY src/* /crdt

WORKDIR /crdt

ENTRYPOINT [ "python" ]