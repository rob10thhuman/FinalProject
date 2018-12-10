package com.skilldistillery.languagerater.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.languagerater.entities.CategoryRating;
import com.skilldistillery.languagerater.repositories.CategoryRatingRepository;

@Service
public class CategoryRatingServiceImpl implements CategoryRatingService {

	@Autowired
	CategoryRatingRepository crRepo;

	@Override
	public List<CategoryRating> indexCR() {
		return crRepo.findAll();
	}
	
	@Override
	public CategoryRating add(CategoryRating categoryRating) {
		return crRepo.save(categoryRating);
	}
	
	@Override
	public void getAvgByCategory() {
		List<CategoryRating> allCRs = crRepo.findAll();
		int lengthOfArray = allCRs.size();
		System.out.println(lengthOfArray);
	}

}
