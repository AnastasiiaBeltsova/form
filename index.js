function FormValidate(form) {
    const _errorWrapperClass = 'error';
    const _errorItemClass = 'error__item';
    const _parentItemClass = 'form-control';
    const _elements = form.elements;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.checkFormElement();
    })
    
    this.checkFormElement = function () {
        for (let i = 0; i < _elements.length; i++) {
            const element = _elements[i];
            const passwordMessage = element.dataset.password;
            const requiredMessage = element.dataset.req;
            const emailMessage = element.dataset.email;
            const lengthMessage = element.dataset.min_message || '';
            const minLength = element.dataset.min_length; 
            const newLengthMessage = lengthMessage.replace('N', minLength);
            if (passwordMessage) {
                this.validPassword(passwordMessage);
            }
            if (requiredMessage) {
                this.validRequired(element, requiredMessage);
            }
            if (newLengthMessage) {
                this.validLength(element, newLengthMessage);
            }
            if (emailMessage) {
                this.validEmail(emailMessage);
            }
        }
    }

    this.validLength = function (element, message) {
        const minLength = element.dataset.min_length;
        if (element.value.length < +minLength) {
            this.errorTemplate(element, message);
        } else {
            this.successTemplate(element);
        }
    }

    this.validEmail = function (message) {
        const emailElement = form.querySelector("input[name='email']");
        const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        !emailElement.value.match(reg) ?
            this.errorTemplate(emailElement, message):
            this.successTemplate(emailElement);
    }

    this.validRequired = function (element, message) {
        if (element.value === "" || (element.type === 'checkbox' && !element.checked)) {
            this.errorTemplate(element, message);
        } else {
            this.successTemplate(element);
        }
    }

    this.validPassword = function (message) {
        const allPasswordElement = form.querySelectorAll("input[type='password']");
        const valueArr = Array.from(allPasswordElement).map(element => element.value);

        if (valueArr[0] !== valueArr[1]) {
            allPasswordElement.forEach(item => this.errorTemplate(item, message));
        } 
    }

    this.errorTemplate = function (element, message) {
        const parent = element.closest(`.${_parentItemClass}`);
        if (!parent.classList.contains(_errorWrapperClass)) {
            parent.classList.add(_errorWrapperClass);
            parent.childNodes.forEach(el => el.tagName === "SMALL" && el.remove())
            parent.insertAdjacentHTML('beforeend', `<small class="${_errorItemClass}">${message}</small>`);
        } 
    }

    this.successTemplate = function (element) {
        const parent = element.closest(`.${_parentItemClass}`);
        if (parent.classList.contains(_errorWrapperClass)) {
            parent.classList.remove(_errorWrapperClass);
            parent.classList.add('success');
        }
    }
}
const form = new FormValidate(document.querySelector('#form'));
