
# Features
- User can sign up with email and password
- User can sign in with email and password
- After login, user can my info
- User can create or delete drawer. If drawer name is taken it can be created
- User can see list of drawers. This list should return all drawers.
- User can list of liked products inside specific drawer. This list should return all products.
- User can like or dlslike products. if product is already liked and belonged to other drawer, it can't be liked. If no drawer exsits, it can'be liked. 

# How to start
- Clone the repository
- Run `npm install` to install required dependencies
- If Docker is running, you can run mongoDB by running `make run`. Otherwise install MongoDB Communit Edition.
- Load any dummy data if needed by running `npm run load`
- Change `MONGO_DB_URL` variable inside `.env` file if needed
- Start api ser`er with `npm run start`


# How to test
- Clone the repository
- Run `npm install` to install required dependencies
- If Docker is running, you can run mongoDB by running `make run`. Otherwise install MongoDB Communit Edition.
- Start api server with `npm test`