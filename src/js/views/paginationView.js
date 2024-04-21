import View from "./view";
import { icons } from 'url:../../img/icons.svg';



class paginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _renderErrorMessage = 'Oopsie!!... thats all for your seach feed!';
    _successMessage = '';

    _addhandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');

            if(!btn) return;

            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }

    _generateMarkup() {
        const curPage = this._data.page;
        // on page one and there are other pages
            // check to see how many number of pages there are
            const numOfPages = Math.ceil(this._data.result.length / this._data.resultPerPage);
            if(curPage === 1 && numOfPages > 1) {
                return `
                    <button data-goto = "${curPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
                `;
            };

            
            // last page
            if(curPage === numOfPages && numOfPages>1) {
                return `
                        <button data-goto = "${curPage-1}" class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${curPage-1}</span>
                    </button>
                    `;
            };
            
            // any other page other than specified
            if(curPage < numOfPages) {
                return `
                        <button data-goto = "${curPage-1}" class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${curPage-1}</span>
                    </button>
            
                    <button data-goto = "${curPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
                    `;
            }
            
            // on page 1 and nthere are no other pages
            if(curPage === numOfPages) {
                return ``;
            }
        // const markUp = 
        // `
            
        // `
    };
};

export default new paginationView();