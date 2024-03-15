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

// TODO explanations
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
        // if label has a vervolg
        if (labelofInput.dataset.gaVerderMet) {
            const parentOfLabel = labelofInput.parentElement;
            const dataset = labelofInput.dataset.gaVerderMet;
            const theShowInput = labelofInput.querySelector(`input`);
            const otherInputs = parentOfLabel.querySelectorAll(
                `label:not([data-ga-verder-met="${dataset}"]) input`
            );
            let getTheVervolgToHide;
            // Geen click op, wel opslaan data-ga-verder-met en als er 1 voorkomt die niet voorkomt in de main input, niet laten zien.
            // The other input to close the vervolg
            otherInputs.forEach((otherInput) => {
                // otherInput.addEventListener("click", () => {
                let inputString = [];
                if (labelofInput.dataset.gaVerderMet.includes(",")) {
                    inputString = labelofInput.dataset.gaVerderMet
                        .split(",")
                        .map((inputString) => inputString.trim());
                } else {
                    inputString.push(labelofInput.dataset.gaVerderMet.trim());
                }
                // inputString.forEach((string) => {
                //     console.log(string, "other input");
                //     // const element = document.querySelector(`.${string}`);
                //     // element.style.display = "none";

                //     const otherVervolgElements =
                //         element.querySelectorAll(".vervolg");
                //     otherVervolgElements.forEach((otherElement) => {
                //         otherElement.style.display = "none";
                //     });
                //     // function
                //     const allInputsInElement =
                //         element.querySelectorAll("input");

                //     allInputsInElement.forEach((input) => {
                //         input.removeAttribute("required", "");
                //         if (
                //             input.type === "radio" ||
                //             input.type === "checkbox"
                //         ) {
                //             input.checked = false;
                //         } else {
                //             input.value = "";
                //         }
                //         // fillDupliInputs(input);
                //         // removeLocalStorage(input);
                //     });
                //     // end of function
                //     // });
                // });
            });
            // The other input to open the vervolg
            theShowInput.addEventListener("click", () => {
                let inputString = [];
                if (labelofInput.dataset.gaVerderMet.includes(",")) {
                    inputString = labelofInput.dataset.gaVerderMet
                        .split(",")
                        .map((inputString) => inputString.trim());
                } else {
                    inputString.push(labelofInput.dataset.gaVerderMet.trim());
                }
                inputString.forEach((string) => {
                    console.log(string, "main input");
                    const element = document.querySelector(`.${string}`);
                    element.style.display = "block";
                    const allInputsInElement =
                        element.querySelectorAll("input");
                    allInputsInElement.forEach((input) => {
                        input.setAttribute("required", "");
                        addLocalStorageRequired(input);
                    });
                });
            });
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






      //  remove all required from inputs
                    // } else {
                    // element.style.display = "none";
                    // console.log(element, "none");
                    // }

                    // element.style.display = "none";
                    // get the elements
                    // let label = document.querySelector(
                    //     `label[data-ga-verder-met=${string}]`
                    // );
                    // const input = label.querySelector("input");
                    // const fieldset = label.parentElement;
                    // const inputToHideVervolg = fieldset.querySelector(
                    //     `label:not([data-ga-verder-met=${string}])`
                    // );
                    // hide
                    // inputToHideVervolg.addEventListener("click", () => {
                    //     const vervolg = document.querySelector(`.${string}`);
                    //     vervolg.style.display = "none";
                    //     // TODO remove all required from inputs
                    // });
                    // show
                    // input.addEventListener("click", () => {
                    //     const vervolg = document.querySelector(`.${string}`);
                    //     vervolg.style.display = "block";
                    //     // Add remove all required from inputs
                    // });
                    




                    // eventlistener op de input
            // als die geklikt wordt split het

            // let inputString = [];

            // // Split the vervolg if possible and plce it in the array
            // if (labelofInput.dataset.gaVerderMet.includes(",")) {
            //     inputString = labelofInput.dataset.gaVerderMet
            //         .split(",")
            //         .map((inputString) => inputString.trim());
            // } else {
            //     inputString.push(labelofInput.dataset.gaVerderMet.trim());
            // }
            // console.log(inputString);
            // // For every vervolg
            // inputString.forEach((string) => {
            //     const element = document.querySelector(`.${string}`);
            //     element.style.display = "none";
            //     // get the elements
            //     let label = document.querySelector(
            //         `label[data-ga-verder-met=${string}]`
            //     );
            //     const input = label.querySelector("input");
            //     const fieldset = label.parentElement;
            //     const inputToHideVervolg = fieldset.querySelector(
            //         `label:not([data-ga-verder-met=${string}])`
            //     );
            //     // hide
            //     inputToHideVervolg.addEventListener("click", () => {
            //         const vervolg = document.querySelector(`.${string}`);
            //         vervolg.style.display = "none";
            //         // TODO remove all required from inputs
            //     });
            //     // show
            //     input.addEventListener("click", () => {
            //         const vervolg = document.querySelector(`.${string}`);
            //         vervolg.style.display = "block";
            //         // Add remove all required from inputs
            //     });
            // });


            // inputsWithVervolg.forEach((inputString) => {
    //     const element = document.querySelector(`.${inputString}`);
    //     element.style.display = "none";
    //     // get the elements
    //     let label = document.querySelector(
    //         `label[data-ga-verder-met=${inputString}]`
    //     );
    //     if (!label) {
    //         label = document.querySelector(
    //             `label[data-ga-ook-verder-met=${inputString}]`
    //         );
    //     }
    //     const input = label.querySelector("input");
    //     const fieldset = label.parentElement;
    //     const inputToHideVervolg = fieldset.querySelector(
    //         `label:not([data-ga-verder-met=${inputString}])`
    //     );
    //     // hide
    //     inputToHideVervolg.addEventListener("click", () => {
    //         const vervolg = document.querySelector(`.${inputString}`);
    //         vervolg.style.display = "none";
    //     });
    //     // show
    //     input.addEventListener("click", () => {
    //         const vervolg = document.querySelector(`.${inputString}`);
    //         vervolg.style.display = "block";
    //     });
    // });