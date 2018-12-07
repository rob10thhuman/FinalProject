package com.skilldistillery.languagerater.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.languagerater.entities.Category;
import com.skilldistillery.languagerater.services.CategoryService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class CategoryController {
	
	@Autowired
	CategoryService catSer;
	
	@GetMapping("notAuth/categories/index")
	public List<Category> index() {
		return catSer.indexCat();
	}
}
