# IP Express sample code skeleton (Javascript)

This is the sample project created as an output reference for the internal project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## How to run on local machine?

You can run this service on your local machine in two ways.
1. By simply updating the configuration values in config/development.json file
2. By using [dotenv](https://www.npmjs.com/package/dotenv) npm module. Just create .env file in root directory of the code. Add all the env variables which are given below with the values. Finally run the service using the command node -r dotenv/config index.js

## How to lint?
We use airbnb standard for linting.

```
npm run lint

```

### Environment Variables

These are the environment variables to be provided while docker run or local run.
To run the service locally using environment variables we need to create .env file in root directory of the code. 
To run this service using docker we need to pass env variables while creating the docker container.
Following are the env varibales used in the service.

```
NODE_ENV
NODE_PORT
NODE_HOST
LOGGING_NAME
LOGIING_LEVEL
LOGGING_PATH
REDIS_HOST
REDIS_PORT
REDIS_PASSWORD
MONGO_HOST
MONGO_PORT
MONGO_USERNAME
MONGO_PASSWORD
MONGO_DB_NAME

```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
npm i
```


```
node index.js or npm start
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests


```
npm test
```



## Deployment using Docker

Deploy code to the porduction by setting NODE_ENV = production in .env file.
.env file contains the configuration

Create an image
```
> docker build -t expressjs-template .
```
Create a container and Run
```
> docker run -p 52005:52004 --env-file ./.env --name expressjs-template-cont1 -t expressjs-template
```

## Authors

* **Sudhir Raut** - *Initial work* - [Github](https://github.com/sudhirraut)


## License

This project is licensed under the free License - see the [LICENSE.md](LICENSE.md) file for details
