const inputValuesThatCanBeFilled = ["protocolnummer-notaris"];

// function fillRepetitiveInputs(section) {
inputValuesThatCanBeFilled.forEach((className) => {
    const elements = document.querySelectorAll(`input`);
    elements.forEach((element) => {
        element.addEventListener("blur", () => {
            // TODO If its valid
            fillDupliInputs(element);
            disableInputs(element);
        });
    });
});

function fillDupliInputs(element) {
    const classNameElement = element.classList;
    const dupliElements = document.querySelectorAll(`.${classNameElement[0]}`);
    if (dupliElements.length > 1) {
        dupliElements.forEach((dupliElement) => {
            if (dupliElement.disabled === false) {
                if (element.value !== "" && dupliElement.required === false) {
                    dupliElement.value = element.value;
                    dupliElement.innerHTML = element.value;
                }
                disableInputs(dupliElement);
            }
        });
    }
}

function disableInputs(element) {
    const parent = element.parentElement;
    const parentFromParent = parent.parentElement;
    const classInput = element.classList[0];
    console.log(classInput);
    if (
        parentFromParent.classList[1] === "disable-the-rest" &&
        element.disabled === false
    ) {
        const disabledInputs = parentFromParent.querySelectorAll(
            `input:not(.${classInput})`
        );
        disabledInputs.forEach((input) => {
            if (element.value !== "") {
                input.disabled = true;
                input.value = "";
                input.innerHTML = "";
            } else {
                input.disabled = false;
            }
        });
    }
}