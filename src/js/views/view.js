import { icons } from 'url:../../img/icons.svg';

export default class View {
        _data;

        render (data, render =true) {
            if(!data || (Array.isArray(data) && data.length===0)) return this.renderError();
            this._data = data;
            const markUp = this._generateMarkup();

            if(!render) return markUp
            this._clear();
            this._parentElement.insertAdjacentHTML('afterbegin', markUp)
        };

        update(data) {
            if(!data) 
            return this.renderError();

            this._data = data;
            // creating a duplicate of the old Html
            const newMarkUp = this._generateMarkup();
                // convert the bare Html string of new markup to a dom tree representation of same
            const newDom = document.createRange().createContextualFragment(newMarkUp);
            // to be able to see all newly created dom elements need to query select the new Dom object
            const newElements =Array.from(newDom.querySelectorAll('*'));
            // also need to convert old Bare Html string to Dom object by
            const curElement =Array.from(this._parentElement.querySelectorAll('*'));

            // now try comparing both Dom object by looping through the new Dom object

            newElements.forEach((newEl, i) => {
                const curEl = curElement[i];
                // console.log(curEl, newEl.isEqualNode(curEl));

                // update changes in text
                if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
                    curEl.textContent = newEl.textContent;
                };
                // update changes in attributes
                if(!newEl.isEqualNode(curEl)) {
                    Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
                };
            });
        };

        _clear () {
            this._parentElement.innerHTML = '';
        };

        renderSpinner() {
                const markUP = 
                    `
                    <div class="spinner">
                    <svg>
                    <use href="${icons}#icon-loader"></use>
                    </svg>
                </div>
                `;
                this._clear();
                this._parentElement.insertAdjacentHTML('afterbegin', markUP);
            };

            renderError(renderErrorMessage = this._renderErrorMessage) {
                const markUp = `
                <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${renderErrorMessage}</p>
            </div>
                `;
                this._clear();
                this._parentElement.insertAdjacentHTML('afterbegin', markUp);
        };

        renderSuccess(renderErrorMessage = this._successMessage) {
                const markUp = `
                <div class="message">
                <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
                </div>
                <p>${renderErrorMessage}</p>
            </div>
                `;
                this._clear();
                this._parentElement.insertAdjacentHTML('afterbegin', markUp);
        };
};