package com.skilldistillery.languagerater.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="sub_comment")
public class SubComment {
	
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
	@UpdateTimestamp
	private Date dateUpdated;  
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user; 
	
	@Column(name="active")
	private Boolean active;
	
	@Column(name="flag")
	private Boolean flag;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="comment_id")
	private Comment parentComment;
	
	@OneToMany(mappedBy="comment")
	private List<Vote> votes;
	

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

	public Comment getParentComment() {
		return parentComment;
	}


	public void setParentComment(Comment parentComment) {
		this.parentComment = parentComment;
	}
	
	public List<Vote> getVotes() {
		return votes;
	}


	public void setVotes(List<Vote> votes) {
		this.votes = votes;
	}
	
	

	public Boolean getActive() {
		return active;
	}


	public void setActive(Boolean active) {
		this.active = active;
	}


	public Boolean getFlag() {
		return flag;
	}


	public void setFlag(Boolean flag) {
		this.flag = flag;
	}


	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("SubComment [id=");
		builder.append(id);
		builder.append(", comment=");
		builder.append(comment);
		builder.append(", dateAdded=");
		builder.append(dateAdded);
		builder.append(", dateUpdated=");
		builder.append(dateUpdated);
		builder.append(", user=");
		builder.append(user);
		builder.append(", parentComment=");
		builder.append(parentComment);
		builder.append(", votes=");
		builder.append(votes.size());
		builder.append(", active=");
		builder.append(active);
		builder.append(", flag=");
		builder.append(flag);
		builder.append("]");
		return builder.toString();
	}

	



	public SubComment(int id, String comment, Date dateAdded, Date dateUpdated, User user, Boolean active, Boolean flag,
			Comment parentComment, List<Vote> votes) {
		super();
		this.id = id;
		this.comment = comment;
		this.dateAdded = dateAdded;
		this.dateUpdated = dateUpdated;
		this.user = user;
		this.active = active;
		this.flag = flag;
		this.parentComment = parentComment;
		this.votes = votes;
	}


	public SubComment() {
		
	}

	// add and remove methods
	
		public void addVote(Vote vote) {
			if (votes == null)
				votes = new ArrayList<>();
			if (!votes.contains(vote)) {
				votes.add(vote);
				vote.setSubComment(this);
			}
		}

		public void removeVote(Vote vote) {
			if (votes != null && votes.contains(vote)) {
				votes.remove(vote);
				vote.setSubComment(null);
			}
		}

}
