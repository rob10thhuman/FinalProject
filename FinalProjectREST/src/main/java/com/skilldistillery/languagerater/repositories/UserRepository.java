package com.skilldistillery.languagerater.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.languagerater.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	User findByUsername(String username);

}
