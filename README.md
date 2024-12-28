# Recipe Manager Project

This project is a recipe manager where users can view, add, and filter recipes by categories. Users can also see detailed recipe information: ingredients, instructions, and ratings. The application connects to a backend API to fetch and submit recipe data.

## Features
* View All Recipes: Displays a list of all available recipes.
* Filter Recipes by Category: Filters recipes by their category.
* Add New Recipe: Allows users to submit a new recipe by filling in a form with the recipe title, image, category, description, ingredients, and instructions. There are data validation depending on the text size of certain forms.
* Recipe Details: Users can click on a recipe to view detailed information, including ingredients and instructions. Instructions will be automatically listed by their respected step number, if user adds appropriate white spaces between each step/
* Star Rating System: Users can rate recipes using a star rating system.

## Technologies

<img src="https://github.com/user-attachments/assets/cbab84dc-43e7-4174-93bd-3debf8c20165" width="100" /><img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/postgresql_logo_icon_170836.png" width="100" /><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png" width="50" />

* Frontend: HTML, CSS, JavaScript
* Backend: Spring Boot
* Spring Data JPA: For database access.
* CSS Framework: Bootstrap for responsive design.
* Icons: FontAwesome for icons.
* API Endpoints:
  * /api/recipes: Fetches all recipes.
  * /api/recipes/featured: Fetches top 5 recepies by rating
  * /api/recipes/{id}: Fetches details for a specific recipe.
  * /api/recipes/list_categories: Fetches available recipe categories.
  * /api/recipes: POST endpoint to add a new recipe.
  * /api/recipes/{id}/rate - Calculates the new rating and then saves it to the recepie

## Setup and Installation

```
git clone https://github.com/orangeKamilla/recipe-web-app
cd <repository-directory>
mvn install
mvn spring-boot:run
```

Then run this URL in your browser:
```
http://localhost:8080
```


