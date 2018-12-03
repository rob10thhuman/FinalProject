package com.skilldistillery.languagerater.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.languagerater.entities.User;
import com.skilldistillery.languagerater.entities.Vote;
import com.skilldistillery.languagerater.repositories.VoteRepository;

@Service
public class VoteServiceImpl implements VoteService {

	@Autowired
	VoteRepository voteRepo;

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
	public Vote create(Vote v) {
		return voteRepo.saveAndFlush(v);
	}

	@Override
	public Vote update(int id, Vote v) {
		Vote existing = null;
		Optional<Vote> opt = voteRepo.findById(id);

		if (opt.isPresent()) {
			existing = opt.get();

			existing.setComment(v.getComment());
			existing.setVote(v.isVote());
			existing.setUser(v.getUser());
		}
		return existing;
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
