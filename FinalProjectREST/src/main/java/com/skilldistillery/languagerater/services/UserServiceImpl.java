package com.skilldistillery.languagerater.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.languagerater.repositories.UserRepository;

public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository uRepo; 
}
