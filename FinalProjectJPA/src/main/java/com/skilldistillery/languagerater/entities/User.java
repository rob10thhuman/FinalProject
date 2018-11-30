package com.skilldistillery.languagerater.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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
	private String fName; 
	
	@Column(name="last_name")
	private String lName; 
	
	private Boolean active; 
	
	private String role;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
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
		builder.append(", fName=");
		builder.append(fName);
		builder.append(", lName=");
		builder.append(lName);
		builder.append(", active=");
		builder.append(active);
		builder.append(", role=");
		builder.append(role);
		builder.append("]");
		return builder.toString();
	}

	public User(int id, String username, String password, String email, String fName, String lName, Boolean active,
			String role) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.fName = fName;
		this.lName = lName;
		this.active = active;
		this.role = role;
	} 
	
	public User() {
		
	}

}
