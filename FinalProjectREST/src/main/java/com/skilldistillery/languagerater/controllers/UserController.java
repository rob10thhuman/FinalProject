package com.skilldistillery.languagerater.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	@GetMapping("auth/users/currentUser")
	public User getCurrentUser(Principal principal) {
		return userSvc.showByUsername(principal.getName());
	}
	
	
	@PutMapping("auth/users/{id}")
	public User updateUser(@RequestBody User user, Principal principal) {
		return userSvc.update(principal.getName(), user);
	}
	
	@PutMapping("auth/users/updateCurrentUser")
	public User updateCurrentUser(@RequestBody User user, Principal principal) {
		return userSvc.update(principal.getName(), user);
	}
	
	@DeleteMapping("auth/users/{id}")
	public boolean deleteUser(@PathVariable int id) {
		boolean deleteSuccess = userSvc.delete(id);
		return deleteSuccess;
	}
}
