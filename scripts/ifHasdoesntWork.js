const rootStyles = getComputedStyle(document.documentElement);
const supportsSelectorHas =
    rootStyles.getPropertyValue("--supports-selector-has").trim() == "1";

const inputsWithVervolg = [
    "vervolg-1b",
    "vervolg-1b-2",
    "vervolg-1c",
    "vervolg-1c-2",
    "vervolg-1d",
    // "vervolg-3a",
    "vervolg-3b",
    "vervolg-3b-2",
    "vervolg-3d",
    "vervolg-4c",
    "vervolg-4c-2",
];

// const vragenOverslaan = ["vraag-3b"];

console.log(
    "falback js function when :has() isn't supported runs = ",
    !supportsSelectorHas
); // boolean -> true if supported

if (!supportsSelectorHas) {
    displayFollowUpQuestion();
    colorLinkNav();
    displayErrorMessage();
    runFunctionWhenTargeted();
    // vragenOverslaanFunction();
}

// scriptje om dingen te showen op bepaalde clicks als progressive enhancement voor als :has() niet werkt
function displayFollowUpQuestion() {
    // Dont show the spans
    const allSpans = document.querySelectorAll("label > span");
    allSpans.forEach((span) => {
        span.style.display = "none";
    });
    // For every inputString with a vervolg
    inputsWithVervolg.forEach((inputString) => {
        const element = document.querySelector(`.${inputString}`);
        element.style.display = "none";
        // get the elements
        let label = document.querySelector(
            `label[data-ga-verder-met=${inputString}]`
        );
        if (!label) {
            label = document.querySelector(
                `label[data-ga-ook-verder-met=${inputString}]`
            );
        }
        const input = label.querySelector("input");
        const fieldset = label.parentElement;
        const inputToHideVervolg = fieldset.querySelector(
            `label:not([data-ga-verder-met=${inputString}])`
        );
        // hide
        inputToHideVervolg.addEventListener("click", () => {
            const vervolg = document.querySelector(`.${inputString}`);
            vervolg.style.display = "none";
        });
        // show
        input.addEventListener("click", () => {
            const vervolg = document.querySelector(`.${inputString}`);
            vervolg.style.display = "block";
        });
    });
}

// Scriptje om en vraag over te slaan 
// function vragenOverslaanFunction() {
//     vragenOverslaan.forEach((vraagString) => {
//         const element = document.querySelector(`.${vraagString}`);
//         const label = document.querySelector(
//             `label[data-sla-over=${vraagString}]`
//         );
//         const parent = label.parentElement;
//         const inputs = parent.querySelectorAll("input");
//         const inputToDisable = label.querySelector("input");
//         inputs.forEach((input) => {
//             input.addEventListener("click", () => {
//                 if (input.checked && inputToDisable === input) {
//                     element.classList.add("disableQuestion");
//                 } else {
//                     element.classList.remove("disableQuestion");
//                 }
//             });
//         });
//     });
// }

// scriptje om error message te showen als progressive enhancement voor als :has() niet werkt
// scriptje om de links een kleur te geven als een fieldset invalid is of valid is of een error heeft
function colorLinkNav(sectionId) {
    if (sectionId === undefined) {
        sectionId = window.location.hash;
    }
    const everySection = document.querySelectorAll("main form section");
    everySection.forEach((section) => {
        const linkMatchedSection = document.querySelector(
            `main nav a[href='#${section.id}']`
        );
        if (sectionId === "#" + section.id) {
            linkMatchedSection.style.background = "blue";
            const theOtherLinks = document.querySelectorAll(
                `main nav a:not([href='#${section.id}'])`
            );
            theOtherLinks.forEach((link) => {
                // check if section with the fieldsets are valid
                checkIfSectionsAreValid(link);
            });
        }
    });
}

// check if section with the fieldsets are valid
function checkIfSectionsAreValid(link) {
    let currentUrl = link.href;
    let hashIndex = currentUrl.indexOf("#");
    let hashAndNext = currentUrl.substring(hashIndex);
    const everySection = document.querySelectorAll("main form section");
    everySection.forEach((section) => {
        if ("#" + section.id === hashAndNext) {
            const inputError = section.querySelector(
                "fieldset label input:user-invalid:not(:focus)"
            );
            const validInputs = section.querySelectorAll(
                "fieldset label input:required:valid"
            );
            const allInputs = section.querySelectorAll(
                "fieldset input:required"
            );
            const linkMatchedSection = document.querySelector(
                `main nav a[href='#${section.id}']`
            );
            if (inputError && inputError.value !== "") {
                linkMatchedSection.style.background = "red";
            } else if (
                validInputs.length >= allInputs.length &&
                validInputs.value !== ""
            ) {
                linkMatchedSection.style.background = "green";
            } else {
                linkMatchedSection.style.background = "#8fcae7";
            }
        }
    });
}

// Display the error message from the label if input is user-invalid
function displayErrorMessage() {
    const everySection = document.querySelectorAll("main form section");
    everySection.forEach((section) => {
        const everyInput = section.querySelectorAll("fieldset label input");
        everyInput.forEach((input) => {
            input.addEventListener("blur", () => {
                const label = input.parentElement;
                const invalidInput = label.querySelector(
                    "input:user-invalid:not(:focus)"
                );
                if (invalidInput && invalidInput.value !== "") {
                    label.classList.add("showErrorMessage");
                } else {
                    label.classList.remove("showErrorMessage");
                }
            });
        });
    });
}

// Run the functions above when a section is target
function runFunctionWhenTargeted() {
    const directionButtons = document.querySelectorAll(
        "main form > section > div > a"
    );
    directionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let currentUrl = button.href;
            let hashIndex = currentUrl.indexOf("#");
            let hashAndNext = currentUrl.substring(hashIndex);
            colorLinkNav(hashAndNext);
        });
    });
    const directionNavLinks = document.querySelectorAll("main nav a");
    directionNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            let currentUrl = link.href;
            let hashIndex = currentUrl.indexOf("#");
            let hashAndNext = currentUrl.substring(hashIndex);
            colorLinkNav(hashAndNext);
        });
    });
}
