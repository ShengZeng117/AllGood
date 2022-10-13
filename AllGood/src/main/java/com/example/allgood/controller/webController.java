package com.example.allgood.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WebController {
    @RequestMapping("/HomePage")
    public String homePage() {
        return "HomePage";
    }

    @RequestMapping("/GMlogin")
    public String login2() {
        return "login-2";
    }
    
}
