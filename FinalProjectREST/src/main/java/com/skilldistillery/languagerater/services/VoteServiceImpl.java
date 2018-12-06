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
public class VoteServiceImpl implements VoteService {

	@Autowired
	VoteRepository voteRepo;
	
	@Autowired
	UserRepository userRepo;

	@Autowired
	CommentRepository commentRepo;
	
	@Autowired
	SubCommentRepository subCommentRepo;
	
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
	public Vote createForComment(int id, Vote v) {
		Optional<Comment> opt = commentRepo.findById(id);
		if(opt.isPresent()) {
			Comment c = opt.get();
			c.addVote(v);
			commentRepo.saveAndFlush(c);
			updateUserRep(c.getUser());
		}
		return voteRepo.saveAndFlush(v);
	}
	
	@Override
	public Vote createForSubComment(int id, Vote v) {
		Optional<SubComment> opt = subCommentRepo.findById(id);
		if(opt.isPresent()) {
			SubComment sc = opt.get();
			sc.addVote(v);
			subCommentRepo.saveAndFlush(sc);
			updateUserRep(sc.getUser());
			
		}
		return voteRepo.saveAndFlush(v);
	}

	@Override
	public Vote updateForComment(int commentId, int id, Vote v) {
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
			updateUserRep(comment.getUser());
		}
		return voteRepo.saveAndFlush(existing);
	}
	@Override
	public Vote updateForSubComment(int subCommentId, int id, Vote v) {
		Vote existing = null;
		Optional<Vote> opt = voteRepo.findById(id);
		Optional<SubComment> sc = subCommentRepo.findById(subCommentId);
		
		if (opt.isPresent() && sc.isPresent()) {
			existing = opt.get();
			SubComment subComment = sc.get();
			
			existing.setVote(v.isVote());
			existing.setUser(v.getUser());
			subComment.addVote(existing);
			subCommentRepo.saveAndFlush(subComment);
			updateUserRep(subComment.getUser());
		}
		return voteRepo.saveAndFlush(existing);
	}

	@Override
	public boolean delete(int id) {
		boolean deleted = false;
		Vote v = show(id);
		User u = null;

		if (v != null && voteRepo.existsById(v.getId())) {
			
			if(v.getComment() != null) {
				
				//gets the user that made the comment
				u = v.getComment().getUser();
				
				//removes the vote from that comment
				v.getComment().removeVote(v);
				
				//updates that users rep
				updateUserRep(u);
			}
			
			if(v.getSubComment() != null) {
				//gets the user that made the sub-csomment
				u = v.getSubComment().getUser();
				
				//removes the vote from that sub-comment
				v.getSubComment().removeVote(v);
				
				//updates that users rep
				updateUserRep(u);
			}
			voteRepo.delete(v);
			deleted = true;
		}

		return deleted;

	}
	
	private void updateUserRep(User user) {
		int upCount = 0;
		int downCount = 0;
		
		List<Comment> userComments;
		List<SubComment> userSubComments;
		
		userComments = commentRepo.findCommentsByUsername(user.getUsername()); 
		userSubComments = subCommentRepo.findCommentsByUsername(user.getUsername());
		
		for(Comment c : userComments) {
			for(Vote v : c.getVotes()) {
				if(v.isVote()) {
					upCount++;
				}
				else {
					downCount++;
				}
			}
		}
		
		for(SubComment sc : userSubComments) {
			for(Vote v : sc.getVotes()) {
				if(v.isVote()) {
					upCount++;
				}
				else {
					downCount++;
				}
			}
		}
		user.setReputation(upCount - downCount);
		userRepo.saveAndFlush(user);
		
	}

}
