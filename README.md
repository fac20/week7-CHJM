# URBAN HARVEST

## Table of contents
* [Project aim](#The-projects-aim)
* [Technologies](#Technologies)
* [Setup](#setup)
* [Examples of use](#Examples-of-use)
* [Project Status](#Project-status)
* [Authors](#Authors)
* [Project Presentation](#Project-presentation)
* [Resources](#Resources)


## The project aim

Create an RESTapi which allows users to request data about available fruits, herbs or vegetables to harvest in urbanized areas (for example London).
The API would allow users to request all available harvests as well as filter them by types (for example apples, pears, basil etc.).
We also wanted authorised users to be able to update information about harvests aswell as delete them if the data is not correct or relavant anymore.

## Technologies

We used: 

- VScode (live share)
- Insomnia
- Whimsical (file structure blueprint)
- Dbdiagram (schema design)
- Miro (for crazy 8's) 
- Git / Github (including CI)
- Heroku (for deployment)
- NodeJS / Express
- PostgreSQL
- Javascript

## Installation
 
 - NPM package manager (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 - PSQL (https://www.postgresql.org/download/)

## Setup

1. Clone the repo
2. Run 'npm install' in terminal
3. Run 'psql' in terminal (for database setup)
4. Setup user if you need (CREATE USER username SUPERUSER PASSWORD 'password';
6. Connect to our heroku database \connect [url can be found in our slack FAC20 channel]
5. Run 'npm start' (to start server on localhost:4000)

- For testing enter 'npm run test'

## Examples of use

1. To view all harvests [/harvest] - Mehtod:[GET],  Example: http://localhost:4000/harvest
2. To select specific harvest [/harvest/type]- Mehtod:[GET], Example: http://localhost:4000/harvest/apple (does not show error if harvest is not found)
3. To signup [/signup]- Mehtod:[POST], Example: http://localhost:4000/signup

In the body fo your request add object following keys: "username", "email", "password"
Example:
```
{
	"username": "tom",
	"email": "tom@gmail.com",
	"password": "12345"
}
```

**Important! After recieving token save it in your authorization header**


4. To login [/login]- Mehtod:[POST], Example: http://localhost:4000/login

In the body fo your request add object following keys: "username", "password"
Example:
```
{
	"username": "tom",
	"password": "12345"
}
```
**Important! After recieving token save it in your authorization header**

5. To login [/harvest]- Mehtod:[POST], Example: http://localhost:4000/harvest

**Important! If you did not save authorization token you will not be permited to create new post! Login or Signup First!**

In the body fo your request add object following keys: "food_type", "taste", "harvest_time", "location", "date"
Example:
```
{
	"food_type": "mint",
	"taste": "fresh",
	"harvest_time": "winter",
	"location": "ealing_broadway",
	"date": "27th August 2020"
}
```


## Project status

- Code reviewing and debuging

## Authors
  
  FAC20 Group - week7-CHJM

	Trish, Jennifer, Josh, Rihards
	
## Project Presentation

https://hackmd.io/KALRsQsZSg-7lf9UZwIfnQ?both

### Resources

https://github.com/oliverjam/learn-express-middleware

https://github.com/oliverjam/learn-rest-apis

https://github.com/expressjs/cors

https://github.com/oliverjam/learn-password-security

https://www.freecodecamp.org/news/what-are-github-actions-and-how-can-you-automate-tests-and-slack-notifications/

https://www.youtube.com/playlist?list=PLdk7iMWTjWaqMJXzhx3RlPAdmFNRLgOrF

http://expressjs.com/

https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm

https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs
