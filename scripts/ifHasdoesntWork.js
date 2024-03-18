const rootStyles = getComputedStyle(document.documentElement);
const supportsSelectorHas =
    rootStyles.getPropertyValue("--supports-selector-has").trim() == "1";

console.log("falback js function when :has() isn't supported runs = ", !supportsSelectorHas); // boolean -> true if supported

displayFollowUpQuestion();
colorLinkNav();
displayErrorMessage();
runFunctionWhenTargeted();

/**
 * Display the follow up question. If this function works, it removes all the spans with instruction with where to go next.
 * After that it will get all the inputs en will look if the fieldset has an advanced class or not.
 * If not: it checks if the the label has an data attribute with an follow up question.
 * It also gets the other input to hide the other question .
 *
 * If yes: it gets the dataset of the label with all the next-ups that need to be showed and compares it to the other datasets.
 * If there is an next-up missing, it means that that one is not needed to be showed.
 */
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
        // multiple choices with possible multiple vervolgs on one choice. Not only yes and no.
        // Note that every option needs to have a dataset with the vervolg.
        if (fieldset.classList.contains("displayVervolgsAdvanced")) {
            if (labelofInput.dataset.gaVerderMet) {
                const parentOfLabel = labelofInput.parentElement;
                const dataset = labelofInput.dataset.gaVerderMet;
                const theShowInput = labelofInput.querySelector(`input`);
                // The other input to open the vervolg
                theShowInput.addEventListener("click", () => {
                    let getTheVervolgToHide = [];
                    const otherInputs = parentOfLabel.querySelectorAll(`label:not([data-ga-verder-met="${dataset}"]) input`);

                    otherInputs.forEach((otherInput) => {
                        const labelofOtherInput = otherInput.parentElement;
                        let inputString = [];
                        if (labelofOtherInput.dataset.gaVerderMet) {
                            if (labelofOtherInput.dataset.gaVerderMet.includes(",")) {
                                inputString = labelofOtherInput.dataset.gaVerderMet.split(",").map((inputString) => inputString.trim());
                            } else {
                                inputString.push(labelofOtherInput.dataset.gaVerderMet.trim());
                            }
                            inputString.forEach((string) => {
                                getTheVervolgToHide.push(string);
                            });
                        }
                    });

                    let inputString = [];
                    if (labelofInput.dataset.gaVerderMet.includes(",")) {
                        inputString = labelofInput.dataset.gaVerderMet.split(",").map((inputString) => inputString.trim());
                    } else {
                        inputString.push(labelofInput.dataset.gaVerderMet.trim());
                    }
                    getTheVervolgToHide.forEach((vervolgToHide) => {
                        if (inputString.includes(vervolgToHide)) {
                            const element = document.querySelector(`.${vervolgToHide}`);
                            element.style.display = "block";
                            const allInputsInElement = element.querySelectorAll("input");
                            allInputsInElement.forEach((input) => {
                                input.setAttribute("required", "");
                                addLocalStorageRequired(input);
                            });
                        } else {
                            const element = document.querySelector(`.${vervolgToHide}`);
                            element.style.display = "none";
                            const allInputsInElement = element.querySelectorAll("input");

                            allInputsInElement.forEach((input) => {
                                input.removeAttribute("required", "");
                                if (input.type === "radio" || input.type === "checkbox") {
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
                const otherInput = parentOfLabel.querySelector(`label:not([data-ga-verder-met="${dataset}"]) input`);
                // The other input to open the vervolg
                theShowInput.addEventListener("click", () => {
                    let inputString = [];
                    if (labelofInput.dataset.gaVerderMet.includes(",")) {
                        inputString = labelofInput.dataset.gaVerderMet.split(",").map((inputString) => inputString.trim());
                    } else {
                        inputString.push(labelofInput.dataset.gaVerderMet.trim());
                    }
                    inputString.forEach((string) => {
                        const element = document.querySelector(`.${string}`);
                        element.style.display = "block";
                        const allInputsInElement = element.querySelectorAll("input");
                        allInputsInElement.forEach((input) => {
                            input.setAttribute("required", "");
                        });
                    });
                });
                // The other input to close the vervolg
                otherInput.addEventListener("click", () => {
                    let inputString = [];
                    if (labelofInput.dataset.gaVerderMet.includes(",")) {
                        inputString = labelofInput.dataset.gaVerderMet.split(",").map((inputString) => inputString.trim());
                    } else {
                        inputString.push(labelofInput.dataset.gaVerderMet.trim());
                    }
                    inputString.forEach((string) => {
                        const element = document.querySelector(`.${string}`);
                        element.style.display = "none";

                        const otherVervolgElements = element.querySelectorAll(".vervolg");
                        otherVervolgElements.forEach((otherElement) => {
                            otherElement.style.display = "none";
                        });
                        // function
                        const allInputsInElement = element.querySelectorAll("input");

                        allInputsInElement.forEach((input) => {
                            input.removeAttribute("required", "");
                            if (input.type === "radio" || input.type === "checkbox") {
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
        // TODO laatste stukje in aparte function en mss wel meer
    });
}

// TODO fire all on refresh
/**
 * Check if the sections if the linked link has valid or invalid inputs and give a color to that link.
 * @param {Element} link - Is the element that has a link of a certain section that needs to be validated
 */
function checkIfSectionsAreValid(link) {
    let hashAndNext = getTheHash(link);
    const everySection = document.querySelectorAll("main form section");
    everySection.forEach((section) => {
        if ("#" + section.id === hashAndNext) {
            const inputError = section.querySelector("fieldset label input:user-invalid:not(:focus)");
            const validInputs = section.querySelectorAll("fieldset label input:required:valid");
            const allInputs = section.querySelectorAll("fieldset input:required");
            if (inputError && inputError.value !== "") {
                link.setAttribute("class", "");
                link.classList.add("error-color-link");
            } else if (validInputs.length >= allInputs.length && validInputs.value !== "") {
                link.setAttribute("class", "");
                link.classList.add("valid-color-link");
            } else {
                link.setAttribute("class", "");
                link.classList.add("default-color-link");
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
                const invalidInput = label.querySelector("input:user-invalid:not(:focus)");
                if (invalidInput && invalidInput.value !== "") {
                    label.classList.add("showErrorMessage");
                } else {
                    label.classList.remove("showErrorMessage");
                }
            });
        });
    });
}

/**
 * Give the active color on the link that has the href to the incoming id (string). After that, validate the other links. 
 * @param {String} sectionId - A string that has the id of a section
 */
function colorLinkNav(sectionId) {
    if (sectionId === undefined) {
        sectionId = window.location.hash;
    }
    const everySection = document.querySelectorAll("main form section");
    everySection.forEach((section) => {
        const linkMatchedSection = document.querySelector(`main nav a[href='#${section.id}']`);
        if (sectionId === "#" + section.id && sectionId !== "") {
            document.querySelector(".startFormLink").style.display = "none";
            linkMatchedSection.setAttribute("class", "");
            linkMatchedSection.classList.add("active-color-link");
            const theOtherLinks = document.querySelectorAll(`main nav a:not([href='#${section.id}'])`);
            theOtherLinks.forEach((link) => {
                // check if section with the fieldsets are valid
                checkIfSectionsAreValid(link);
            });
        }
    });
}

// Run the functions above when a section is target
function runFunctionWhenTargeted() {
    const directionButtons = document.querySelectorAll("main form > section > div > a");
    directionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let hashAndNext = getTheHash(button);
            colorLinkNav(hashAndNext);
        });
    });
    const directionNavLinks = document.querySelectorAll("main nav a");
    directionNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            let hashAndNext = getTheHash(link);
            colorLinkNav(hashAndNext);
        });
    });
    const startButton = document.querySelector(".startFormLink a");
    startButton.addEventListener("click", () => {
        let hashAndNext = getTheHash(startButton);
        colorLinkNav(hashAndNext);
    });
    const logo = document.querySelector("header div a");
    logo.addEventListener("click", () => {
        const start = document.querySelector("main div:nth-of-type(1)");
        start.style.display = "flex";
    });
}
function getTheHash(link) {
    let currentUrl = link.href;
    let hashIndex = currentUrl.indexOf("#");
    let hashAndNext = currentUrl.substring(hashIndex);
    return hashAndNext;
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

function giveLabelsClass(input) {
    const parent = input.parentElement;
    parent.classList.add("labelWithInput");
}