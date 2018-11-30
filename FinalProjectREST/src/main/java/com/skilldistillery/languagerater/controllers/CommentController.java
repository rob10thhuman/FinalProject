package com.skilldistillery.languagerater.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
	
	@GetMapping("comments")
	public List<Comment> index(HttpServletResponse resp, HttpServletRequest req){
		String newUrl = req.getRequestURL().toString();
		resp.setHeader("Location", newUrl);
		return commentSvc.index();
	}
	
	@GetMapping("comments/{id}")
	public Comment commentsById(@PathVariable int id, HttpServletResponse resp, HttpServletRequest req) {
		Comment c = commentSvc.show(id);
		if(c != null) {
			String newUrl = req.getRequestURL().toString();
			resp.setHeader("Location", newUrl);
			resp.setStatus(200);
		}
		else {
			resp.setStatus(404);
			
		}
		return c;
	}
	
	@PostMapping("comments")
	public Comment createComment(@RequestBody Comment c,  HttpServletResponse resp,
			HttpServletRequest req) {
		String newUrl = "";
		c = commentSvc.create(c);
		if (c == null) {
			resp.setStatus(400);
			newUrl = req.getRequestURL().toString();
		} else {
			resp.setStatus(201);
			newUrl = req.getRequestURL().toString() + "/" + (c.getId());
		}
		resp.setHeader("Location", newUrl);
		return c;
	}
	
	@PutMapping("comments/{id}")
	public Comment updateComment(@PathVariable int id, @RequestBody Comment c, HttpServletResponse resp,
			HttpServletRequest req) {
		String newUrl = "";
		c = commentSvc.update(id, c);
		if (c == null) {
			resp.setStatus(400);
			newUrl = req.getRequestURL().toString();
		} else {
			resp.setStatus(200);
			newUrl = req.getRequestURL().toString() + "/" + (c.getId());
		}
		resp.setHeader("Location", newUrl);
		return c;
	}
	
	@DeleteMapping("comments/{id}")
	public boolean deleteComment(@PathVariable int id, HttpServletResponse resp, HttpServletRequest req) {
		boolean deleteSuccess = commentSvc.delete(id);
		resp.setStatus(!deleteSuccess ? 400 : 200);
		return deleteSuccess;
	}
	
	@GetMapping("comments/users/{username}")
	public List<Comment> indexByUsername(@PathVariable String username, HttpServletResponse resp, HttpServletRequest req){
		List<Comment> comments = commentSvc.indexByUsername(username);
		if(comments != null) {
			String newUrl = req.getRequestURL().toString();
			resp.setHeader("Location", newUrl);
			resp.setStatus(200);
		}
		else {
			resp.setStatus(404);
			
		}
		return comments;
	}

	@GetMapping("comments/languages/{langName}")
	public List<Comment> indexByLanguageName(@PathVariable String langName, HttpServletResponse resp, HttpServletRequest req){
		List<Comment> comments = commentSvc.indexByLanguageName(langName);
		if(comments != null) {
			String newUrl = req.getRequestURL().toString();
			resp.setHeader("Location", newUrl);
			resp.setStatus(200);
		}
		else {
			resp.setStatus(404);
			
		}
		return comments;
	}

}
