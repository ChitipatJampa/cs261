package com.demo.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.demo.backend.controller.BackendApplication;

@SpringBootTest(classes = BackendApplication.class) // Specify the main application class
class BackendApplicationTests {

    @Test
    void contextLoads() {
    }
}
