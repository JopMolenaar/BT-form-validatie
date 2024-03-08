const inputValuesThatCanBeFilled = ["protocolnummer-notaris"];

// function fillRepetitiveInputs(section) {
inputValuesThatCanBeFilled.forEach((className) => {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach((element) => {
        element.addEventListener("blur", () => {
            // If its valid
            fillDupliInputs(element);
        });
    });
});

function fillDupliInputs(element) {
    const classNameElement = element.classList;
    const dupliElements = document.querySelectorAll(`.${classNameElement[0]}`);
    dupliElements.forEach((dupliElement) => {
        dupliElement.value = element.value;
        dupliElement.innerHTML = element.value;
        const parent = dupliElement.parentElement;
        const parentFromParent = parent.parentElement;
        const classInput = element.classList[0];
        // console.log(parent);
        if (parentFromParent.classList[0] === "duplicate-input") {
            console.log(classInput);
            // isnt working properly
            const disabledInputs = parent.querySelectorAll(
                `input:not(.${classInput})`
            );

            console.log(disabledInputs);
            disabledInputs.forEach((input) => {
                input.disabled = true;
            });
        }
    });
}
