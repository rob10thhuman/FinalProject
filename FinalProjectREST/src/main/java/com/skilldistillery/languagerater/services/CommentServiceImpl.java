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
	public Comment update(int id, Comment comment) {

		Comment existing = null;
		Optional<Comment> opt = commentRepo.findById(id);

		if (opt.isPresent()) {
			existing = opt.get();

			existing.setActive(comment.getActive());
			existing.setFlag(comment.getFlag());
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
	public boolean delete(int id) {
		boolean deleted = false;

		Optional<Comment> opt = commentRepo.findById(id);
		if (opt.isPresent()) {
			Comment c = opt.get();
			User u = c.getUser();

			removeVotesFromComment(c);
			commentRepo.delete(c);

			deleted = true;
		}

		return deleted;
	}

	@Override
	public List<Comment> indexByLanguageName(String langName) {
		return commentRepo.findCommentsByLanguageName(langName);
	}

	@Override
	public List<Comment> indexByUserame(String username) {
		return commentRepo.findCommentsByUsername(username);
	}
	
	@Override
	public List<Comment> indexFlaggedComments() {
		return commentRepo.findFlaggedComments();
	}

	// helper methods
	private void removeVotesFromComment(Comment c) {
		List<Vote> votes = c.getVotes();
		for (Vote vote : votes) {
			voteRepo.delete(vote);
		}
	}

	

}
