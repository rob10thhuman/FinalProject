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

import com.skilldistillery.languagerater.entities.SubComment;
import com.skilldistillery.languagerater.services.SubCommentService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class SubCommentController {
	
	@Autowired
	SubCommentService subCommentSvc;
	
	@GetMapping("notAuth/sub-comments")
	public List<SubComment> index(Principal principal){
		return subCommentSvc.index(principal.getName());
	}
	
	@GetMapping("notAuth/sub-comments/{id}")
	public SubComment subCommentsById(@PathVariable int id, Principal principal) {
		return subCommentSvc.show(principal.getName(), id);
	}
	
	@PostMapping("auth/sub-comments/{parentId}")
	public SubComment createSubComment(@PathVariable int parentId, @RequestBody SubComment subComment, Principal principal) {
		return subCommentSvc.create(principal.getName(), parentId, subComment);
	}
	
	@PutMapping("auth/sub-comments/{id}")
	public SubComment updateSubComment(@PathVariable int id, @RequestBody SubComment subComment, Principal principal) {
		return subCommentSvc.update(principal.getName(), id, subComment);
	}
	
	@DeleteMapping("auth/sub-comments/{id}")
	public boolean deleteComment(@PathVariable int id, Principal principal) {
		return subCommentSvc.delete(principal.getName(), id);
	}

	@GetMapping("auth/subComments/usernames/{username}")
	public List<SubComment> indexByUsername(@PathVariable String username){
		return subCommentSvc.indexByUserame(username);
		
	}

}
