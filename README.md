# 🚗 Fullstack Car Management AI

Fullstack vehicle management application built with Spring Boot, React, MySQL, Docker and Spring AI (Groq LLaMA 3.3).

---

# 📦 Technologies

## Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Spring AI (Groq)
- MySQL
- Hibernate

## Frontend
- React
- Axios
- Bootstrap

## DevOps
- Docker
- Docker Compose

---

# 🤖 AI Features

The application includes an AI assistant that provides:

- Car summary generation
- Smart car recommendations
- Car comparison

---

# 📁 Project Structure

```bash
backend/
frontend/
docker-compose.yml
README.md
```

---

# ⚙️ Installation & Setup

## 📋 Prerequisites

Make sure you have installed:

- Java 17
- Maven
- Node.js
- Docker Desktop
- Git

---

## 📥 Clone the project

```bash
git clone <YOUR_REPO_URL>
cd fullstack-car-management-ai
```

---

## ⚙️ Build Backend (Spring Boot)

### 🪟 Windows (CMD / PowerShell)

```bash
cd backend
mvnw clean package -DskipTests
```

### 🐧 Linux / Mac

```bash
cd backend
./mvnw clean package -DskipTests
```

---

## 🐳 Run with Docker

### 🪟 Windows

```bash
cd ..
docker-compose up --build
```

### 🐧 Linux / Mac

```bash
cd ..
docker compose up --build
```

---

# 🌐 Application URLs

| Service | URL |
|--------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:9090 |
| MySQL | localhost:3307 |

---

# 🤖 AI Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/ai/resume/{id}` | Generate car summary |
| `/api/ai/recommendation/{id}` | Get AI recommendation |
| `/api/ai/comparison/{id1}/{id2}` | Compare two cars |

---

# 🛑 Stop the project

### Windows
```bash
docker-compose down
```

### Linux / Mac
```bash
docker compose down
```

---

# 👨‍💻 Author

Fullstack project developed for educational purposes using Spring Boot + React + AI + Docker.
