package com.web.recipemanager.controllers;

import com.web.recipemanager.models.Category;
import com.web.recipemanager.models.RatingDto;
import com.web.recipemanager.models.Recipe;
import com.web.recipemanager.models.RecipeDto;
import com.web.recipemanager.services.CategoryService;
import com.web.recipemanager.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/recipes")
@CrossOrigin
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/list_categories")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping
    public List<Recipe> getAllRecipes(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return recipeService.getRecipesByCategory(category);
        }
        return recipeService.getAllRecipes();
    }

    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable Long id) {
        return recipeService.getRecipeById(id);
    }

    @PostMapping
    public ResponseEntity<String> addRecipe(@RequestBody RecipeDto recipeDto) {
        System.out.println("Recipe received: " + recipeDto);
         recipeService.save(recipeDto);
        return ResponseEntity.status(HttpStatus.OK).body("Recipe added successfully!");
    }

    @GetMapping("/featured")
    public List<Recipe> getFeaturedRecipes() {
        return recipeService.getFeaturedRecipes();
    }

    @PostMapping("/{id}/rate")
    public Recipe rateRecipe(@PathVariable Long id, @RequestBody RatingDto ratingDto) {
        int rating = ratingDto.getRating();
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
        return recipeService.updateRating(id, rating);
    }
}
