package com.skilldistillery.languagerater.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.languagerater.entities.Comment;
import com.skilldistillery.languagerater.repositories.CommentRepository;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	CommentRepository commentRepo;

	@Override
	public List<Comment> index() {
		return commentRepo.findAll();
	}

	@Override
	public Comment show(int id) {
		Optional<Comment> opt = commentRepo.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		} else {
			return null;
		}
	}

	@Override
	public Comment create(Comment c) {
		return commentRepo.saveAndFlush(c);
	}

	@Override
	public Comment update(int id, Comment c) {
		Comment existing = null;
		Optional<Comment> opt = commentRepo.findById(id);

		if (opt.isPresent()) {
			existing = opt.get();
			
			existing.setComment(c.getComment());
			existing.setDateAdded(c.getDateAdded());
			existing.setDateUpdated(c.getDateUpdated());
			
			
			
			//TODO add a set for comments?
			
			existing = commentRepo.saveAndFlush(existing);

		}
		return existing;
	}

	@Override
	public boolean delete(int id) {
		boolean deleted = false;
		Comment c = show(id);
		
		if(c != null && commentRepo.existsById(c.getId())) {
			commentRepo.delete(c);
			deleted = true;
		}
		
		return deleted;
	} 

	@Override
	public List<Comment> indexByUsername(String username) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Comment> indexByLanguageName(String langName) {
		// TODO Auto-generated method stub
		return null;
	}

}
