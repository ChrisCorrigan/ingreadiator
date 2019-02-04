// cache elements
let recipesElm = document.querySelector('.recipes');
let ingredientsElm = document.querySelector('.ingredients__list');
const shoppingList = [];

const fetchData = async(dataLocation) => {
    try {
        const response = await fetch(dataLocation);
        const jsonData = await response.json();
        return jsonData;
    } catch(error) {
        console.log(error);
        alert('Error loading data, see console for details');
    }
}
const init = (recipes) => {
    // initialize recipe list component
    renderRecipes(recipes);

}
const addEventListenerToNewRecipe = (id, ingredients) => {
    let newRecipeElm = document.querySelector('[data-recipe-id="'+id+'"]');

    newRecipeElm.addEventListener('click', () => {
        if (newRecipeElm.classList.contains('selected')) {
            renderIngredients(ingredients, 'remove');
            newRecipeElm.classList.remove('selected');
        } else {
            renderIngredients(ingredients, 'add');
            newRecipeElm.classList.add('selected');
        }
    });
}
const renderRecipes = (recipes) => {
    // create recipe cards
    for (const recipeId in recipes) {
        let recipe = recipes[recipeId];
        let ingredients = recipe['ingredients'];
        let recipeElm = `
            <article class="recipe" data-recipe-id="${recipeId}">
                <h2 class="recipe__name">${recipe['name']}</h2>
                <p class="recipe__cuisine"><span>${recipe['type']}</span> cuisine</p>
                <div class="recipe__ingredients hidden">
                    ${ingredients.map(ingredient => 
                        `<div class="recipe__ingredient">${ingredient}</div>`
                    ).join('')}
                </div>
            </article>
        `;
        recipesElm.insertAdjacentHTML('beforeend', recipeElm);
        // set callback on recipie to add to remove to ingredients shopping list
        // since recipeElm is not a dom element yet, get the new dom element that was 
        // just inserted by its ID and add the event listener to it. Also do it outside
        // the loop so we create closure around the current versions of variables
        addEventListenerToNewRecipe(recipeId, ingredients);
    }
}
const renderShoppingList = (shoppingList) => {
    // first clear old shopping list dom elements
    ingredientsElm.innerHTML="";
    shoppingList.forEach(function (item) {
        let newItemElm = `<div class="ingredients__item">${item}</div>`;
        ingredientsElm.insertAdjacentHTML('beforeend', newItemElm);
    })
}
const renderIngredients = (recipeIngredients, action) => {
    // go through passed in ingredients and decide what to do for each
    recipeIngredients.forEach(function (item) {
        if (shoppingList.includes(item)) {
            // is in shopping list. Don't add, remove if necessary.
            if (action === 'remove') {
                let itemIndex = shoppingList.indexOf(item);
                if (itemIndex > -1) {
                    shoppingList.splice(itemIndex, 1);
                }
            }
        } else {
            // not in shopping list. Add if necessary.
            if (action === 'add') {
                shoppingList.push(item);
            }
        }
    })
    // sort newly edited list alphabetically
    shoppingList.sort();
    // re-render shopping list
    renderShoppingList(shoppingList);
}


// fetch data
const getData = fetchData('data/recipes.json'); // returns a promise

// initialize components
getData.then ( jsonData => init(jsonData));




