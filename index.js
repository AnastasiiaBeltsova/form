function FormValidate(form) {
    const _errorWrapperClass = 'error';
    const _errorItemClass = 'error__item';
    const _parentItemClass = 'form-control';
    const _elements = form.elements;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.checkFormElement();
        // this.checkForm();
    })
    
    this.checkFormElement = function () {
        for (let i = 0; i < _elements.length; i++) {
            const element = _elements[i];
            const passwordMessage = element.dataset.password;
            const requiredMessage = element.dataset.req;
            const emailMessage = element.dataset.email;
            const lengthMessage = element.dataset.min_message;
            const minLength = element.dataset.min_length; 
            const newLengthMessage = lengthMessage.replace('N', minLength);      
            // console.log(lengthMessage)
            if (passwordMessage) {
                this.validPassword(passwordMessage);
            }
            if (emailMessage) {
                this.validEmail(emailMessage);
            }
            if (newLengthMessage) {
                this.validLength(newLengthMessage); 
            }
            if (requiredMessage) {
                this.validRequired(requiredMessage);
            }
        }
    }

    this.validLength = function (message) {
        const allElements = form.querySelectorAll("input[data-min_length]");
        const valueArr = Array.from(allElements).map(element => element.value);
        for (let i = 0; i < _elements.length; i++) {
            const element = _elements[i];
            const minLength = element.dataset.min_length;
            if (valueArr[0].length < +minLength && valueArr[1].length < +minLength && valueArr[2].length < +minLength) {
                allElements.forEach(item => this.errorTemplate(item, message));
            } else {
                allElements.forEach(item => this.successTemplate(item));
            }
        }
    }

    this.validEmail = function (message) {
        const allEmailElement = form.querySelectorAll("input[name='email']");
        const valueArr = Array.from(allEmailElement).map(element => element.value);
        const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!valueArr[0].match(reg)) {
            allEmailElement.forEach(item => this.errorTemplate(item, message));
        } else {
            allEmailElement.forEach(item => this.successTemplate(item));
        }
    }

    this.validRequired = function (message) {
        const allElem = form.querySelectorAll("input");
        const valueArr = Array.from(allElem).map(element => element.value);
        for (let i = 0; i < valueArr.length; i++) {
            if (valueArr[i] === "") {
                allElem.forEach(item => this.errorTemplate(item, message));
            } else {
                allElem.forEach(item => this.successTemplate(item));
            }
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
            parent.insertAdjacentHTML('beforeend', `<small class="${_errorItemClass}">${message}</small>`);
        } 
    }

    this.successTemplate = function (element) {
        const parent = element.closest(`.${_parentItemClass}`);
        if (!parent.classList.contains(_errorWrapperClass)) {
            parent.classList.remove(_errorWrapperClass);
            parent.classList.add('success');
        }
    }
}
const form = new FormValidate(document.querySelector('#form'));