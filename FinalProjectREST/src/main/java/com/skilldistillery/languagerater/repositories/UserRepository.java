package com.skilldistillery.languagerater.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.languagerater.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	User findByUsername(String username);
	
//	@Query("SELECT u from User u where u.id = :userId")
//	User findByUserId(@Param("id") int userId); 

}
