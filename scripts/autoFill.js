const inputValuesThatCanBeFilled = ["protocolnummer-notaris"];

// function fillRepetitiveInputs(section) {
inputValuesThatCanBeFilled.forEach((className) => {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach((element) => {
        element.addEventListener("blur", () => {
            // If its valid
            emptyDupliInputs(element);
        });
    });
});

function emptyDupliInputs(element) {
    const classNameElement = element.classList;
    console.log(classNameElement[0]);
    const dupliElements = document.querySelectorAll(`.${classNameElement[0]}`);
    dupliElements.forEach((dupliElement) => {
        console.log(dupliElement);
        dupliElement.value = element.value;
        dupliElement.innerHTML = element.value;
    });
}
