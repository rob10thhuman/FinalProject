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
@CrossOrigin({ "*", "http://localhost:4202" })
public class UserController {
	
	@Autowired
	UserService userSvc;
	
	@GetMapping("users")
	public List<User> index(HttpServletResponse resp, HttpServletRequest req){
		String newUrl = req.getRequestURL().toString();
		resp.setHeader("Location", newUrl);
		return userSvc.index();
	}
	
	@GetMapping("users/{id}")
	public User userById(@PathVariable int id, HttpServletResponse resp, HttpServletRequest req) {
		User u = userSvc.show(id);
		if(u != null) {
			String newUrl = req.getRequestURL().toString();
			resp.setHeader("Location", newUrl);
			resp.setStatus(200);
		}
		else {
			resp.setStatus(404);
			
		}
		return u;
	}

	@RequestMapping(method = RequestMethod.GET)
	public User userByUsername(@RequestParam(value="username") String username, HttpServletResponse resp, HttpServletRequest req) {
		User u = userSvc.showByUsername(username);
		if(u != null) {
			String newUrl = req.getRequestURL().toString();
			resp.setHeader("Location", newUrl);
			resp.setStatus(200);
		}
		else {
			resp.setStatus(404);
			
		}
		return u;
	}
	
	
	@PutMapping("users/{id}")
	public User updateUser(@PathVariable int id, @RequestBody User user, HttpServletResponse resp,
			HttpServletRequest req) {
		String newUrl = "";
		user = userSvc.update(id, user);
		if (user == null) {
			resp.setStatus(404);
			newUrl = req.getRequestURL().toString();
		} else {
			resp.setStatus(200);
			newUrl = req.getRequestURL().toString() + "/" + (user.getId());
		}
		resp.setHeader("Location", newUrl);
		return user;
	}
	
	@DeleteMapping("users/{id}")
	public boolean deleteUser(@PathVariable int id, HttpServletResponse resp, HttpServletRequest req) {
		boolean deleteSuccess = userSvc.delete(id);
		resp.setStatus(!deleteSuccess ? 404 : 200);
		return deleteSuccess;
	}
}
