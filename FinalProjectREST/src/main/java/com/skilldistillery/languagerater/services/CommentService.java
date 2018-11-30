package com.skilldistillery.languagerater.services;

import java.util.List;

import com.skilldistillery.languagerater.entities.Comment;

public interface CommentService {
	public List<Comment> index();
	public Comment show(int id);
	public Comment create(Comment c);
	public Comment update(int id, Comment c);
	public boolean delete(int id);
	
	public List<Comment> indexByUsername(String username);
	public List<Comment> indexByLanguageName(String langName);
}
