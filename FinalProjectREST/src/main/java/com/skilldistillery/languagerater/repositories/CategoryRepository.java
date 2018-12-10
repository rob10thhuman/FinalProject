package com.skilldistillery.languagerater.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.languagerater.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
