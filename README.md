🚀 IDIS Project Setup Guide (For Teammates)

This project has 2 parts:

1️⃣ Backend → Spring Boot (Java)
2️⃣ Frontend → React + Vite

Both must run together.

Frontend → http://localhost:8080
Backend  → http://localhost:8081

1️⃣ Prerequisites (Install First)

Everyone must install these:

Install Java (JDK 17)

Download:
https://adoptium.net/

Verify installation:

java -version

Should show something like:

openjdk version "17"

Install Node.js (v18 or v20)

Download:

https://nodejs.org

Verify:

node -v
npm -v
Install Maven (Optional but recommended)

Check:

mvn -v

If not installed it's fine because the project has mvnw wrapper.

Install Git

Download:

https://git-scm.com/

2️⃣ Clone the Project

Open terminal and run:

git clone https://github.com/YOUR-REPO-LINK

Then go inside:

cd IDIS

You should see:

frontend/
backend/
3️⃣ Run Backend (Spring Boot)

Open terminal inside backend folder:

cd backend

Run backend:

Windows
mvnw.cmd spring-boot:run
Mac/Linux
./mvnw spring-boot:run

If successful you will see:

Tomcat started on port(s): 8081

Backend will run at:

http://localhost:8081
4️⃣ Run Frontend (React)

Open another terminal.

Go to frontend folder:

cd frontend

Install dependencies:

npm install

Then start frontend:

npm run dev

You will see:

Local: http://localhost:8080

6️⃣ Common Errors & Fixes
Error: JAVA_HOME not defined

Set environment variable:

JAVA_HOME = C:\Program Files\Java\jdk-17

Restart terminal.

Error: npm install fails

Run:

npm cache clean --force
npm install
Error: Backend not connecting

Check backend running:

http://localhost:8081

Check frontend API URL:

http://localhost:8081/api/auth
Open browser:

http://localhost:8080
