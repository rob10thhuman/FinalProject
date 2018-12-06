package com.skilldistillery.languagerater.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.languagerater.entities.Comment;
import com.skilldistillery.languagerater.entities.SubComment;
import com.skilldistillery.languagerater.entities.User;
import com.skilldistillery.languagerater.entities.Vote;
import com.skilldistillery.languagerater.repositories.CommentRepository;
import com.skilldistillery.languagerater.repositories.SubCommentRepository;
import com.skilldistillery.languagerater.repositories.UserRepository;
import com.skilldistillery.languagerater.repositories.VoteRepository;

@Service
public class SubCommentServiceImpl implements SubCommentService {

	@Autowired
	SubCommentRepository subCommentRepo;
	
	@Autowired
	CommentRepository commentRepo;
	
	@Autowired
	UserRepository userRepo;

	@Autowired
	VoteRepository voteRepo;
	
	
	
	@Override
	public List<SubComment> index(String username) {
		return subCommentRepo.findCommentsByUsername(username);
	}

	@Override
	public SubComment show(String username, int id) {
		return subCommentRepo.findByUsernameAndId(username, id);
	}

	@Override
	public SubComment create(String username, int parentId, SubComment subComment) {
		
		User u = userRepo.findByUsername(username);
		u.addSubComment(subComment);
		userRepo.saveAndFlush(u);
		
		Optional<Comment> opt = commentRepo.findById(parentId);
		if(opt.isPresent()) {
			Comment c = opt.get();
			c.addSubComment(subComment);
			commentRepo.saveAndFlush(c);
		}
		
		subComment = subCommentRepo.saveAndFlush(subComment);
		return subComment;
		
	}

	@Override
	public SubComment update(String username, int id, SubComment subComment) {
		
		
		SubComment existing = subCommentRepo.findByUsernameAndId(username, id);

		if (existing != null) {
			
			existing.setComment(subComment.getComment());
			existing.setDateAdded(subComment.getDateAdded());
			existing.setDateUpdated(subComment.getDateUpdated());
			existing.setUser(subComment.getUser());
			existing.setParentComment(subComment.getParentComment());
			
			Comment c = existing.getParentComment();
			c.addSubComment(existing);
			commentRepo.saveAndFlush(c);
			
			existing = subCommentRepo.saveAndFlush(existing);

		}
		return existing;
	}

	@Override
	public boolean delete(String username, int id) {
		boolean deleted = false;
		SubComment sc = subCommentRepo.findByUsernameAndId(username, id);
		
		if(sc != null && subCommentRepo.existsById(sc.getId())) {
			removeVotesFromSubComment(sc);
			Comment c = sc.getParentComment();
			c.removeSubComment(sc);
			commentRepo.saveAndFlush(c);
			
			
			subCommentRepo.delete(sc);
			deleted = true;
		}
		
		return deleted;
	} 
	

	@Override
	public List<SubComment> indexByUserame(String username) {
		return subCommentRepo.findCommentsByUsername(username);
	}
	
	private void removeVotesFromComment(Comment c) {
		List<Vote> votes = c.getVotes();
		for(Vote vote : votes) {
			voteRepo.delete(vote);
		}
	}
	private void removeVotesFromSubComment(SubComment c) {
		List<Vote> votes = c.getVotes();
		for(Vote vote : votes) {
			voteRepo.delete(vote);
		}
	}
	
	

}
