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
        // if (element.value !== "") {
        dupliElement.value = element.value;
        dupliElement.innerHTML = element.value;
        // }
        const parent = dupliElement.parentElement;
        const parentFromParent = parent.parentElement;
        const classInput = element.classList[0];
        if (
            parentFromParent.classList[0] === "duplicate-input-disable-the-rest"
        ) {
            const disabledInputs = parentFromParent.querySelectorAll(
                `input:not(.${classInput})`
            );
            disabledInputs.forEach((input) => {
                if (element.value !== "") {
                    input.disabled = true;
                } else {
                    input.disabled = false;
                }
            });
        }
    });
}
