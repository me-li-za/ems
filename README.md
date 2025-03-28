# Assignment 1 for IFN636 Software Life Cycle
## About the system
Employee Management System: This system allows HR to  manage the employee information such as job role, job description, salary, etc. HR also has the option to update their profile and add additional users who can use the system.

### Tech Stack 
The system is built using MERN stack

* Mongo DB - NoSQL database for saving data
* Express.js - backend application framework
* React - user interface 
* Node.js - runtime environment

## Pre-requisite
You need to have node installed on your localhost. The version should be at least 22

**Download**
Go to the download section of node.js site https://nodejs.org/en/download and choose the corresponding installer based on your local computer's operating system.  Make sure to download at least the v22 version.

Install on your local computer by following the install wizard instructions.

After installation verify the version by typing in node -v in the terminal or command prompt.
You should see the version of the node.js installed, it should print "v22.14.0".

## Installation

1. Clone the repo 
 ```sh
   git clone https://github.com/me-li-za/ems.git
```
2. Go to the root directory of the cloned repo which is the folder "ems" and install the dependencies by running this code:
 ```sh
   npm run install-all
```
3.  Create a .env file in the root folder "ems" and add the following lines and save the file
 ```sh
MONGO_URI=mongodb+srv://svc-mongo-dbuser:CCzVLz3NrZIz1AXP@cluster0.njoga.mongodb.net/db_ems?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZsd3Yx8mF3Bl0kch6HYtFs=
PORT=5001
```
4. To try the system on your localhost you can run the command 
 ```sh
    npm start
```
5. The application will launch in a browser with login as the default page.  Use the following credentials to login to the system.

* Email: _admin@mail.com_
* Password: _password_

6. To run the unit tests go to the backend folder and run the following command
 ```sh
    npm run test
```
Make sure that sinon is installed, if it is not then you can install the package by running:
```sh
    npm install sinon
```

## Pipeline details


### Workflow
1. Once you clone the repo the workflow is also included you can find it in the hiddden folder .github/workflows. If you can't see this folder you can press Command + Shift + . (period) to show them in Mac OS. In Widows OS, open File Explorer, go to the "View" tab, and then select "Show hidden items".
2. The actions can be found in the YAML file called **ci.yml**.
3. The unit tests are also included in the downloaded repo you can find them in backed/tests directory. 

### GitHub Environment and Action

For this project the environment name I am using is EC2Aws which has environment secrets configured for the MongoDB connection, Port and Json Web Token secret. The steps I did to configure these are as follow:

1. Go to the settings of your GitHub repo
2. Choose Environment and click on "New Environment"
3. Name the environment EC2Aws 
4. Add the environment secrets by clicking on "Add Environment Secrets". Here we will configure the 3 values that are used in your .env file, you will have to create the environment secret three times.

    Name of secret: MONGO_URI
    Value: mongodb+srv://svc-mongo-dbuser:CCzVLz3NrZIz1AXP@cluster0.njoga.mongodb.net/db_ems?retryWrites=true&w=majority&appName=Cluster0

    Name of secret: JWT_SECRET
    Value: 2J8zqkP7VN6bxzg+Wy7DQZsd3Yx8mF3Bl0kch6HYtFs=
    
    Name of secret: PORT
    Value: 5001
5. Next step is to create the repository secret, go to Secrets and variables and click on Actions and then "new repository secret"
  Name: PROD
  Value: 
```sh
MONGO_URI=mongodb+srv://svc-mongo-dbuser:CCzVLz3NrZIz1AXP@cluster0.njoga.mongodb.net/db_ems?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZsd3Yx8mF3Bl0kch6HYtFs=
PORT=5001
```

**Action**
For the Action I configured a self-hosted runner using Linux OS and x64 architecture the name of the runner is: **ip-172-31-10-138**
