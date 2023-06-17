# Polling_System_API
API where anyone can create questions with options and also add votes to it

## Getting Started

1. Install the dependencies:

  npm install bcryptjs cookie-parser dotenv express jsonwebtoken mongoose

2. Create a MongoDB database and connect to it using the `./config/mongoose.js` file.

3. Start the server:
    npm start
    or 
    node index.js
   The server will start on port 4000.

## Features

- Create a question (you can add as many questions as you want)
- Add options to a question
- Add a vote to an option of question
- Delete a question → (optional: A question can’t be deleted if one of it’s options has votes)
- Delete an option → (optional: An option can’t be deleted if it has even one vote given to it)
- View a question with it’s options and all the votes given to it

- Required Routes (Remember, in a real test, you won’t be given routes mostly)
    - api/v1/questions/create (To create a question)
    - api/v1/questions/:id/options/create (To add options to a specific question)
    - api/v1/questions/:id/delete (To delete a question)
    - api/v1/options/:id/delete (To delete an option)
    - api/v1/options/:id/add_vote (To increment the count of votes)
    - api/v1/questions/:id (To view a question and it’s options)
    - api/v1//questions (To view all questions)

    - api/v1/register (To register user)
    - api/v1/login (To login user)
    - api/v1/logout (To logout user)

## File structure

Polling API
├── index.js
├── Readme.md
├── package.json
├── config
│   ├── database.js
│   ├── config.env
│   └── errorHandler.js
│  
├── controllers
│   ├── questionController.js
│   └── userController.js
├── middleware
│   ├── auth.js
│   ├── catchAsyncError.js
│   ├── Error.js
│   └── jwtToken.js
├── models
│   ├── question.js
│   └── user.js
├── routes
│   ├── questionRoutes.js
│   └── userRoutes.js

