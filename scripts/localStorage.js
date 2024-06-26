/**
 * Add an event listener to all inputs to save the value in the local storage when the input changes.
 * Place the already stored value in the input when the pages refreshes.
 */
const allInputs = document.querySelectorAll("input");
allInputs.forEach((input) => {
    input.addEventListener("change", () => {
        if (input.type !== "checkbox") {
            localStorage.setItem(`${input.name}`, input.value);
        } else {
            localStorage.setItem(`${input.name}`, input.checked);
        }
        if (input.classList[0]) {
            localStorage.setItem(`${input.name}-classList`, input.classList[0]);
        }
    });
    if (input.type === "radio") {
        const name = input.name;
        const value = localStorage.getItem(`${input.name}`);
        if (value) {
            const inputsToCheck = document.querySelectorAll(`input[name="${name}"]`);
            inputsToCheck.forEach((inputToCheck) => {
                if (inputToCheck.value === value) {
                    inputToCheck.checked = true;
                    if (inputToCheck.parentElement.dataset.gaVerderMet) {
                        const elementToShow = document.querySelector(`.${inputToCheck.parentElement.dataset.gaVerderMet}`);
                        elementToShow.style.display = "block";
                        const allInputsToGetRequired = elementToShow.querySelectorAll("input");
                        allInputsToGetRequired.forEach((inputToGetRequired) => {
                            const computedStyle = window.getComputedStyle(inputToGetRequired.parentElement);
                            if (computedStyle.display !== "none") {
                                inputToGetRequired.setAttribute("required", "");
                            }
                        });
                    }
                }
            });
        }
        fireFillInLandcode();
    } else if (input.type === "checkbox") {
        const name = input.name;
        const value = localStorage.getItem(`${input.name}`);
        if (value === "true" || value === true) {
            const inputToCheck = document.querySelector(`input[name="${name}"]`);
            inputToCheck.checked = true;
        } else {
            const inputToCheck = document.querySelector(`input[name="${name}"]`);
            inputToCheck.checked = false;
        }
    } else {
        giveLabelsClass(input); // :has() fallback for styling
        const name = input.name;
        const value = localStorage.getItem(`${input.name}`);
        const classList = localStorage.getItem(`${input.name}-classList`);
        if (value) {
            checkDetailsOpen(input); // Open details when an input in it, is filled in.
            const inputsToFill = document.querySelectorAll(`input[name="${name}"]`);
            inputsToFill.forEach((input) => {
                if (classList) {
                    if (input.classList[0] === classList) {
                        input.value = value;
                        input.setAttribute("required", "");
                    }
                } else {
                    input.value = value;
                    input.setAttribute("required", "");
                }
            });
            validateInputField(input);
            colorLinkNav();
            disableInputs(input);
            checkBsnAndShowError(input); 
        }
    }
    const required = localStorage.getItem(`${input.name}-required`);
    if (required) {
        input.setAttribute("required", "");
    }
});

// validate the input
function validateInputField(input) {
    const label = input.parentElement;
    const validInput = label.querySelector("input:valid");
    const notValidInput = label.querySelector("input:invalid:not(:placeholder-shown)");
    if (validInput) {
        label.classList.add("validInput");
    } else if (notValidInput) {
        label.classList.add("showErrorMessage");
    }
}

/**
 * Remove the local storage from the linked input
 * @param {Element} input - The input element
 */
function removeLocalStorage(input) {
    localStorage.removeItem(`${input.name}`);
    localStorage.removeItem(`${input.name}-required`);
}
/**
 * Add the required local storage key with value to the linked input
 * @param {Element} input - The input element
 */
function addLocalStorageRequired(input) {
    localStorage.setItem(`${input.name}-required`, true);
}

// localStorage.clear();