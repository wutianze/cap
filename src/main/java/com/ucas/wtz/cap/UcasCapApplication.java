package com.ucas.wtz.cap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.*"})
public class UcasCapApplication {

	public static void main(String[] args) {
		SpringApplication.run(UcasCapApplication.class, args);
	}
}
