// give inputs in vervolgs a required when it is open and remove it when closed
// reset inputs for every vervolg that is display none
const radios = document.querySelectorAll("input[type=radio]");
radios.forEach((radio) => {
    radio.addEventListener("click", () => {
        inputsWithVervolg.forEach((inputString) => {
            const element = document.querySelector(`.${inputString}`);
            const computedStyle = window.getComputedStyle(element);
            if (computedStyle.display === "none") {
                const allInputs = element.querySelectorAll("input");
                allInputs.forEach((input) => {
                    input.removeAttribute("required", "");
                    if (input.type === "radio" || input.type === "checkbox") {
                        input.checked = false;
                    } else {
                        input.value = "";
                    }
                    emptyDupliInputs(input);
                });
            } else {
                const allInputs = element.querySelectorAll("input");
                allInputs.forEach((input) => {
                    input.setAttribute("required", "");
                });
            }
        });
    });
});

// scriptje zodat de datum in de toekomst bij datum velden niet gekozen kan worden
const inputDisabledFutures = [
    "input[name=overlijdensdatum-overledene]",
    "input[name=datum-testament]",
    "input[name=datum-partnerschapsvoorwaarden]",
];
inputDisabledFutures.forEach((input) => {
    const dynInput = document.querySelector(input);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    // Set the max attribute of the date input to today's date
    dynInput.max = today;
});
