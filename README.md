# Pogos LLC Software Engineering Exercise - Pipe17 project

## How to  run the application locally

1.  Make sure you have NodeJS installed on your machine ([NodeJS Installation](https://nodejs.org/en/))
2. Open Terminal / Command Prompt and  navigate to the directory where you want to save this repository by using `cd` command.
3. Clone  this repository: 
```shell
git clone https://github.com/Arman2409/store-pogos.git
```
4. Navigate into the cloned  directory: 
```shell
cd store-pogos
```
5. Install all dependencies by running 
```javascript 
npm install
```
6. Add .env file in the root of the project and add the following
environment variables
  DATABASE_URL - MongoDB database url

  EMAIL_USERNAME - Email username for sending digital receipts

  EMAIL_PASSWORD - Email password

  PORT - port address for running the project
7. run development server with command 
```javascript
 npm run dev
 ```