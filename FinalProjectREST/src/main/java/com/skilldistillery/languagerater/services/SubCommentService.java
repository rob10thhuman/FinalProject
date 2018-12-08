package com.skilldistillery.languagerater.services;

import java.util.List;

import com.skilldistillery.languagerater.entities.SubComment;

public interface SubCommentService {
	public List<SubComment> index(String username);
	public SubComment show(String username, int id);
	public SubComment create(String username, int parentId, SubComment c);
	public SubComment update(String username, int id, SubComment c);
	public boolean delete(String username, int id);
	
	public List<SubComment> indexByUserame(String username);
}
