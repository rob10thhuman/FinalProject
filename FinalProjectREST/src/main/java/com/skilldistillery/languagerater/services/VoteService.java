package com.skilldistillery.languagerater.services;

import java.util.List;

import com.skilldistillery.languagerater.entities.Comment;
import com.skilldistillery.languagerater.entities.Vote;

public interface VoteService {
	public List<Vote> index();
	public List<Vote> votesByCommentId(int id);
	public Vote show(int id);
	public Vote createForComment(int id, Vote v);
	public Vote createForSubComment(int id, Vote v);
	public Vote updateForComment(int commentId, int id, Vote v);
	public Vote updateForSubComment(int subCommentId, int id, Vote v);
	public boolean delete(int id);
}
