import { async } from "regenerator-runtime";
import { api_Url, res_Per_Page } from "./config";
import { ajax } from "./helpers";

export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
        resultPerPage: res_Per_Page,
        page: 1,
    },
    bookmarks: [],
};


// function for creating an object of ecipe from data recived

const creatRecipeObject = function(data) {
    const {recipe} = data.data;
        return {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
};


export const loadRecipe = async function(id) {
    try{
        const data = await ajax(`${api_Url}${id}`);

        state.recipe = creatRecipeObject(data);
        
            if(state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
            else state.recipe.bookmarked = false;
        // console.log(recipe)
    } catch (err) {
        throw err;
    }
};


export const loadSearchResult = async function (query) {
    try{
        state.search.query = query;

        const data = await ajax(`${api_Url}?search=${query}`);
        // console.log(data)

        state.search.result = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                key: Math.random * 100,
            };
        });
        state.search.page = 1;
    }catch (err) {
        throw err;
    };
};

export const getSearchResultsPage = function(page = state.search.page) {

    state.search.page = page;

    const start = (page-1) * state.search.resultPerPage;
    const end = page* state.search.resultPerPage;

    return state.search.result.slice(start,end)
};

export const updateServings = function(newServings) {
    state.recipe.ingredients.forEach(ing=> {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = +newServings;
    // console.log(state.recipe.servings)
};

const persistBookmark = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe) {
    // add recipe to boolmark
    state.bookmarks.push(recipe);

    //  maek current recipe as bookmark
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBookmark();
};

export const deleteBookmark = function(id) {
    // delete a bookmarked recipe from the bookmark array
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);
 //  maek current recipe as NOT bookmark
    if(id === state.recipe.id) state.recipe.bookmarked = false;
    persistBookmark();
};

const init = function() {
    const storage = localStorage.getItem('bookmarks')
    if(storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = function () {
    localStorage.clear('bookmarks');
};


export const uploadRecipe = async function (newRecipe) {
    try{
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1]!== '')
    .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if(ingArr.length !== 3) throw new Error('oopsie!!...wrong ingredients format... please use the correct ingredient format');
        const [quantity,unit,description] = ingArr;
        return {quantity: quantity? +quantity : null, unit, description};
    });
    const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
    };

    // state.recipe = creatRecipeObject(recipe);
    console.log(recipe);
    return recipe;
    // sendJson(`${api_Url}`, recipe)
} catch(err) {
    throw err;
};
};