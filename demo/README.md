# 🚗 Fullstack Car Management AI
**AIT-TMILLA YOUSSEF**

Fullstack vehicle management application built with Spring Boot, React, MySQL, Docker, Kubernetes and Spring AI (Groq LLaMA 3.3).

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
- Kubernetes (Minikube)

---

# 🤖 AI Features
The application includes an AI assistant that provides:
- Car summary generation
- Smart car recommendations
- Car comparison

---

# 📁 Project Structure
```bash
demo/
├── src/
├── db-deployment.yaml
├── app-deployment.yaml
├── mysql-configMap.yaml
├── mysql-secrets.yaml
├── docker-compose.yml
├── Dockerfile
└── README.md
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
- Minikube
- kubectl

---

## 🔑 Get your GROQ API Key

1. Go to **https://console.groq.com/keys**
2. Create a free account
3. Click **"Create API Key"**
4. Copy your key (starts with `gsk_...`)

---

## 📥 Clone the project
```bash
git clone https://github.com/youssefaittmilla/Fullstack-car-management-ai
cd Fullstack-car-management-ai/demo
```

---

## 🐳 Run with Docker Compose

### Step 1 — Create the `.env` file

#### 🪟 Windows (CMD)
```cmd
(
echo MYSQL_HOST=mysqldb
echo MYSQL_USER=root
echo MYSQL_PASSWORD=root
echo MYSQL_PORT=3306
echo GROQ_API_KEY=your_groq_api_key_here
) > .env
```

#### 🐧 Linux / Mac
```bash
cat <<EOF > .env
MYSQL_HOST=mysqldb
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_PORT=3306
GROQ_API_KEY=your_groq_api_key_here
EOF
```

> ⚠️ Replace `your_groq_api_key_here` with your key from https://console.groq.com/keys

### Step 2 — Run
```bash
docker-compose up --build
```

---

## ☸️ Run with Kubernetes (Minikube)

### Step 1 — Start Minikube
```cmd
minikube start
```

### Step 2 — Replace your GROQ API Key

Open `app-deployment.yaml` and replace this line:
```yaml
- name: GROQ_API_KEY
  value: "your_groq_api_key_here"
```
with your real key from **https://console.groq.com/keys**

### Step 3 — Build and load the Docker image
```cmd
docker build -t springboot-app:latest .
minikube image load springboot-app:latest
```

### Step 4 — Deploy MySQL
```cmd
kubectl apply -f db-deployment.yaml
kubectl get pods
```
Wait until MySQL pod is **Running**.

### Step 5 — Deploy Spring Boot
```cmd
kubectl apply -f app-deployment.yaml
kubectl get pods
```
Wait until all 3 Spring Boot pods are **Running**.

### Step 6 — Get the service URL
```cmd
minikube service springboot-crud-svc --url
```
> ⚠️ Keep this terminal open — the URL only works while it's running.

### Step 7 — Apply ConfigMap and Secrets
```cmd
kubectl apply -f mysql-configMap.yaml
kubectl apply -f mysql-secrets.yaml
```

### Step 8 — Open the dashboard
```cmd
minikube dashboard
```

---

# 🌐 Application URLs

| Service | URL |
|--------|-----|
| Frontend (Docker) | http://localhost:3000 |
| Backend (Docker) | http://localhost:9090 |
| Backend (Kubernetes) | URL from `minikube service springboot-crud-svc --url` |
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

### Docker
```bash
docker-compose down
```

### Kubernetes
```bash
minikube stop
minikube delete --all
```

---

# 👨‍💻 Author
Fullstack project developed for educational purposes using Spring Boot + React + AI + Docker + Kubernetes.