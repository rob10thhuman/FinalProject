package com.skilldistillery.languagerater.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.languagerater.entities.Vote;
import com.skilldistillery.languagerater.services.VoteService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class VoteController {
	
	@Autowired
	VoteService voteSvc;
	
	@GetMapping("notAuth/votes")
	public List<Vote> votes(){
		return voteSvc.index();
	}
	
	@GetMapping("notAuth/votes/comments/{id}")
	public List<Vote> votesByCommentId(@PathVariable int id){
		return voteSvc.votesByCommentId(id);
		
	}
	@GetMapping("notAuth/votes/{id}")
	public Vote votesById(@PathVariable int id) {
		return voteSvc.show( id);
	}
	
	@PostMapping("auth/votes")
	public Vote createVote(@RequestBody Vote vote) {
		return voteSvc.create(vote);
	}
	
	@PutMapping("auth/votes/{id}")
	public Vote updateVote(@PathVariable int id, @RequestBody Vote vote) {
		return voteSvc.update(id, vote);
	}
	
	@DeleteMapping("auth/votes/{id}")
	public boolean deleteVote(@PathVariable int id) {
		return voteSvc.delete(id);
	}

	
	

}
