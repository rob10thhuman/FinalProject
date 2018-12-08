package com.skilldistillery.languagerater.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.languagerater.entities.Language;
import com.skilldistillery.languagerater.repositories.LanguageRepository;

@Service
public class LanguageServiceImpl implements LanguageService {

	@Autowired
	LanguageRepository langRepo;
	
	@Override
	public List<Language> index() {
		return langRepo.findAll();
	}
	@Override
	public List<Language> indexByKeywords(String keywords) {
		List<Language> langs = new ArrayList<>();
		String[] words = keywords.trim().split("\\s+");
		for(String word : words) {
			langs.addAll(langRepo.findByKeyword("%" + word + "%"));
		}
		return langs;
	}
	
	@Override
	public Language show(int id) {
		Optional<Language> opt = langRepo.findById(id);
		Language language = null;
		if (opt.isPresent()) {
			language = opt.get();
		}
		return language;
	}
	
	@Override
	public Language create(Language language) {
		Language result = null;
		result = langRepo.save(language);
		return result;
	}
	
	@Override
	public Language update(Language lang, int id) {
		Language result = null;
		Optional<Language> opt = langRepo.findById(id);
		if (opt.isPresent()) {
			lang = opt.get();
		}
		result.setCreator(lang.getCreator());
		result.setInfo(lang.getInfo());
		result.setLogo(lang.getLogo());
		result.setName(lang.getName());
		result.setYearCreated(lang.getYearCreated());
		langRepo.flush();
		return result;
	}
	
	@Override
	public boolean destroy(int id) {
		boolean result = false;
		Optional<Language> opt = langRepo.findById(id);
		if (opt.isPresent()) {
			result = true;
			langRepo.deleteById(id);
		}
		return result;
	}

}
