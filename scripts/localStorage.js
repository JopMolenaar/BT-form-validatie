/**
 * Add an event listener to all inputs to save the value in the local storage when the input changes.
 * Place the already stored value in the input when the pages refreshes.
 */
const allInputs = document.querySelectorAll("input");
allInputs.forEach((input) => {
    input.addEventListener("change", () => {
        localStorage.setItem(`${input.name}`, input.value);
        if (input.classList[0]) {
            localStorage.setItem(`${input.name}-classList`, input.classList[0]);
        }
    });

    if (input.type === "radio" || input.type === "checkbox") {
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
    } else {
        giveLabelsClass(input); // :has() fallback for styling
        const name = input.name;
        const value = localStorage.getItem(`${input.name}`);
        const classList = localStorage.getItem(`${input.name}-classList`);
        if (value) {
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
        }
    }
    const required = localStorage.getItem(`${input.name}-required`);
    if (required) {
        input.setAttribute("required", "");
    }
    // TODO validate the input
});

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
