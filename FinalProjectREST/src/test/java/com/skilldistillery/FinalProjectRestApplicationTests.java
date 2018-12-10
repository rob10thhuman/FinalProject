package com.skilldistillery;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.skilldistillery.languagerater.services.CategoryRatingService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FinalProjectRestApplicationTests {
	
	@Autowired
	CategoryRatingService crSer;

	@Test
	public void getAvgByCategoryTest() {
		crSer.getAvgByCategory();
	}

}
