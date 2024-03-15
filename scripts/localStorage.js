const allInputs = document.querySelectorAll("input");

allInputs.forEach((input) => {
    input.addEventListener("change", () => {
        localStorage.setItem(`${input.name}`, input.value);
        const value = localStorage.getItem(`${input.name}`);
        const element = localStorage.getItem(`${input.name}-element`);
        console.log(value, element);
    });

    const computedStyle = window.getComputedStyle(input);
    if (computedStyle.display !== "none") {
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
            console.log(input.name);
            input.setAttribute("required", "");
        }
    }
});

function removeLocalStorage(input) {
    localStorage.removeItem(`${input.name}`);
    localStorage.removeItem(`${input.name}-required`);
}
function addLocalStorageRequired(input) {
    localStorage.setItem(`${input.name}-required`, true);
}