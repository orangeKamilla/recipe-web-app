document.addEventListener("DOMContentLoaded", () => {
    const recipeDetails = document.getElementById("recipeDetails");

    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");

    const fetchRecipeDetails = () =>{
    fetch(`http://localhost:8080/api/recipes/${recipeId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("OOOPPS failed to fetch recipe details");
            }
            return response.json();
        })
        .then(recipe => {
            recipeDetails.innerHTML = `
                <div class="title"><h3 class="title">${recipe.title}</h3></div>
                <div class="rec_descr">
                    <h4>Description</h4>
                    <p>${recipe.description}</p>
                </div>
                <div class="rating">
                        <h4>Rate This Recipe</h4>
                        <div id="stars" class="stars">
                            ${[1, 2, 3, 4, 5].map(star => `<span data-rating="${star}" class="star"><i class="fa-solid fa-star"></i></span>`).join('')}
                        </div>
                </div>
                <div>
                    <img src="${recipe.image}" alt="${recipe.title}">
                </div>
                <div class="recipe_info">
                    <div class="ingredients">
                        <h4>Ingredients</h4>
                        <ul>
                            ${recipe.ingredients.split("\n").map(item => `<li>${item.trim()}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="instructions">
                        <h4>Instructions</h4>
                        <ul>
                            ${recipe.instructions.split("\n").map((step, index) => `<li><span>${index + 1}</span><p>${step.trim()}</p></li>`).join('')}
                        </ul>
                    </div>
                    
                </div>
            `;

            document.querySelectorAll(".star").forEach(star => {
                star.addEventListener("click", () => submitRating(star.dataset.rating));
            });
        })
        .catch(error => console.error("Error:", error));}

    const submitRating = (rating) => {
        fetch(`http://localhost:8080/api/recipes/${recipeId}/rate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rating: parseInt(rating) }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to submit rating");
                }
                return response.json();
            })
            .then(() => {
                fetchRecipeDetails();
            })
            .catch(error => console.error("Error submitting rating:", error));
    };

    fetchRecipeDetails();
});
