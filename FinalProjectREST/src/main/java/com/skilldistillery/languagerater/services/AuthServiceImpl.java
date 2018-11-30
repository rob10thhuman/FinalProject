package com.skilldistillery.languagerater.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.skilldistillery.languagerater.entities.User;
import com.skilldistillery.languagerater.repositories.UserRepository;

public class AuthServiceImpl implements AuthService {
	

	@Autowired
	UserRepository userRepo;

	@Autowired
	PasswordEncoder encoder;

	@Override
	public boolean checkDB(User user) {
		List<User> users = userRepo.findAll();
		boolean result = false;
		for (User dbuser : users) {
			if (dbuser.getUsername().equals(user.getUsername())) {
				System.out.println("Duplicate User");
				return true;
			}
			else {
				System.out.println("user.getUsername()");
				System.out.println(user.getUsername());
				System.out.println("dbuser.getUsername()");
				System.out.println(dbuser.getUsername());
				System.out.println("No Duplicate");
			}
		}
		return result;
	}

	@Override
	public User register(User user) {
		String encodedPW = encoder.encode(user.getPassword());
		user.setPassword(encodedPW);
		user.setActive(true);
		user.setRole("standard");
		userRepo.saveAndFlush(user);
		return user;
	}


}
