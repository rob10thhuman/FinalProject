package com.skilldistillery.languagerater.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="language_rating")
public class LanguageRating {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

}
