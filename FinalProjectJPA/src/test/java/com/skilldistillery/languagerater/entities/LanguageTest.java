package com.skilldistillery.languagerater.entities;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class LanguageTest {
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
		Language language = em.find(Language.class, 1); 
		assertEquals("java", language.getName()); 
	}
}
