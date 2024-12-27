document.getElementById('submitRecipe').addEventListener('click', () => {
    const title = document.getElementById('recipeTitle').value;
    const image = document.getElementById('recipeImage').value;
    const category = document.getElementById('recipeCategory').value;
    const description = document.getElementById('recipeDescription').value;
    const ingredients = document.getElementById('recipeIngredients').value;
    const instructions = document.getElementById('recipeInstructions').value;

    if (title.length > 255) {
        alert('The title is too long!');
        return;
    }
    if (category.length > 255) {
        alert('The category is too long!');
        return;
    }
    if (description.length > 255) {
        alert('The description is too long!');
        return;
    }

    if (!title || !image || !category || !description || !ingredients || !instructions) {
        alert('Please fill in all the fields.');
        return;
    }

    const recipe = {
        title,
        image,
        category,
        description,
        ingredients,
        instructions
    };

    console.log('Recipe:', recipe);

    fetch('http://localhost:8080/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit recipe');
            }
            return response.text();
        })
        .then(data => {
            alert('Recipe submitted successfully!');
            console.log('Server Response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit recipe.');
        });
});
