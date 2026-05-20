# ===== BUILD STAGE =====
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# copier tout le projet
COPY . .

# build Spring Boot
RUN mvn clean package -DskipTests

# ===== RUNTIME STAGE =====
FROM eclipse-temurin:17-alpine

WORKDIR /app

# copier le jar généré
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]