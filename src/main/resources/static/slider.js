document.addEventListener('DOMContentLoaded', async () => {
    const slider = document.querySelector('.slider');

    try {
        const response = await fetch('http://localhost:8080/api/recipes/featured');
        const topRecipes = await response.json();

        slider.innerHTML = '';

        topRecipes.forEach(recipe => {
            const slide = document.createElement('div');
            slide.classList.add('slide');

            const img = document.createElement('img');
            img.src = recipe.image;
            img.alt = recipe.title;
            slide.appendChild(img);

            const descr = document.createElement('div');
            slide.classList.add('descr');
            slide.appendChild(descr);

            const titleLink = document.createElement('a');
            titleLink.href = `recipe.html?id=${recipe.id}`;
            titleLink.textContent = recipe.title;
            titleLink.classList.add('recipe-title');
            descr.appendChild(titleLink);

            const description = document.createElement('p');
            description.textContent = recipe.description;
            descr.appendChild(description);


            slider.appendChild(slide);
        });

        initializeSlider();
    } catch (error) {
        console.error('Error fetching top recipes:', error);
    }
});

function initializeSlider() {
    const slider = document.querySelector('.slider');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const slideCount = slides.length;
    let slideIndex = 0;

    prevButton.addEventListener('click', () => {
        slideIndex = (slideIndex - 1 + slideCount) % slideCount;
        updateSlider(slides, slideIndex);
    });

    nextButton.addEventListener('click', () => {
        slideIndex = (slideIndex + 1) % slideCount;
        updateSlider(slides, slideIndex);
    });

    updateSlider(slides, slideIndex);
}

function updateSlider(slides, slideIndex) {
    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? 'block' : 'none';
    });
}
