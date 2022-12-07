# UH-Fall2022 COSC4351: Fundamentals of Software Engineering
## Team 9 Members
- Quang Du : Backend, API, Unit Testing
- Han Hoang: Database Schema, Combine tables and special days tracking algorithm.
- Minh Nguyen: Frontend, input validation, Git workflows

# <p align="center"> Restaurant Reservation System </p>
<!-- ## <p align="center"> [LIVE WEB APP] </p> -->

## Description
A reservation system for a restaurant.
> [Project detail document](/doc/Project.pdf)
## Technology Stack
- Frontend: [ReactJS](https://reactjs.org/)
- Backend: [ExpressJS](https://expressjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Libraries:
  - Styling: [Bootstrap](https://github.com/twbs/bootstrap)
  - Request: [Axios](https://github.com/axios/axios)
  - Unit Testing: [Jest](https://jestjs.io/)

## Demo
- Walk-through video: https://youtu.be/0wJf-DrdXxQ
## Installation
- Requirements:
  - Git
  - Visual Studio Code (or other IDEs or code editors)
  - [Node](https://nodejs.org/en/)
  - We use [npm](https://docs.npmjs.com/) as our package manager
  - MongoDB
- Install:
  - Clone this repository: `git clone https://github.com/ndminhvn/COSC4351_Group9`
  - Frontend:
    - Go to client folder: `cd client`
    - Install dependencies: `npm install`
    - Start server: `npm start`
  - Backend:
    - Go to server folder: `cd server`
    - Install dependencies: `npm install`
    - Start server: `npm start`

## Project Structure
- Restaurant tables layout:
   - Table size 2 (qty:2)
   - Table size 4 (qty:3)
   - Table size 6 (qty:4)
   
   Max capacity of restaurant is 40 people
- Scenarios
  - Guest reservation (prompt to register)
    1. Regular day booking, has tables
    2. Regular day booking, full tables
    3. Holiday booking, has tables
  - Registered user
    - Autofill feature
  - Registration
  - Login
  - Update profile

