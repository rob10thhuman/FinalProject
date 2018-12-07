package com.skilldistillery.languagerater.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.languagerater.entities.Category;
import com.skilldistillery.languagerater.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	CategoryRepository catRepo;
	
	@Override
	public List<Category> indexCat() {
		return catRepo.findAll();
	}

}
