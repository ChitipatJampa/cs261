package com.demo.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class WebController {
    @CrossOrigin(origins = {"https:///localhost:3000","https://node-server:3000"})
    @GetMapping("/User")
    public String returnUser(@RequestParam String param) {
        return new String();
    }
    
}
