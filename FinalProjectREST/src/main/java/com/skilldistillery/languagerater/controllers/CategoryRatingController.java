package com.skilldistillery.languagerater.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.languagerater.entities.CategoryRating;
import com.skilldistillery.languagerater.services.CategoryRatingService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class CategoryRatingController {
	
	@Autowired
	CategoryRatingService crSer;
	
	@GetMapping("notAuth/categoryRatings/index")
	public List<CategoryRating> index() {
		return crSer.indexCR();
	}
	
	@PostMapping("auth/categoryRatings")
	public CategoryRating add(@RequestBody CategoryRating categoryRating) {
		return crSer.add(categoryRating);
	}

}
