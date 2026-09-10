#  Emergency Response Management System (ERMS)

A full-stack web application for managing ambulance bookings and emergency response operations. The system connects users with available ambulances and provides a centralized platform for managing users, ambulances, bookings, and response information.

## Overview

The Emergency Response Management System (ERMS) is designed to simplify the ambulance booking process and improve emergency response coordination.

The application consists of:

- A React-based frontend
- A FastAPI backend
- PostgreSQL database
- RESTful APIs
- JWT-based authentication
- Ambulance and booking management
- Dashboard for monitoring system information

##  Features

- User registration and login
- JWT-based authentication
- Protected API routes
- Ambulance management
- Ambulance availability tracking
- Ambulance booking
- Pickup and destination information
- Booking status management
- Booking completion
- User and ambulance data management
- Dashboard statistics
- PostgreSQL database integration
- React-based web interface
- RESTful API architecture

##  Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- Axios
- React Router

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication

### Database

- PostgreSQL

# Project Structure

```text
ambulance-booking-system/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── utils/
│   │   ├── auth.py
│   │   ├── config.py
│   │   ├── database.py
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
│
├── package.json
├── package-lock.json
└── README.md
