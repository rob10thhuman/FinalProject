package com.skilldistillery.languagerater.services;

import java.util.List;

import com.skilldistillery.languagerater.entities.Comment;

public interface CommentService {
	public List<Comment> index(String username);
	public Comment show(String username, int id);
	public Comment create(String username, Comment c);
	public Comment update(String username, int id, Comment c);
	public boolean delete(String username, int id);
	
	public List<Comment> indexByLanguageName(String langName);
}
