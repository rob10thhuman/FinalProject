package com.skilldistillery.languagerater.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.languagerater.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

	@Query("SELECT c FROM Comment c where c.user.username = :username")
	List<Comment> findCommentsByUsername(@Param("username") String username);
	
	@Query("SELECT c FROM Comment c where c.language.name = :name AND (c.active = true OR c.active = null)")
	List<Comment> findCommentsByLanguageName(@Param("name") String langName);
	
	@Query("SELECT c FROM Comment c where c.id = :id AND c.user.username = :username")
	Comment findByUsernameAndId( @Param("username") String username, @Param("id") int id);
	
	@Query("SELECT c FROM Comment c where c.flag = true AND (c.active = true OR c.active = null)")
	List<Comment> findFlaggedComments();
	
}
