FROM maven:3.9.6-eclipse-temurin-22-jammy AS build

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN mvn clean install -DskipTests

FROM openjdk:24-slim

WORKDIR /app

COPY --from=build /app/target/workiez-0.0.1-SNAPSHOT.jar app.jar
#This line will copy your workiez-0.0.1-SNAPSHOT.jar file into the Docker image as app.jar. If you want to include the original JAR file as well, you can do so in a separate line, but typically you only need the final JAR for the application to run.

CMD ["java", "-jar", "app.jar"]

EXPOSE 8080