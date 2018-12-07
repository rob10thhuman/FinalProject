package com.skilldistillery.languagerater.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.languagerater.entities.CategoryRating;

public interface CategoryRatingRepository extends JpaRepository<CategoryRating, Integer> {

}
