# Python 3.6.7
FROM python:3.6.7-alpine3.6

RUN mkdir -p /crdt && apk update && apk add bash 
RUN pip install --upgrade pip
RUN pip install flask


COPY requirements.txt /crdt

COPY src/ /crdt/

WORKDIR /crdt

ENTRYPOINT [ "python" ]