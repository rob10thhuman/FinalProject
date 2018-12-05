package com.skilldistillery.languagerater.services;

import com.skilldistillery.languagerater.entities.User;

public interface AuthService {

	User register(User user);

	boolean checkDB(User user);
	
	boolean verifyPassword(int id, String password);

}