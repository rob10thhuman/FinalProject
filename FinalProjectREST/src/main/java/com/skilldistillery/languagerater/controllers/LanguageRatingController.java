package com.skilldistillery.languagerater.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.languagerater.entities.LanguageRating;
import com.skilldistillery.languagerater.repositories.LanguageRatingRepository;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class LanguageRatingController {
	
	@Autowired
	LanguageRatingRepository lRepo; 
	
	@GetMapping("notAuth/ratings/{userId}/{languageId}")
	public LanguageRating show(@PathVariable Integer userId, @PathVariable Integer languageId) {
		LanguageRating lr = lRepo.findByUserIdAndLanguageId2(userId, languageId);
		// insert language to check for null return appropriate response 
		return lr;
//		return lRepo.findByUserIdAndLanguageId(userId, languageId); 
	}

}
