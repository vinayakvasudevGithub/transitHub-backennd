# 🚌✈️🚆 transitHub Booking Backend API

This is the backend for a transport booking application where users can book buses, trains, and flights. It supports user authentication, transport management, and ticket handling.

---

## 📦 Tech Stack

### 🔧 Runtime & Framework

- Node.js
- Express.js

### 🗃️ Database & ODM

- MongoDB
- Mongoose

### 🔐 Authentication & Security

- bcrypt
- jsonwebtoken (JWT)
- cookie-parser

### ⚙️ Environment & Configuration

- dotenv
- cors

### 🛠️ Utilities

- express-async-handler
- nodemon

---

## 📡 API Endpoints

### ✈️ Flight Routes

- `GET /flight` – List all flights
- `GET /flight/:id` – Get flight by ID
- `GET /flight/search?from=TOKYO&to=HIROSHIMA` – Search flights
- `POST /flight/create` – Add new flight
- `PUT /flight/update/:id` – Update flight
- `DELETE /flight/delete/:id` – Remove flight

### 🚌 Bus Routes

- `GET /bus` – List all buses
- `GET /bus/:id` – Get bus by ID
- `GET /bus/search?from=KANNUR&to=MUKKAM` – Search buses
- `POST /bus/create` – Add new bus
- `PUT /bus/update/:id` – Update bus
- `DELETE /bus/delete/:id` – Remove bus

### 🚆 Train Routes

- `GET /train` – Get all trains
- `GET /train/:id` – Get train by ID
- `GET /train/search?from=kannur&to=kozhikode` – Search trains
- `POST /train/create` – Create new train
- `PUT /train/update/:id` – Update train
- `DELETE /train/delete/:id` – Delete train

---

## 🎟️ Ticket Booking

### 🚌 Bus Tickets

- `GET /busticket` – All bookings
- `GET /busticket/user` – User's bookings (auth required)
- `POST /busticket/booking` – New booking
- `DELETE /busticket/delete/:id` – Cancel booking

### ✈️ Flight Tickets

- `GET /flightticket` – All booked flight tickets
- `GET /flightticket/user` – User's flight tickets (auth required)
- `POST /flightticket/booking` – Book flight ticket
- `DELETE /flightticket/delete/:id` – Cancel flight ticket

### 🚆 Train Tickets

- `GET /trainticket` – All booked train tickets
- `GET /trainticket/user` – User's train tickets (auth required)
- `POST /trainticket/booking` – Book train ticket
- `DELETE /trainticket/delete/:id` – Cancel train ticket

---

## 🔐 Authentication

- `GET /auth/alluser` – Get all users (admin)
- `GET /auth/profile` – Current user profile (via cookies)
- `POST /auth/register` – Register new user
- `POST /auth/login` – User login

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
