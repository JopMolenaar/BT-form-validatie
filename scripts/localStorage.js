const allInputs = document.querySelectorAll("input");

allInputs.forEach((input) => {
    input.addEventListener("change", () => {
        localStorage.setItem(`${input.name}`, input.value);
        // localStorage.setItem(`${input.name}-element`, input.name);
        const value = localStorage.getItem(`${input.name}`);
        const element = localStorage.getItem(`${input.name}-element`);
        console.log(value, element);
    });

    const computedStyle = window.getComputedStyle(input);
    if (computedStyle.display !== "none") {
        if (input.type === "radio" || input.type === "checkbox") {
            // const name = localStorage.getItem(`${input.name}-element`);
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

                console.log(name, inputsToCheck);
                console.log(inputsToCheck);
                inputsToCheck.checked = true;
            }
        } else {
            const innerHTML = localStorage.getItem(`${input.name}`);
            if (innerHTML) {
                input.innerHTML = innerHTML;
                input.value = innerHTML;
            }
        }
    }
});

function removeLocalStorage(input) {
    localStorage.removeItem(`${input.name}`);
}
