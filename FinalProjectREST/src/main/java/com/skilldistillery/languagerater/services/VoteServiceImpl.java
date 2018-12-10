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
	public Vote createForComment(int commentId, Vote v) {
		Optional<Comment> opt = commentRepo.findById(commentId);
		if(opt.isPresent()) {
			Comment c = opt.get();
			User u = c.getUser();
			
			c.addVote(v);
			v.setSubComment(null);
			voteRepo.saveAndFlush(v);
			commentRepo.saveAndFlush(c);
			
			u.addComment(c);
			userRepo.saveAndFlush(u);
			updateUserRep(u);
		}
		return voteRepo.saveAndFlush(v);
	}


	@Override
	public Vote updateForComment(int commentId, int id, Vote v) {
		Vote existing = null;
		Optional<Vote> vOpt = voteRepo.findById(id);
		Optional<Comment> cOpt = commentRepo.findById(commentId);
		
		if (vOpt.isPresent() && cOpt.isPresent()) {
			existing = vOpt.get();
			Comment c = cOpt.get();
			User u = c.getUser();
			
			existing.setVote(v.isVote());
			existing.setUser(v.getUser());
			c.addVote(existing);
			voteRepo.saveAndFlush(existing);
			commentRepo.saveAndFlush(c);
			
			u.addComment(c);
			userRepo.saveAndFlush(u);
			updateUserRep(u);
		}
		return voteRepo.saveAndFlush(existing);
	}


	@Override
	public boolean delete(int id) {
		boolean deleted = false;
		Vote v = show(id);
		Comment c = null;
		User u = null;

		if (v != null && voteRepo.existsById(v.getId())) {
			
			if(v.getComment() != null) {
				
				u = v.getComment().getUser();
				c = v.getComment();
				
				c.removeVote(v);
				commentRepo.saveAndFlush(c);
				
				//updates that users rep
				updateUserRep(u);
			}
			
			if(v.getSubComment() != null) {
				//gets the user that made the sub-comment
				u = v.getSubComment().getUser();
				
				//removes the vote from that sub-comment
				v.getSubComment().removeVote(v);
				
			}
			voteRepo.delete(v);
			deleted = true;
		}

		return deleted;

	}
	
	
	// helper methods
	private void updateUserRep(User user) {
		int upCount = 0;
		int downCount = 0;
		
		List<Comment> userComments = user.getComments();
		
		for(Comment c : userComments) {
			for(Vote v : c.getVotes()) {
				if(v.isVote()) {
					upCount++;
				}
				else if(!v.isVote()) {
					downCount++;
				}
			}
		}
		
		int rep = upCount - downCount;
		user.setReputation(rep < 0 ? 0 : rep);
		userRepo.saveAndFlush(user);
		
	}

}
