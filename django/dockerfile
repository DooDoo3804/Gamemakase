FROM python:3
WORKDIR .

## Install packages
COPY requirements.txt ./
RUN apt-get update && apt-get install -y supervisor
RUN pip install -r requirements.txt

## Copy all src files
COPY . .

## Run the application on the port 8080
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000", "--noreload"]
