package com.fashionai.tryon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TryOnApplication {

    public static void main(String[] args) {
        SpringApplication.run(TryOnApplication.class, args);
        System.out.println("=========================================================");
        System.out.println("  Fashion AI & Virtual Try-On API Server is running!     ");
        System.out.println("  - API Documentation (Swagger): http://localhost:8080/swagger-ui.html");
        System.out.println("  - H2 Console: http://localhost:8080/h2-console");
        System.out.println("=========================================================");
    }
}
