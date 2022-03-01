function Validator(options) {
    var selectorRule = {}

    function validate(inputElement, rule) {
        const elementParent = inputElement.closest(options.formGroupSelector)
        const errorElement = elementParent.querySelector(options.errorSelector)
        var errorMessage

        var rules = selectorRule[rule.selector]

        for(var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if(errorMessage) break
        }

        if(errorMessage) {
            errorElement.innerText = errorMessage
            elementParent.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            elementParent.classList.remove('invalid')
        }

        return !errorMessage
    }
//--------------------------Register-----------------------------------------
    const formRegisterElement = document.querySelector(options.formRegister)

    if(formRegisterElement) {
        formRegisterElement.onsubmit = function(e) {
            e.preventDefault()
            var isFormValid = true
            options.rules.forEach(rule => {
                var inputElement = formRegisterElement.querySelector(rule.selector)
                var isValid = validate(inputElement, rule)

                if(!isValid) {
                    isFormValid = false
                }
            })

            if(isFormValid) {
                const enableInputs = formRegisterElement.querySelectorAll('[name]')
                var formValues = Array.from(enableInputs).reduce((values, input) => {
                    values[input.name] = input.value
                    return values
                },{})
                options.onSubmit(formValues)
            }
        }
        options.rules.forEach(rule => {
            var inputElement = formRegisterElement.querySelector(rule.selector)
            if(Array.isArray(selectorRule[rule.selector])) {
                selectorRule[rule.selector].push(rule.test)
            } else {
                selectorRule[rule.selector] = [rule.test]
            }

            if(inputElement) {
                inputElement.onblur = function() {
                    validate(inputElement, rule)
                }

                inputElement.oninput = function() {
                    const elementParent = inputElement.closest(options.formGroupSelector)
                    const errorElement = elementParent.querySelector(options.errorSelector)

                    errorElement.innerText = ''
                    elementParent.classList.remove('invalid')
                }
            }
        });
    }
//-------------------Login--------------------------
    const formLoginElement = document.querySelector(options.formLogin)
    if(formLoginElement) {
        // formLoginElement.onsubmit = function(e) {
        //     e.preventDefault()
        //     var isFormValid = true
        //     options.rules.forEach(rule => {
        //         const inputElement = formLoginElement.querySelector(rule.selector)
        //         var isValid = validate(inputElement, rule)

        //         if(!isValid) {
        //             isFormValid = false
        //         }
        //     })
        // }

        options.rules.forEach(rule => {
            const inputElement = formLoginElement.querySelector(rule.selector)
            if(Array.isArray(selectorRule[rule.selector])) {
                selectorRule[rule.selector].push(rule.test)
            } else {
                selectorRule[rule.selector] = [rule.test]
            }

            if(inputElement) {
                inputElement.onblur = function() {
                    validate(inputElement, rule)
                }

                inputElement.oninput = function() {
                    const elementParent = inputElement.closest(options.formGroupSelector)
                    const errorElement = elementParent.querySelector(options.errorSelector)

                    errorElement.innerText = ''
                    elementParent.classList.remove('invalid')
                }
            }
        });
    }
}

Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value){
            return value ? undefined : message || 'Trường này là bắt buộc'
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value){
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || 'Trường này phải là email'
        }
    }
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : `Trường này tối thiểu ${min} kí tự`
        }
    }
}

Validator.confirmPassword = function(selector, getValueConfirm, message) {
    return {
        selector: selector,
        test: function(value){
            return value === getValueConfirm() ? undefined : message || 'Trường này nhập chưa chính xác'
        }
    }
}