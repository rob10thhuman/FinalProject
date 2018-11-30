package com.skilldistillery.languagerater.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="language")
public class Language {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id; 
	
	private String name; 
	
	private String logo; 
	
	private String creator; 
	
	@Column(name="year_created")
	private String yearCreated; 
	
	private String info;

	public int getId() {
		return id;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public String getYearCreated() {
		return yearCreated;
	}

	public void setYearCreated(String yearCreated) {
		this.yearCreated = yearCreated;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Language [id=");
		builder.append(id);
		builder.append(", name=");
		builder.append(name);
		builder.append(", logo=");
		builder.append(logo);
		builder.append(", creator=");
		builder.append(creator);
		builder.append(", yrCreated=");
		builder.append(yearCreated);
		builder.append(", info=");
		builder.append(info);
		builder.append("]");
		return builder.toString();
	}

	public Language(int id, String name, String logo, String creator, String yrCreated, String info) {
		super();
		this.id = id;
		this.name = name;
		this.logo = logo;
		this.creator = creator;
		this.yearCreated = yrCreated;
		this.info = info;
	} 
	
	public Language () {
		
	}
	

}
