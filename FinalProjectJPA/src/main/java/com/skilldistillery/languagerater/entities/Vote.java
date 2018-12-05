package com.skilldistillery.languagerater.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="vote")
public class Vote {
	
	// fields
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "vote")
	private boolean vote;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "comment_id")
	private Comment comment;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "sub_comment_id")
	private SubComment subComment;
	
	
	// constructors
	public Vote() {
		super();
	}

	public Vote(int id, boolean vote, User user, Comment comment, SubComment subComment) {
		super();
		this.id = id;
		this.vote = vote;
		this.user = user;
		this.comment = comment;
		this.subComment = subComment;
	}





	// hashcode and equal
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
		Vote other = (Vote) obj;
		if (id != other.id)
			return false;
		return true;
	}

	// toString

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Vote [id=");
		builder.append(id);
		builder.append(", vote=");
		builder.append(vote);
		builder.append(", user=");
		builder.append(user);
		builder.append(", comment=");
		builder.append(comment);
		builder.append(", subComment=");
		builder.append(subComment);
		builder.append("]");
		return builder.toString();
	}


	// setters and getters
	public int getId() {
		return id;
	}

	public boolean isVote() {
		return vote;
	}


	public void setVote(boolean vote) {
		this.vote = vote;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public Comment getComment() {
		return comment;
	}


	public void setComment(Comment comment) {
		this.comment = comment;
	}

	public SubComment getSubComment() {
		return subComment;
	}

	public void setSubComment(SubComment subComment) {
		this.subComment = subComment;
	}
	
	

}
