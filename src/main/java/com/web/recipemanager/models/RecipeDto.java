package com.web.recipemanager.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class RecipeDto {
    private String title;
    private String image;
    private String category;
    private String description;
    private String ingredients;
    private String instructions;

    public String getTitle() {
        return title;
    }

    public String getImage() {
        return image;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public String getIngredients() {
        return ingredients;
    }

    public String getInstructions() {
        return instructions;
    }
}
