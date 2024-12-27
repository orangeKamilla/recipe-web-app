package com.web.recipemanager.repository;


import com.web.recipemanager.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
