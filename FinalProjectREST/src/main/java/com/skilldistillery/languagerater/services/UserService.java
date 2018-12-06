package com.skilldistillery.languagerater.services;

import java.util.List;

import com.skilldistillery.languagerater.entities.User;


public interface UserService {
	public List<User> index();
	public User show(int id);
	public User showByUsername(String username);
	public User create(User u);
	public boolean delete(int id);
	User update(String username, User u);
}
