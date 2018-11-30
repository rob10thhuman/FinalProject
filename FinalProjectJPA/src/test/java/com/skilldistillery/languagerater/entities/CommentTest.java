package com.skilldistillery.languagerater.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CommentTest {
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
		Comment c = em.find(Comment.class, 1);
		assertEquals("hello world", c.getComment());
		assertEquals(null, c.getDateAdded());
		assertEquals(null, c.getDateUpdated());
		assertEquals(1, c.getUser().getId());
		assertEquals(1, c.getLanguage().getId());
	}

}
