package com.skilldistillery.languagerater.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.languagerater.entities.LanguageRating;
import com.skilldistillery.languagerater.repositories.LanguageRatingRepository;
import com.skilldistillery.languagerater.repositories.LanguageRepository;
import com.skilldistillery.languagerater.repositories.UserRepository;
import com.skilldistillery.languagerater.services.LanguageRatingService;
import com.skilldistillery.languagerater.services.UserServiceImpl;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class LanguageRatingController {
	@Autowired 
	LanguageRepository langRepo; 
	
	@Autowired 
	UserRepository uRepo; 
	
	@Autowired
	LanguageRatingRepository lRepo; 
	
	@Autowired 
	UserServiceImpl uSvc; 
	
	@Autowired 
	LanguageRatingService rSvc; 
	
	@GetMapping("notAuth/ratings/{userId}/{languageId}")
	public LanguageRating show(@PathVariable Integer userId, @PathVariable Integer languageId) {
		LanguageRating lr = lRepo.findByUserIdAndLanguageId2(userId, languageId);
		// insert language to check for null return appropriate response 
		return lr;
	}
	
//	@PutMapping("notAuth/ratings/post/{userId}/{languageId}/{rating}")
//	public LanguageRating add(@RequestBody int userId, int languageId, LanguageRating rating) {
//		Language lang = langRepo.findByLanguageId(languageId); 
//		User user = uRepo.findByUserId(userId);
//		rating.setLanguage(lang);
//		rating.setUser(user);
//		return lRepo.saveAndFlush(rating); 
//	}
	
//	@PutMapping("notAuth/ratings/post/{userId}/{languageId}/{rating}")
//	public LanguageRating add(@RequestBody int userId, int languageId, LanguageRating rating) {
//		Language lang = langRepo.findById(languageId);  
//		User user =uRepo.findById(userId); 
//		rating.setLanguage(lang);
//		rating.setUser(user);
//		return lRepo.saveAndFlush(rating); 
//	}
	
	@PostMapping("notAuth/ratings/{langId}")
	public LanguageRating createOrUpdateRating(@PathVariable Integer langId, @RequestBody LanguageRating rating) {
		return rSvc.create(langId, rating);
	}

}
