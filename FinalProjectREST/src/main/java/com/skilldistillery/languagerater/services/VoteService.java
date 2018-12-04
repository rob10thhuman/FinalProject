package com.skilldistillery.languagerater.services;

import java.util.List;

import com.skilldistillery.languagerater.entities.Comment;
import com.skilldistillery.languagerater.entities.Vote;

public interface VoteService {
	public List<Vote> index();
	public List<Vote> votesByCommentId(int id);
	public Vote show(int id);
	public Vote create(int id, Vote v);
	public Vote update(int id, Vote v);
	public boolean delete(int id);
}
