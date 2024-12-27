document.addEventListener("DOMContentLoaded", () => {
    const categoryList = document.getElementById("categoryList");
    const recipeDashboard = document.getElementById("recipeDashboard");

    fetch('http://localhost:8080/api/recipes/list_categories')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            return response.json();
        })
        .then(categories => {
            categoryList.innerHTML = categories.map(cat => `
                <div class="category-item" data-category-name="${cat.name}">
                    <img src="${cat.image}" alt="${cat.name}">
                    <h6>${cat.name}</h6>
                </div>
            `).join('');

            categoryList.addEventListener('click', (e) => {
                const categoryItem = e.target.closest('.category-item');
                if (categoryItem) {
                    const categoryName = categoryItem.dataset.categoryName;
                    filterRecipesByCategory(categoryName);
                }
            });
        })
        .catch(error => console.error('Error: ', error));

    function filterRecipesByCategory(categoryName) {
        if(categoryName === "All"){
            categoryName = "";
        }
        fetch(`http://localhost:8080/api/recipes?category=${encodeURIComponent(categoryName)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to get recipes for category');
                }
                return response.json();
            })
            .then(recipes => {
                recipeDashboard.innerHTML = recipes.map(recipe =>
                    `<div class="recipe-item">
                        <img src="${recipe.image}" alt="${recipe.title}">
                        <h6><a href="recipe.html?id=${recipe.id}">${recipe.title}</a></h6>
                        <p>${recipe.description}</p>
                        <div class="star-rating-display">${createStarRating(recipe.rating)}</div>
                    </div>`
                ).join('');
            })
            .catch(error => console.error('Error:', error));
    }

    fetch('/api/recipes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch all recipes');
            }
            return response.json();
        })
        .then(recipes => {
            recipeDashboard.innerHTML = recipes.map(recipe => `
                <div class="recipe-item">
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <h6><a href="recipe.html?id=${recipe.id}">${recipe.title}</a></h6>
                    <p>${recipe.description}</p>
                    <div class="star-rating-display">${createStarRating(recipe.rating)}</div>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error fetching all recipes:', error));
});

function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = (rating % 1) >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<span class="star-display full"><i class="fa-solid fa-star"></i></span>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<span class="star-display empty"><i class="fa-regular fa-star"></i></span>';
    }

    return starsHtml;
}
