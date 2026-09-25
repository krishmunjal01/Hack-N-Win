# National Integrated Disaster Intelligence System (IDIS)

[![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailwind-blue)](./idis-main)
[![Backend](https://img.shields.io/badge/Backend-Spring%20Boot%20%7C%20Java%2017-brightgreen)](./idis-backend/idis-backend)

The **National Integrated Disaster Intelligence System (IDIS)** is a comprehensive disaster management platform designed to provide real-time situational awareness, streamline incident reporting, and facilitate coordinated responses between citizens and government officials.

## 🌟 Key Features

- **National & State Control Centers**: Dedicated dashboards for high-level officials to monitor nationwide or state-specific incidents, active alerts, and resource allocation.
- **Citizen Portal (ContributeX)**: A public-facing interface allowing civilians to report emergencies, view active alerts in their area, and contribute to situational intelligence.
- **Secure Authentication**: Multi-factor authentication flow with Email and SMS-based OTP verification for government officials and administrators.
- **Real-time Analytics & Mapping**: Interactive data visualizations and geographical mapping of disaster zones, affected buildings, and resource deployments.

## 🛠️ Technology Stack

### Frontend (`idis-main`)
- **Core**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI (Radix UI)
- **State & Data**: TanStack React Query, React Router DOM
- **Mapping & Charts**: React-Leaflet, Recharts

### Backend (`idis-backend/idis-backend`)
- **Core**: Java 17, Spring Boot 3.5.x
- **Security**: Spring Security
- **Database**: H2 (In-memory, development) / MySQL Ready
- **Integrations**: Twilio SDK (SMS OTP), Spring Mail (Email OTP)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Java Development Kit (JDK)](https://adoptium.net/) (v17)
- [Maven](https://maven.apache.org/)

### 1. Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd idis-backend/idis-backend
   ```
2. Configure your environment:
   Open `src/main/resources/application.properties` and add your Twilio and Gmail SMTP credentials if you wish to test the OTP flow.
3. Start the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend will start on `http://localhost:8082`.*

### 2. Running the Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd idis-main
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:5173`.*

---

## 📂 Project Structure

```text
Hack-N-Win/
├── idis-main/                  # Frontend React Application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Application views & dashboards
│   │   ├── auth/               # Authentication contexts & wrappers
│   │   └── App.tsx             # Main routing configuration
│   └── package.json
└── idis-backend/idis-backend/  # Backend Spring Boot Application
    ├── src/main/java/.../
    │   ├── controller/         # REST API endpoints (AuthController)
    │   ├── model/              # JPA Entities (User, Otp)
    │   └── repository/         # Database repositories
    └── pom.xml
```

## 🔐 Security Note

This repository is currently a prototype. Before deploying to production, ensure that:
- Hardcoded secrets and API keys are migrated to environment variables (`.env`).
- Plaintext password storage is replaced with BCrypt hashing.
- A robust JWT or Session-based authentication mechanism is implemented for protected routes.
- The H2 in-memory database is swapped for a persistent production database (e.g., MySQL, PostgreSQL).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](../../issues).

## 📄 License

This project is licensed under the MIT License.
