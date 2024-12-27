document.addEventListener("DOMContentLoaded", async () => {
    const recipeDashboard = document.getElementById("recipeDashboard");

    try {
        const response = await fetch("http://localhost:8080/api/recipes");
        if (!response.ok) throw new Error("Failed to fetch recipes");

        const recipes = await response.json();

        recipes.forEach(recipe => {
            const recipeRow = document.createElement("div");
            recipeRow.className = "row";

            const starRating = createStarRating(recipe.rating);

                recipeRow.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <div class = "recipe_item">
                    <h6 class="title"><a href="recipe.html?id=${recipe.id}">${recipe.title}</a></h6>
                    <span class="description">${recipe.description}</span>
                    <div class="star-rating-display">${starRating}</div>
                    </div>
                `;

            recipeDashboard.appendChild(recipeRow);
        });
    } catch (error) {
        console.error("Error loading recipes:", error);
        recipeDashboard.innerHTML = "<p>Failed to load recipes..</p>";
    }

});

function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<span class="star-display full"><i class="fa-solid fa-star"></i></span>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<span class="star-display empty"><i class="fa-regular fa-star"></i></span>';
    }

    return starsHtml;
}

