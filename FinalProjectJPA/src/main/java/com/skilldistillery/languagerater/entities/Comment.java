package com.skilldistillery.languagerater.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user; 
	
	
	@ManyToOne
	@JoinColumn(name="language_id")
	private Language language;

	public int getId() {
		return id;
	}


	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Date getDateAdded() {
		return dateAdded;
	}

	public void setDateAdded(Date dateAdded) {
		this.dateAdded = dateAdded;
	}

	public Date getDateUpdated() {
		return dateUpdated;
	}

	public void setDateUpdated(Date dateUpdated) {
		this.dateUpdated = dateUpdated;
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

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Comment [id=");
		builder.append(id);
		builder.append(", comment=");
		builder.append(comment);
		builder.append(", dateAdded=");
		builder.append(dateAdded);
		builder.append(", dateUpdated=");
		builder.append(dateUpdated);
		builder.append(", user=");
		builder.append(user);
		builder.append(", language=");
		builder.append(language.getName());
		builder.append("]");
		return builder.toString();
	}

	public Comment(int id, String comment, Date dateAdded, Date dateUpdated, User user, Language language) {
		super();
		this.id = id;
		this.comment = comment;
		this.dateAdded = dateAdded;
		this.dateUpdated = dateUpdated;
		this.user = user;
		this.language = language;
	} 
	
	public Comment() {
		
	}

}
