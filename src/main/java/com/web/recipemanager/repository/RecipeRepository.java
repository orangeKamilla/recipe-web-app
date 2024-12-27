package com.web.recipemanager.repository;

import com.web.recipemanager.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByCategory(String category);
    @Query(value = "SELECT * FROM recipe r WHERE r.image IS NOT NULL ORDER BY r.rating DESC limit 5;", nativeQuery = true)
    List<Recipe> findTop5ByOrderByRatingDesc();
}
