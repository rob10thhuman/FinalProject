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
			if (rating.getRating()!=0) { 
				lr2.setRating(rating.getRating());				
			}
			if (rating.getCat1()!=0) {
				lr2.setCat1(rating.getCat1());
			}
			if (rating.getCat2()!=0) {
				lr2.setCat2(rating.getCat2());
			}
			if (rating.getCat3()!=0) {
				lr2.setCat3(rating.getCat3());
			}
			return lRepo.saveAndFlush(lr2);
		}
		
		if (rating.getLanguage() == null) {
			rating.setLanguage(new Language());
		}

		rating.getLanguage().setId(langId);
		
		return lRepo.saveAndFlush(rating);
	}
}

