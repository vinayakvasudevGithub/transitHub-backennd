# 🚌✈️🚆 transitHub Booking Backend API

This is the backend for a transport booking application where users can book buses, trains, and flights. It supports user authentication, transport management, and ticket handling.

---

## 📦 Tech Stack

This backend project is built using the following technologies and libraries:

### 🔧 Runtime & Framework

- **Node.js** – JavaScript runtime environment
- **Express.js** – Fast and minimalist web framework for Node.js

### 🗃️ Database & ODM

- **MongoDB** – NoSQL database
- **Mongoose** – Elegant MongoDB object modeling for Node.js

### 🔐 Authentication & Security

- **bcrypt** – Password hashing for user authentication
- **jsonwebtoken** – For secure authentication using JWT tokens
- **cookie-parser** – Parses cookies attached to the client request

### ⚙️ Environment & Configuration

- **dotenv** – Loads environment variables from `.env` file
- **cors** – Enables Cross-Origin Resource Sharing

### 🛠️ Utilities

- **express-async-handler** – Simplifies error handling in async/await routes
- **nodemon** – Automatically restarts the server during development

---

## 📁 Folder Structure

backend/
├── config/
│ ├── constants.js
│ └── DbConnection.js
│
├── controllers/
│ ├── authController/
│ │ └── AuthController.js
│ ├── ticketController/
│ │ ├── busTicketController.js
│ │ ├── flightTicketController.js
│ │ └── trainTicketController.js
│ └── transportController/
│ ├── busController.js
│ ├── flightController.js
│ └── trainController.js
│
├── middlewares/
│ ├── authMiddleware.js
│ └── errorHandler.js
│
├── models/
│ ├── ticketModel/
│ │ ├── BusTicket.js
│ │ ├── FlightTicket.js
│ │ └── TrainTicket.js
│ ├── transportModel/
│ │ ├── busModel.js
│ │ ├── flightModel.js
│ │ └── trainModel.js
│ └── userModel/
│ └── userModel.js
│
├── routes/
│ ├── authRoute/
│ │ └── authRoute.js
│ ├── ticketRoute/
│ │ ├── BusTicketRoute.js
│ │ ├── FlightTicketRoute.js
│ │ └── TrainTicketRoute.js
│ └── transportRoute/
│ ├── busRoutes.js
│ ├── flightRoutes.js
│ └── trainRoute.js
│
├── utils/
│ └── passwordHash.js
│
├── app.js
├── server.js
└── README.md
