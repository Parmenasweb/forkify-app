import View from "./view.js";
import previewView from "./previewView.js";
import { icons } from 'url:../../img/icons.svg';

class ResultView extends View {
    _parentElement = document.querySelector('.results');
    _renderErrorMessage = 'Oopsie!!... no recipe found for your query.. try something else!';
    _successMessage = '';

    _generateMarkup () {
        // console.log(this._data)
        return this._data.map(result => previewView.render(result, false)).join('');
    };


    // _generateMarkupPreview(results) {
    //     const id = window.location.hash.slice(1);

    //     const markUp = `
    //         <li class="preview">
    //         <a class="preview__link ${results.id === id? 'preview__link--active' : ''}" href="#${results.id}">
    //         <figure class="preview__fig">
    //             <img src="${results.image}" alt="${results.title}" />
    //         </figure>
    //         <div class="preview__data">
    //             <h4 class="preview__title">${results.title}</h4>
    //             <p class="preview__publisher">${results.publisher}</p>
    //                 <div class="preview__user-generated">
    //                 <svg>
    //                     <use href="src/img/icons.svg#icon-user"></use>
    //                 </svg>
    //                 </div>
    //         </div>
    //         </a>
    //     </li>
    //     `;
    //     return markUp;
};


export default new ResultView();