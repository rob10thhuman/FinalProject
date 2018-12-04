package com.skilldistillery.languagerater.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.languagerater.entities.Comment;
import com.skilldistillery.languagerater.entities.Vote;
import com.skilldistillery.languagerater.repositories.CommentRepository;
import com.skilldistillery.languagerater.repositories.VoteRepository;

@Service
public class VoteServiceImpl implements VoteService {

	@Autowired
	VoteRepository voteRepo;

	@Autowired
	CommentRepository commentRepo;
	
	@Override
	public List<Vote> index() {
		return voteRepo.findAll();
	}

	@Override
	public Vote show(int id) {
		Optional<Vote> opt = voteRepo.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		} else {
			return null;
		}
	}

	@Override
	public List<Vote> votesByCommentId(int id) {
		return voteRepo.findVotesByCommentId(id);
	}

	@Override
	public Vote create(int id, Vote v) {
		Optional<Comment> opt = commentRepo.findById(id);
		if(opt.isPresent()) {
			Comment c = opt.get();
			c.addVote(v);
			commentRepo.saveAndFlush(c);
		}
		return voteRepo.saveAndFlush(v);
	}

	@Override
	public Vote update(int commentId, int id, Vote v) {
		Vote existing = null;
		Optional<Vote> opt = voteRepo.findById(id);
		Optional<Comment> c = commentRepo.findById(commentId);
		
		if (opt.isPresent() && c.isPresent()) {
			existing = opt.get();
			Comment comment = c.get();
			
			existing.setVote(v.isVote());
			existing.setUser(v.getUser());
			comment.addVote(existing);
			commentRepo.saveAndFlush(comment);
		}
		return voteRepo.saveAndFlush(existing);
	}

	@Override
	public boolean delete(int id) {
		boolean deleted = false;
		Vote v = show(id);

		if (v != null && voteRepo.existsById(v.getId())) {
			voteRepo.delete(v);
			deleted = true;
		}

		return deleted;

	}

}
