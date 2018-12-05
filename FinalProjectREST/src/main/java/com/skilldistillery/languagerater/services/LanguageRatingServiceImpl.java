package com.skilldistillery.languagerater.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.languagerater.entities.Language;
import com.skilldistillery.languagerater.entities.LanguageRating;
import com.skilldistillery.languagerater.repositories.LanguageRatingRepository;

@Service
public class LanguageRatingServiceImpl implements LanguageRatingService {
	@Autowired 
	LanguageRatingRepository lRepo;
	
	@Override
	public LanguageRating create(Integer langId, LanguageRating rating) {
		LanguageRating lr2 = lRepo.findByUserIdAndLanguageId2(rating.getUser().getId(), langId); 
		
		if (lr2!=null) { 
			lr2.setRating(rating.getRating());
			return lRepo.saveAndFlush(lr2);
		}
		
		if (rating.getLanguage() == null) {
			rating.setLanguage(new Language());
		}

		rating.getLanguage().setId(langId);
		return lRepo.saveAndFlush(rating);
	}
}

