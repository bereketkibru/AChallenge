FROM python:3.7

WORKDIR /app

COPY requirements.txt ./requirements.txt

RUN pip3 install -r requirements.txt

EXPOSE 5000

COPY . /app

ENTRYPOINT [ "python" ]


CMD ["sh","-c","export FLASK_APP=api && flask run"]

