package com.skilldistillery.languagerater.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.languagerater.entities.User;
import com.skilldistillery.languagerater.repositories.UserRepository;

@Service
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

	@Override
	public boolean verifyPassword(int id, String password) {
		Optional<User> opt = userRepo.findById(id);
		
		if(opt.isPresent()) {
			String userPassword = opt.get().getPassword();
			return encoder.matches(password, userPassword);
		}
		return false;
	}
	
	


}
