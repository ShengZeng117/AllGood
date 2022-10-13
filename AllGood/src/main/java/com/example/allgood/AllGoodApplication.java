package com.example.allgood;

import com.example.allgood.AllGoodApplication;
//import com.example.allgood.model.User;
//import com.example.allgood.repository.UserRepository;

//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AllGoodApplication{
	/*private final UserRepository userRepository;

	@Autowired
	public AllGoodApplication(UserRepository userRepository){
		this.userRepository = userRepository;
	}*/
	public static void main(String[] args) {
		SpringApplication.run(AllGoodApplication.class, args);
	}

	public void run(String... args) throws Exception {
		/*if (userRepository.findAll().isEmpty()){
			userRepository.save(new User("123456","Alex", "yi", "Male", "1234@gmail.com", "123456789"));
		}*/
	}

}