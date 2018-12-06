package com.skilldistillery.languagerater.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.languagerater.entities.SubComment;

public interface SubCommentRepository extends JpaRepository<SubComment, Integer> {

	@Query("SELECT sc FROM SubComment sc where sc.user.username = :username")
	List<SubComment> findCommentsByUsername(@Param("username") String username);
	
	@Query("SELECT sc FROM SubComment sc where sc.id = :id AND sc.user.username = :username")
	SubComment findByUsernameAndId( @Param("username") String username, @Param("id") int id);
}
