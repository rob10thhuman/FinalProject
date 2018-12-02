package com.skilldistillery.languagerater.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.languagerater.entities.Language;
import com.skilldistillery.languagerater.services.LanguageService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class LanguageController {
	
	@Autowired
	LanguageService langSer;
	
	@GetMapping("languages")
	public List<Language> index() {
		return langSer.index();
	}
	
	@GetMapping("languages/search/{keywords}")
	public List<Language> indexBySearch(@PathVariable String keywords) {
		return langSer.indexByKeywords(keywords);
	}
	
	@GetMapping("languages/{id}")
	public Language show(@PathVariable int id) {
		return langSer.show(id);
	}
	
	@PostMapping("languages")
	public Language add(@RequestBody Language lang) {
		return langSer.create(lang);
	}
	
	@PutMapping("languages/{id}")
	public Language update(@RequestBody Language lang, @PathVariable int id ) {
		return langSer.update(lang, id);
	}
	
	@DeleteMapping("languages/{id}")
	public boolean delete(@PathVariable int id ) {
		return langSer.destroy(id);
	}

}
