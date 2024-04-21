import View from "./view.js";
import previewView from "./previewView.js";
import { icons } from 'url:../../img/icons.svg';

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _renderErrorMessage = 'oopsie ...there are no bookmarks yet.. try bookmark a recipe!';
    _successMessage = '';

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup () {
        // console.log(this._data)
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    };
};


export default new BookmarksView();