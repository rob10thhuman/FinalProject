package com.skilldistillery.languagerater.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LanguageRatingTest {
	
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
	void test() {
		LanguageRating langRating = em.find(LanguageRating.class, 1);
		assertEquals(3, langRating.getRating());
		assertEquals(1, langRating.getUser().getId());
		assertEquals(1, langRating.getLanguage().getId());
	}

}
