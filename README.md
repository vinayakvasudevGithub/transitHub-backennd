# 🚌✈️🚆 transitHub Booking Backend API

This is the backend for a transport booking application where users can book buses, trains, and flights. It supports user authentication, transport management, and ticket handling.

---

## 📦 Tech Stack

🔧 Runtime & Framework

Node.js

Express.js

🗃️ Database & ODM

MongoDB

Mongoose

🔐 Authentication & Security

bcrypt

jsonwebtoken (JWT)

cookie-parser

⚙️ Environment & Configuration

dotenv

cors

🛠️ Utilities

express-async-handler

nodemon

<!-- This backend project is built using the following technologies and libraries:

🔧 Runtime & Framework
_Node.js_ JavaScript runtime environment

_Express.js_ – Fast and minimalist web framework for Node.js

🗃️ Database & ODM
_MongoDB_ – NoSQL database

_Mongoose_ – Elegant MongoDB object modeling for Node.js

🔐 Authentication & Security
_bcrypt_ – Password hashing for user authentication

_jsonwebtoken_ – For secure authentication using JWT tokens

_cookie-parser_ – Parses cookies attached to the client request

⚙️ Environment & Configuration
_dotenv_ – Loads environment variables from .env file

_cors_ – Enables Cross-Origin Resource Sharing

🛠️ Utilities
_express-async-handler_ – Simplifies error handling in async/await routes

_nodemon_ – Automatically restarts the server during development -->

---

## 📡 API Endpoints

_✈️ Flight Routes_
• GET /flight – Get all flights
• GET /flight/:id – Get flight by ID
• GET /flight/search?from=tokyo&to=hiroshima – Search flights by origin and destination
• POST /flight/create – Create a new flight
• PUT /flight/update/:id – Update flight
• DELETE /flight/delete/:id – Delete flight

_🚌 Bus Routes_
• GET /bus – Get all buses
• GET /bus/:id – Get bus by ID
• GET /bus/search?from=kannur&to=mukkam – Search buses by origin and destination
• POST /bus/create – Create a new bus
• PUT /bus/update/:id – Update bus
• DELETE /bus/delete/:id – Delete bus

_🚆 Train Routes_
• GET /train – Get all trains
• GET /train/:id – Get train by ID
• GET /train/search?from=kannur&to=kozhikode – Search trains by origin and destination
• POST /train/create – Create a new train
• PUT /train/update/:id – Update train
• DELETE /train/delete/:id – Delete train

_🎟️ Ticket Booking_

# 🚌 Bus Tickets

• GET /busticket – Get all booked bus tickets
• GET /busticket/user – Get user’s bus tickets (requires login)
• POST /busticket/booking – Book a bus ticket
• POST /busticket/delete/:id – Delete a bus ticket

# ✈️ Flight Tickets

• GET /flightticket – Get all booked flight tickets
• GET /flightticket/user – Get user’s flight tickets (requires login)
• POST /flightticket/booking – Book a flight ticket
• POST /flightticket/delete/:id – Delete a flight ticket

# 🚆 Train Tickets

• GET /trainticket – Get all booked train tickets
• GET /trainticket/user – Get user’s train tickets (requires login)
• POST /trainticket/booking – Book a train ticket
• POST /trainticket/delete/:id – Delete a train ticket

# 🔐 Authentication

• GET /auth/alluser – Get all users
• GET /auth/profile – Get current user profile (via cookies)
• POST /auth/register – Register a new user
• POST /auth/login – Login user

---

## 📁 Folder Structure

```
backend/
├── config/
│   ├── constants.js
│   └── DbConnection.js
│
├── controllers/
│   ├── authController/
│   │   └── AuthController.js
│   ├── ticketController/
│   │   ├── busTicketController.js
│   │   ├── flightTicketController.js
│   │   └── trainTicketController.js
│   └── transportController/
│       ├── busController.js
│       ├── flightController.js
│       └── trainController.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── errorHandler.js
│
├── models/
│   ├── ticketModel/
│   │   ├── BusTicket.js
│   │   ├── FlightTicket.js
│   │   └── TrainTicket.js
│   ├── transportModel/
│   │   ├── busModel.js
│   │   ├── flightModel.js
│   │   └── trainModel.js
│   └── userModel/
│       └── userModel.js
│
├── routes/
│   ├── authRoute/
│   │   └── authRoute.js
│   ├── ticketRoute/
│   │   ├── BusTicketRoute.js
│   │   ├── FlightTicketRoute.js
│   │   └── TrainTicketRoute.js
│   └── transportRoute/
│       ├── busRoutes.js
│       ├── flightRoutes.js
│       └── trainRoute.js
│
├── utils/
│   └── passwordHash.js
│
├── app.js
├── server.js
└── README.md
```
