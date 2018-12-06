package com.skilldistillery.languagerater.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="language_rating")
public class LanguageRating {
	
	// fields
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private int rating;
	
	private int cat1; 
	
	private int cat2; 
	
	private int cat3;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "language_id")
	private Language language;

	
	// constructors
	
	public LanguageRating() {
		super();
	}



	public LanguageRating(int id, int rating, int cat1, int cat2, int cat3, User user, Language language) {
		super();
		this.id = id;
		this.rating = rating;
		this.cat1 = cat1;
		this.cat2 = cat2;
		this.cat3 = cat3;
		this.user = user;
		this.language = language;
	}


	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("LanguageRating [id=");
		builder.append(id);
		builder.append(", rating=");
		builder.append(rating);
		builder.append(", cat1=");
		builder.append(cat1);
		builder.append(", cat2=");
		builder.append(cat2);
		builder.append(", cat3=");
		builder.append(cat3);
		builder.append(", user=");
		builder.append(user);
		builder.append(", language=");
		builder.append(language);
		builder.append("]");
		return builder.toString();
	}

	
	// hashcode and equals
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LanguageRating other = (LanguageRating) obj;
		if (id != other.id)
			return false;
		return true;
	}

	
	// setters and getters
	public int getId() {
		return id;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Language getLanguage() {
		return language;
	}

	public void setLanguage(Language language) {
		this.language = language;
	}



	public int getCat1() {
		return cat1;
	}



	public void setCat1(int cat1) {
		this.cat1 = cat1;
	}



	public int getCat2() {
		return cat2;
	}



	public void setCat2(int cat2) {
		this.cat2 = cat2;
	}



	public int getCat3() {
		return cat3;
	}



	public void setCat3(int cat3) {
		this.cat3 = cat3;
	}
	
	
	
	

}
