package com.skilldistillery.languagerater.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.languagerater.entities.Vote;

public interface VoteRepository extends JpaRepository<Vote, Integer> {
	
	@Query("SELECT v FROM Vote v WHERE v.comment.id = :id")
	List<Vote> findVotesByCommentId(@Param("id") int id);
	
	@Query("SELECT v FROM Vote v WHERE v.user.id = :id")
	List<Vote> findVotesByUserId(@Param("id") int id);

}
