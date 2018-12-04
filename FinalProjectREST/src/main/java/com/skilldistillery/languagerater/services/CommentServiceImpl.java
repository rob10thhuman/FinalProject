package com.skilldistillery.languagerater.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.languagerater.entities.Comment;
import com.skilldistillery.languagerater.entities.User;
import com.skilldistillery.languagerater.entities.Vote;
import com.skilldistillery.languagerater.repositories.CommentRepository;
import com.skilldistillery.languagerater.repositories.UserRepository;
import com.skilldistillery.languagerater.repositories.VoteRepository;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	CommentRepository commentRepo;
	
	@Autowired
	UserRepository userRepo;

	@Autowired
	VoteRepository voteRepo;
	
	@Override
	public List<Comment> index(String username) {
		return commentRepo.findCommentsByUsername(username);
	}

	@Override
	public Comment show(String username, int id) {
		return commentRepo.findByUsernameAndId(username, id);
	}

	@Override
	public Comment create(String username, Comment comment) {
		User u = userRepo.findByUsername(username);
		u.addComment(comment);
		userRepo.saveAndFlush(u);
		comment = commentRepo.saveAndFlush(comment);
		return comment;
	}

	@Override
	public Comment update(String username, int id, Comment comment) {
		
		
		Comment existing = commentRepo.findByUsernameAndId(username, id);

		if (existing != null) {
			
			existing.setComment(comment.getComment());
			existing.setDateAdded(comment.getDateAdded());
			existing.setDateUpdated(comment.getDateUpdated());
			existing.setUser(comment.getUser());
			existing.setLanguage(comment.getLanguage());
			
			existing = commentRepo.saveAndFlush(existing);

		}
		return existing;
	}

	@Override
	public boolean delete(String username, int id) {
		boolean deleted = false;
		Comment c = commentRepo.findByUsernameAndId(username, id);
		
		if(c != null && commentRepo.existsById(c.getId())) {
			User u = userRepo.findByUsername(username);
			u.removeComment(c);
			
			commentRepo.delete(c);
			userRepo.saveAndFlush(u);
			deleted = true;
		}
		
		return deleted;
	} 
	
	@Override
	public List<Comment> indexByLanguageName(String langName) {
		return commentRepo.findCommentsByLanguageName(langName);
	}




}
