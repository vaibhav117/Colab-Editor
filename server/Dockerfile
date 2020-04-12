# Python 3.6.7
FROM python:3.6.7-alpine3.6

RUN \
  apk update \
  && apk add gettext

RUN mkdir -p /crdt && apk update && apk add bash 
RUN pip install --upgrade pip
RUN pip install flask

COPY requirements.txt /crdt

COPY src/ /crdt/
ARG HOST_IP
RUN echo HOST_IP=${HOST_IP}

RUN envsubst < "/crdt/static/global.js" > "/crdt/static/global_rendered.js"

WORKDIR /crdt

ENTRYPOINT [ "python" ]