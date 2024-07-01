# ride-hailing-app

This app is designed to handle a small transportation actions, like register user , request ride and accept ride.

## Structure

- This App expose its functionality through REST APIs which connected with Mysql DB, and you can find all APIs [here](http://google.com)
- You can find the high archeticture for this app [here](http://google.com)
- You can find DB schema [here](http://google.com)

- This app use internal package "ride-hailing-entities" which used to create all migrations and run it on the DB, so it's like a small  package to handle table creation and entities, and you can find it [here](https://github.com/ranaawni/ride-hailing-entities)


## How to run

- Install npm packages

``` 
npm install

```

- You need to create RDS from AWS and add the db reds in entities repo
- run the migrations from entities repo, using the command below all tables will be created inside your DB

```
npm run create-table

```

- I make the env file public and didn't put it inside the gitignore so you can use it instead of create new DB

- Run the app, you should be inside the root file of the project

```
npm run dev

```





## Additional

- For the query that fetch all rides for specific user I wrote as stored procedure inside "ride-hailing-entities" (https://github.com/ranaawni/ride-hailing-entities/blob/main/src/database/migrations/1719869418638-getRidesForSpecificUserProcedure.ts) and you can find all app queries inside this file ()

- This the app [URL](http://3.249.111.150)