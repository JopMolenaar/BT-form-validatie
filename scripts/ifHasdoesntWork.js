const rootStyles = getComputedStyle(document.documentElement);
const supportsSelectorHas =
    rootStyles.getPropertyValue("--supports-selector-has").trim() == "1";

// const vragenOverslaan = ["vraag-3b"];

console.log(
    "falback js function when :has() isn't supported runs = ",
    !supportsSelectorHas
); // boolean -> true if supported

// if (!supportsSelectorHas) {
    displayFollowUpQuestion();
    colorLinkNav();
    displayErrorMessage();
    runFunctionWhenTargeted();
    // vragenOverslaanFunction();
// }

// TODO explanations en kan misschien korter?
function displayFollowUpQuestion() {
    // Dont show the spans
    const allSpans = document.querySelectorAll("label > span");
    allSpans.forEach((span) => {
        span.style.display = "none";
    });

    // For every inputString with a vervolg
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        const labelofInput = input.parentElement;
        const fieldset = labelofInput.parentElement;
        if (fieldset.classList.contains("displayVervolgsAdvanced")) {
            if (labelofInput.dataset.gaVerderMet) {
                const parentOfLabel = labelofInput.parentElement;
                const dataset = labelofInput.dataset.gaVerderMet;
                const theShowInput = labelofInput.querySelector(`input`);
                // Geen click op, wel opslaan data-ga-verder-met en als er 1 voorkomt die niet voorkomt in de main input, niet laten zien.

                // The other input to open the vervolg
                theShowInput.addEventListener("click", () => {
                    console.log("click");
                    let getTheVervolgToHide = [];
                    const otherInputs = parentOfLabel.querySelectorAll(
                        `label:not([data-ga-verder-met="${dataset}"]) input`
                    );

                    otherInputs.forEach((otherInput) => {
                        const labelofOtherInput = otherInput.parentElement;
                        let inputString = [];
                        if (labelofOtherInput.dataset.gaVerderMet) {
                            if (
                                labelofOtherInput.dataset.gaVerderMet.includes(
                                    ","
                                )
                            ) {
                                inputString =
                                    labelofOtherInput.dataset.gaVerderMet
                                        .split(",")
                                        .map((inputString) =>
                                            inputString.trim()
                                        );
                            } else {
                                inputString.push(
                                    labelofOtherInput.dataset.gaVerderMet.trim()
                                );
                            }
                            inputString.forEach((string) => {
                                getTheVervolgToHide.push(string);
                            });
                        }
                    });

                    let inputString = [];
                    if (labelofInput.dataset.gaVerderMet.includes(",")) {
                        inputString = labelofInput.dataset.gaVerderMet
                            .split(",")
                            .map((inputString) => inputString.trim());
                    } else {
                        inputString.push(
                            labelofInput.dataset.gaVerderMet.trim()
                        );
                    }
                    console.log(getTheVervolgToHide);
                    getTheVervolgToHide.forEach((vervolgToHide) => {
                        if (inputString.includes(vervolgToHide)) {
                            const element = document.querySelector(
                                `.${vervolgToHide}`
                            );
                            element.style.display = "block";
                            const allInputsInElement =
                                element.querySelectorAll("input");
                            allInputsInElement.forEach((input) => {
                                input.setAttribute("required", "");
                                addLocalStorageRequired(input);
                            });
                        } else {
                            const element = document.querySelector(
                                `.${vervolgToHide}`
                            );
                            element.style.display = "none";
                            const allInputsInElement =
                                element.querySelectorAll("input");

                            allInputsInElement.forEach((input) => {
                                input.removeAttribute("required", "");
                                if (
                                    input.type === "radio" ||
                                    input.type === "checkbox"
                                ) {
                                    input.checked = false;
                                } else {
                                    input.value = "";
                                }
                                fillDupliInputs(input);
                                removeLocalStorage(input);
                            });
                        }
                    });
                });
            }
        }
        // if normal input label has a vervolg
        else {
            // if label has a vervolg
            if (labelofInput.dataset.gaVerderMet) {
                const parentOfLabel = labelofInput.parentElement;
                const dataset = labelofInput.dataset.gaVerderMet;
                const theShowInput = labelofInput.querySelector(`input`);
                const otherInput = parentOfLabel.querySelector(
                    `label:not([data-ga-verder-met="${dataset}"]) input`
                );
                // The other input to open the vervolg
                theShowInput.addEventListener("click", () => {
                    let inputString = [];
                    if (labelofInput.dataset.gaVerderMet.includes(",")) {
                        inputString = labelofInput.dataset.gaVerderMet
                            .split(",")
                            .map((inputString) => inputString.trim());
                    } else {
                        inputString.push(
                            labelofInput.dataset.gaVerderMet.trim()
                        );
                    }
                    inputString.forEach((string) => {
                        const element = document.querySelector(`.${string}`);
                        element.style.display = "block";
                        const allInputsInElement =
                            element.querySelectorAll("input");
                        allInputsInElement.forEach((input) => {
                            input.setAttribute("required", "");
                        });
                    });
                });
                // The other input to close the vervolg
                otherInput.addEventListener("click", () => {
                    let inputString = [];
                    if (labelofInput.dataset.gaVerderMet.includes(",")) {
                        inputString = labelofInput.dataset.gaVerderMet
                            .split(",")
                            .map((inputString) => inputString.trim());
                    } else {
                        inputString.push(
                            labelofInput.dataset.gaVerderMet.trim()
                        );
                    }
                    inputString.forEach((string) => {
                        const element = document.querySelector(`.${string}`);
                        element.style.display = "none";

                        const otherVervolgElements =
                            element.querySelectorAll(".vervolg");
                        otherVervolgElements.forEach((otherElement) => {
                            otherElement.style.display = "none";
                        });
                        // function
                        const allInputsInElement =
                            element.querySelectorAll("input");

                        allInputsInElement.forEach((input) => {
                            input.removeAttribute("required", "");
                            if (
                                input.type === "radio" ||
                                input.type === "checkbox"
                            ) {
                                input.checked = false;
                            } else {
                                input.value = "";
                            }
                            fillDupliInputs(input);
                            removeLocalStorage(input);
                        });
                        // end of function
                    });
                });
            }
        }
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
                linkMatchedSection.style.background = "rgb(255, 123, 0)";
                // TODO Classes?
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