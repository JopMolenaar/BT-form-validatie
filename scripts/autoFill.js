// const inputValuesThatCanBeFilled = ["protocolnummer-notaris"];
// const inputValuesThatCanBeFilled = [""];

// function fillRepetitiveInputs(section) {
// inputValuesThatCanBeFilled.forEach((className) => {
const elements = document.querySelectorAll(`input`);
elements.forEach((element) => {
    element.addEventListener("blur", () => {
        // TODO If its valid
        fillDupliInputs(element);
        disableInputs(element);
    });
});
// });

// TODO misschien de nummers uit deze velden opslaan en als autocomplete meegeven ipv al invullen?

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

function fillInLandcode() {
    const landcodeCheckBox = document.querySelector(
        ".autoFillInLandcodeNL label:nth-of-type(1)"
    );
    landcodeCheckBox.style.display = "inline";
    if (landcodeCheckBox.checked) {
        const landcodeInput = document.querySelector(
            ".autoFillInLandcodeNL label:nth-of-type(2)"
        );
        landcodeInput.required = false;
        landcodeInput.value = ""; // need to be in generic function
        landcodeInput.style.display = "none";
    }
}
fillInLandcode();
