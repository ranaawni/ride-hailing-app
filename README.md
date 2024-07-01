# ride-hailing-app

This app is designed to handle a small transportation actions, like register user , request ride and accept ride.

## Structure

- This App expose its functionality through REST APIs which connected with Mysql DB, and you can find all APIs [here](https://github.com/ranaawni/ride-hailing-app/tree/main/docs/postman-collection)

- You can find DB schema [here](https://github.com/ranaawni/ride-hailing-app/blob/main/docs/schema/ride-hailing-schema.jpg)

- You may discover the internal package "ride-hailing-entities" [here], which is used by this application to construct all migrations and run them on the database. It functions similarly to a small package that handles table creation and entity management.(https://ride-hailing-entities.github.com/ranaawni)


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

- You can use the environment file rather than creating a new database because I made it public and did not include it in the gitignore.

- Run the app, you should be inside the root file of the project

```
npm run dev

```





## Additional

- All of the app queries can be found in this [file](https://github.com/ranaawni/ride-hailing-app/blob/main/docs/schema/query.txt), and I wrote the stored procedure for the query that fetches all rides for a specific user inside [ride-hailing-entities](https://github.com/ranaawni/ride-hailing-entities/blob/main/src/database/migrations/1719869418638-getRidesForSpecificUserProcedure.ts).

- This is the app [URL](http://3.249.111.150)