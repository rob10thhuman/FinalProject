package com.skilldistillery.languagerater.entities;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class UserTest {
	private EntityManagerFactory emf;
	private EntityManager em;

	@BeforeEach
	void setUp() throws Exception {
		emf = Persistence.createEntityManagerFactory("FinalProject");
		em = emf.createEntityManager();
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		emf.close();
	}
	
	@Test
	void testUserAccess() { 
		User user = em.find(User.class, 1); 
		assertEquals("rob", user.getUsername()); 
		assertEquals("Rob", user.getFirstName()); 
		assertEquals("Thompson", user.getLastName()); 
		assertEquals("rob", user.getPassword()); 
		assertEquals("rob@10thHuman.com", user.getEmail()); 
		assertEquals(true, user.getActive()); 
		assertEquals(null, user.getRole()); 
		assertEquals(2, user.getComments().size()); 
		
	}
}
