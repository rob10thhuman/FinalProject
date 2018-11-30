package com.skilldistillery.languagerater.services;

import java.util.List;

import com.skilldistillery.languagerater.entities.User;


public interface UserService {
	public List<User> index();
	public User show(int id);
	public User create(User u);
	public User update(int id, User u);
	public boolean delete(int id);
}
