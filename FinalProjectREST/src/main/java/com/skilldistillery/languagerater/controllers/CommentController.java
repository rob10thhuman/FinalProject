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

import com.skilldistillery.languagerater.entities.Comment;
import com.skilldistillery.languagerater.services.CommentService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class CommentController {
	
	@Autowired
	CommentService commentSvc;
	
	@GetMapping("notAuth/comments")
	public List<Comment> index(Principal principal){
		return commentSvc.index(principal.getName());
	}
	
	@GetMapping("notAuth/comments/{id}")
	public Comment commentsById(@PathVariable int id, Principal principal) {
		return commentSvc.show(principal.getName(), id);
	}
	
	@PostMapping("auth/comments")
	public Comment createComment(@RequestBody Comment comment, Principal principal) {
		return commentSvc.create(principal.getName(), comment);
	}
	
	@PutMapping("auth/comments/{id}")
	public Comment updateComment(@PathVariable int id, @RequestBody Comment comment, Principal principal) {
		return commentSvc.update(principal.getName(), id, comment);
	}
	
	@DeleteMapping("auth/comments/{id}")
	public boolean deleteComment(@PathVariable int id, Principal principal) {
		return commentSvc.delete(principal.getName(), id);
	}

	@GetMapping("notAuth/comments/languages/{langName}")
	public List<Comment> indexByLanguageName(@PathVariable String langName){
		return commentSvc.indexByLanguageName(langName);
		
	}

}
