package com.skilldistillery.languagerater.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="user")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id; 
	
	private String username; 
	
	private String password; 
	
	private String email; 
	
	@Column(name="first_name")
	private String firstName; 
	
	@Column(name="last_name")
	private String lastName; 
	
	private Boolean active; 
	
	private String role;
	
	private Integer reputation;
	
	@JsonIgnore
	@OneToMany(mappedBy="user")
	private List<Comment> comments; 
	
	@JsonIgnore
	@OneToMany(mappedBy="user")
	private List<SubComment> subComments; 
	
	// setters and getters 
	
	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	
	public Integer getReputation() {
		return reputation;
	}

	public void setReputation(Integer reputation) {
		this.reputation = reputation;
	}

	public List<SubComment> getSubComments() {
		return subComments;
	}

	public void setSubComments(List<SubComment> subComments) {
		this.subComments = subComments;
	}

	public int getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	// add and remove methods
	
	public void addComment(Comment comment) {
		if (comments == null)
			comments = new ArrayList<>();
		if (!comments.contains(comment)) {
			comments.add(comment);
			comment.setUser(this);
		}
	}

	public void removeComment(Comment comment) {
		if (comments != null && comments.contains(comment)) {
			comments.remove(comment);
			comment.setUser(null);
		}
	}
	
	public void addSubComment(SubComment subComment) {
		if (subComments == null)
			subComments = new ArrayList<>();
		if (!subComments.contains(subComment)) {
			subComments.add(subComment);
			subComment.setUser(this);
		}
	}

	public void removeSubComment(SubComment subComment) {
		if (subComments != null && comments.contains(subComment)) {
			subComments.remove(subComment);
			subComment.setUser(null);
		}
	}

	
	// toString
	
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("User [id=");
		builder.append(id);
		builder.append(", username=");
		builder.append(username);
		builder.append(", password=");
		builder.append(password);
		builder.append(", email=");
		builder.append(email);
		builder.append(", firstName=");
		builder.append(firstName);
		builder.append(", lastName=");
		builder.append(lastName);
		builder.append(", active=");
		builder.append(active);
		builder.append(", role=");
		builder.append(role);
		builder.append(", reputation=");
		builder.append(reputation);
		builder.append(", comments=");
		builder.append(comments);
		builder.append(", subComments=");
		builder.append(subComments);
		builder.append("]");
		return builder.toString();
	}


	// constructors
	
	

	public User() {
		
	}

	public User(int id, String username, String password, String email, String firstName, String lastName,
			Boolean active, String role, Integer reputation, List<Comment> comments, List<SubComment> subComments) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.active = active;
		this.role = role;
		this.reputation = reputation;
		this.comments = comments;
		this.subComments = subComments;
	}

	
	
	

}
