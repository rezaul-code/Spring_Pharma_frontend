# 💊 PharmaManagement – React Frontend

A modern web frontend for **PharmaManagement**, a Pharmacy Management System designed to simplify medicine inventory management, billing, stock monitoring, and pharmacy operations.

This repository contains the frontend application, currently being migrated from Thymeleaf to **React.js**, while retaining the existing Java Spring Boot backend.

The goal is to build a modular, responsive, and maintainable user interface that communicates with the backend through REST APIs.

---

## 🚀 Project Overview

PharmaManagement is a full-stack pharmacy management application.

The original application was developed using Spring Boot and Thymeleaf. The frontend is now being progressively migrated to React.js to establish a clearer separation between frontend and backend responsibilities.

### Project Repositories

| Component | Repository |
|---|---|
| Frontend | [Spring_Pharma_frontend](https://github.com/rezaul-code/Spring_Pharma_frontend) |
| Backend | [PharmaManagement](https://github.com/rezaul-code/PharmaManagement) |

---

## 🛠️ Technology Stack

### Frontend
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3

### Backend
- Java
- Spring Boot
- Spring MVC
- Spring Data JPA
- Hibernate

### Database
- MySQL

### Development Tools
- Git
- GitHub
- npm
- Maven
- Visual Studio Code / IntelliJ IDEA

---

## ✨ Application Features

The frontend is being developed to support the following pharmacy management modules:

### 💊 Medicine Management
- Add and manage medicine records.
- Update medicine information.
- View medicine details.
- Manage medicine categories.
- Display manufacturer and batch information.
- Track medicine prices and GST.

### 📦 Inventory Management
- Monitor medicine stock.
- View available quantities.
- Identify low-stock medicines.
- Monitor medicine expiry dates.

### 🧾 Billing Management
- Create pharmacy bills.
- Select medicines for billing.
- Calculate medicine quantities and prices.
- Calculate GST.
- View billing records.
- Display invoice information.

### 📊 Dashboard
- Pharmacy overview.
- Medicine inventory statistics.
- Stock monitoring.
- Billing and sales information.

### 🔐 Authentication
- Login interface.
- User registration.
- Authentication integration with the backend.
- Protected application pages.

**Note:** The React migration is currently in progress. Feature availability and backend integration may vary as development continues.

---

## 🏗️ Application Architecture

The application follows a frontend-backend separation approach.

```text
             User
              |
              v
       React Frontend
              |
              v
       React Components
              |
              v
       API Communication
              |
              v
       Spring Boot Backend
              |
              v
       Service Layer
              |
              v
       Repository Layer
              |
              v
          MySQL
```

### Architecture Responsibilities

**React Frontend**
- User interface and navigation.
- Reusable components.
- Form handling.
- Displaying application data.
- Communicating with backend APIs.

**Spring Boot Backend**
- Business logic.
- Data validation.
- Authentication.
- REST API endpoints.
- Database operations.

**MySQL Database**
- Medicine records.
- Inventory information.
- User information.
- Billing records.

---

## 📁 Repository Structure

The frontend source code is maintained separately from the Spring Boot backend.

```text
Spring_Pharma_frontend/
│
├── README.md
│
└── spring-pharma-frontend/
    └── React application source
```

The internal React application structure will evolve as the migration progresses.

---

## ⚙️ Getting Started

### Prerequisites

Install the following:

- Node.js
- npm
- Git
- Visual Studio Code or another code editor

### 1. Clone the Repository

```bash
git clone https://github.com/rezaul-code/Spring_Pharma_frontend.git
```

### 2. Navigate to the Frontend Directory

```bash
cd Spring_Pharma_frontend/spring-pharma-frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

Check the available scripts in `package.json`.

For a Vite-based React application:

```bash
npm run dev
```

For a Create React App application:

```bash
npm start
```

### 5. Open the Application

Use the local development URL displayed in your terminal.

**Backend Integration:** Run the Spring Boot backend separately and configure the frontend API base URL according to the backend configuration.

---

## 🔄 Development Progress

The frontend is currently undergoing a migration from Thymeleaf to React.js.

| Development Area | Status |
|---|---|
| Original Spring Boot backend | Existing |
| Original Thymeleaf frontend | Existing |
| React frontend migration | In progress |
| React component development | In progress |
| Backend REST API integration | In progress |
| Authentication integration | To be verified |
| Complete frontend migration | Pending |

---

## 🔮 Future Development

Planned improvements include:

- Complete migration of remaining Thymeleaf pages.
- Develop reusable React components.
- Complete REST API integration.
- Improve frontend state management.
- Integrate authentication and protected routes.
- Improve responsive design.
- Add frontend error handling and loading states.
- Implement automated frontend testing.
- Improve application performance.
- Prepare the application for deployment.

---

## 👨‍💻 Developer

**Rezaul Karim Khan**

Software Engineer | Java | Spring Boot | React.js | Full-Stack Development

- GitHub: https://github.com/rezaul-code
- LinkedIn: https://linkedin.com/in/rezaul-khan


---

## 🎯 Project Objective

The objective of this project is to develop a maintainable full-stack pharmacy management application by combining a React-based frontend with a Java Spring Boot backend.

The migration also provides an opportunity to improve application architecture, frontend maintainability, API integration, and overall user experience.

---

⭐ If you find this project interesting, consider starring the repository!
