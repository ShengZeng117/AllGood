package com.example.allgood.controller;


import com.example.allgood.model.User;
//import com.example.allgood.repository.UserRepository;
//import com.example.allgood.service.userService;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.ResponseBody;


@Controller
//@RequestMapping("/login")
public class UserController {

    //private final UserRepository userRepository;

	/*@Autowired
	public userController(UserRepository userRepository){
		this.userRepository = userRepository;
	}*/
    //@Autowired
    //private userService service;

    @RequestMapping("/login")
    public String show() {
        return "login";
    }

   /*@RequestMapping(value = "/feedback",method = RequestMethod.POST)
    //@ResponseBody
    public String feedback(HttpServletRequest request){
        String email = request.getParameter("userid");
        String password = request.getParameter("password");
        User user = service.checkLogin(email, password);
        if(user != null){

            request.setAttribute("result", "success");
        }else {
            request.setAttribute("result", "success");
        }

        return "/feedback";
    }*/
}