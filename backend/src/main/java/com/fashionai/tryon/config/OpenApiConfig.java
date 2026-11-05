package com.fashionai.tryon.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Fashion AI & Virtual Try-On API")
                        .version("1.0.0")
                        .description("RESTful API cho hệ thống tư vấn phối đồ thông minh và phòng thử đồ ảo sử dụng công nghệ AI Virtual Try-On.")
                        .contact(new Contact().name("Fashion AI Dev Team").email("support@fashionai.demo"))
                        .license(new License().name("Apache 2.0")));
    }
}

