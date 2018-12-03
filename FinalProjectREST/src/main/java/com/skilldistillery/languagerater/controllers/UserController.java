package com.skilldistillery.languagerater.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.languagerater.entities.User;
import com.skilldistillery.languagerater.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class UserController {
	
	@Autowired
	UserService userSvc;
	
	@GetMapping("auth/users")
	public List<User> index(){
		return userSvc.index();
	}
	
	@GetMapping("auth/users/{id}")
	public User userById(@PathVariable int id) {
		return userSvc.show(id);
	}

	@GetMapping("auth/users/username/{username}")
	public User userByUsername(@PathVariable String username) {
		return userSvc.showByUsername(username);
	}
	
	
	@PutMapping("auth/users/{id}")
	public User updateUser(@PathVariable int id, @RequestBody User user) {
		return userSvc.update(id, user);
	}
	
	@DeleteMapping("auth/users/{id}")
	public boolean deleteUser(@PathVariable int id) {
		boolean deleteSuccess = userSvc.delete(id);
		return deleteSuccess;
	}
}
