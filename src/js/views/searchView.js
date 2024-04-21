class searchView {
    _parentEl = document.querySelector('.search');

    getQuery() {
        return this._parentEl.querySelector('.search__field').value;
    };

    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        })
    };

    clearField() {
        this._parentEl.querySelector('.search__field').value = '';
    }
};


export default new searchView();