import * as model from './module.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from "./views/paginationView.js";
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { modal_close_seconds } from './config.js';

if(module.hot){
  module.hot.accept();
}

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function() {
  try{

    const id = window.location.hash.slice(1);

    if (!id) return ;
    // render a spinner before loading the recipe
    recipeView.renderSpinner()
    // 0). updating the result page wit the selected recipe
    resultView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    // 1). loading the recipes
    await model.loadRecipe(id);
    // const {recipe} = model.state;
      // 2). Rendering the recipe
          recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    // 1.) get search query
    const searchQuery = searchView.getQuery();
    if(!searchQuery) return;
    // 2. load search results
      await model.loadSearchResult(searchQuery);
      // 3. render search results
      // resultView.render(model.state.search.result)
      resultView.render(model.getSearchResultsPage());

      // 4. Render pagination buttons
      paginationView.render(model.state.search);
      // console.log(model.state.search.result)
      searchView.clearField();
  }catch(err) {
    console.log(err)
  };
};

const controlPagination = function(goToPage) {

    // 1. Render pagination buttons
    paginationView.render(model.state.search);

    // 2. render search results with the appropiate pagination page

    resultView.render(model.getSearchResultsPage(goToPage));
};


const controlServings = function(newServings) {
  // update recipe servings (in state);
  model.updateServings(newServings);
  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
  // add or remove a recipe from the bookmark array
  if(!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  }
  else {
    model.deleteBookmark(model.state.recipe.id)
  };
  // update the page with the recipe bookmarked
  recipeView.update(model.state.recipe);
  // render the recipe in the bookmarks section
  bookmarksView.render(model.state.bookmarks)
};

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe) {
  try {

    addRecipeView.renderSpinner();

    const reci = await model.uploadRecipe(newRecipe);
    console.log(reci)
    // display suctcess message after creatinjg a new recipe
    addRecipeView.renderSuccess()
    // render uploaded recipe in the recipe view
    recipeView.render(reci);

    // Render bookmarks view after uploading a new recipe
    bookmarksView.render(model.state.bookmarks);

    // change the ID in the url to the uploaded recipe's Id after uploading a new recipe

    window.history.pushState(null, '', model.state.recipe.id)



    //  close form
    setTimeout(function() {
      addRecipeView.toggleWindow()
    },modal_close_seconds);
  } catch(err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  };
    // console.log(newRecipe);
};


// controlRecipes()
const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView._addhandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
  // controlServings()
};
init();

