package com.skilldistillery.languagerater.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="comment")
public class Comment {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id; 
	
	private String comment; 
	
	@Column(name="date_added")
	@Temporal(TemporalType.DATE)
	@CreationTimestamp
	private Date dateAdded;  
	
	@Column(name="date_updated")
	@Temporal(TemporalType.DATE)
	@CreationTimestamp
	private Date dateUpdated;  
	
	@Column(name="user_id")
	private Integer userId; 
	
	@Column(name="language_id")
	private Integer languageId; 

}
