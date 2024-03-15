const allInputs = document.querySelectorAll("input");

allInputs.forEach((input) => {
    input.addEventListener("change", () => {
        localStorage.setItem(`${input.name}`, input.value);
    });

    if (input.type === "radio" || input.type === "checkbox") {
        const name = input.name;
        const value = localStorage.getItem(`${input.name}`);
        if (value) {
            const inputsToCheck = document.querySelectorAll(
                `input[name="${name}"]`
            );
            inputsToCheck.forEach((inputToCheck) => {
                if (inputToCheck.value === value) {
                    inputToCheck.checked = true;
                    if (inputToCheck.parentElement.dataset.gaVerderMet) {
                        const elementToShow = document.querySelector(
                            `.${inputToCheck.parentElement.dataset.gaVerderMet}`
                        );
                        elementToShow.style.display = "block";
                        const allInputsToGetRequired =
                            elementToShow.querySelectorAll("input");
                        allInputsToGetRequired.forEach((inputToGetRequired) => {
                            const computedStyle = window.getComputedStyle(
                                inputToGetRequired.parentElement
                            );
                            if (computedStyle.display !== "none") {
                                inputToGetRequired.setAttribute("required", "");
                            }
                        });
                    }
                }
            });
        }
    } else {
        const innerHTML = localStorage.getItem(`${input.name}`);
        if (innerHTML) {
            input.innerHTML = innerHTML;
            input.value = innerHTML;
            input.setAttribute("required", "");
        }
    }
    const required = localStorage.getItem(`${input.name}-required`);
    if (required) {
        input.setAttribute("required", "");
    }
});

function removeLocalStorage(input) {
    localStorage.removeItem(`${input.name}`);
    localStorage.removeItem(`${input.name}-required`);
}
function addLocalStorageRequired(input) {
    localStorage.setItem(`${input.name}-required`, true);
}