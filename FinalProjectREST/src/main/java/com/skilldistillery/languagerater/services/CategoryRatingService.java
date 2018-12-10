package com.skilldistillery.languagerater.services;

import java.util.List;

import com.skilldistillery.languagerater.entities.CategoryRating;

public interface CategoryRatingService {
	
	List<CategoryRating> indexCR();

	CategoryRating add(CategoryRating categoryRating);

	void getAvgByCategory();


}
