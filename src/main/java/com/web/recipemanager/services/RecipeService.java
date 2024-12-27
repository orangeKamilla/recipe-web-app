package com.web.recipemanager.services;

import com.web.recipemanager.models.Recipe;
import com.web.recipemanager.models.RecipeDto;
import com.web.recipemanager.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public List<Recipe> getRecipesByCategory(String category) {
        return recipeRepository.findByCategory(category);
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
    }

    public List<Recipe> getFeaturedRecipes() {
        return recipeRepository.findTop5ByOrderByRatingDesc();
    }


    public Recipe save(RecipeDto recipeDto) {
        Recipe recipe = new Recipe();
        recipe.setTitle(recipeDto.getTitle());
        recipe.setImage(recipeDto.getImage());
        recipe.setCategory(recipeDto.getCategory());
        recipe.setDescription(recipeDto.getDescription());
        recipe.setIngredients(recipeDto.getIngredients());
        recipe.setInstructions(recipeDto.getInstructions());
        return recipeRepository.save(recipe);
    }

    public Recipe updateRating(Long id, int newRating) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe == null) {
            throw new IllegalArgumentException("Recipe not found");
        }
        int totalRatings = recipe.getRatingCount() + 1;
        double updatedRating = ((recipe.getRating() * recipe.getRatingCount()) + newRating) / totalRatings;

        recipe.setRatingCount(totalRatings);
        recipe.setRating(updatedRating);

        return recipeRepository.save(recipe);
    }
}
