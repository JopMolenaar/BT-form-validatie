const rootStyles = getComputedStyle(document.documentElement);
const supportsSelectorWhere =
    rootStyles.getPropertyValue("--supports-selector-has").trim() == "1";

const hideTheseElements = [
    ".vervolg-1b",
    ".vervolg-1b-2",
    ".vervolg-1c",
    ".vervolg-1c-2",
    ".vervolg-1d",
    "label > span",
];
const inputsWithVervolg = [
    "vervolg-1b",
    "vervolg-1b-2",
    "vervolg-1c",
    "vervolg-1c-2",
    "vervolg-1d",
];

console.log(
    "falback js function when :has() isn's supported runs = ",
    !supportsSelectorWhere
); // boolean -> true if supported

if (supportsSelectorWhere) {
    displayFollowUpQuestion();
}

// scriptje om dingen te showen op bepaalde clicks als progressive enhancement voor als :has() niet werkt
function displayFollowUpQuestion() {
    console.log("displayFollowUpQuestion");
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
        const label = document.querySelector(
            `label[data-ga-verder-met=${inputString}]`
        );
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

// function showErrorMessage() {
//     const everyInput = document.querySelectorAll(
//         "main form section fieldset label input"
//     );
//     everyInput.forEach((input) => {
//         input.addEventListener("blur", () => {
//             const label = input.parentElement;
//             const invalidInput = label.querySelector(
//                 "input:user-invalid:not(:focus):not(:placeholder-shown)"
//             );
//             if (invalidInput) {
//                 label.classList.add("showErrorMessage");
//             }
//         });
//     });
// }
// showErrorMessage();

// scriptje om error message te showen als progressive enhancement voor als :has() niet werkt
// scriptje om de links een kleur te geven als een fieldset invalid is of valid is of een error heeft

function colorLinkNav(sectionId) {
    if(sectionId === undefined){
        sectionId = window.location.hash;
    }
    const everySection = document.querySelectorAll("main form section");
    everySection.forEach((section) => {
        const linkMatchedSection = document.querySelector(
            `main nav a[href='#${section.id}']`
        );
        if(sectionId === '#' + section.id){
            linkMatchedSection.style.background = "blue";
            const theOtherLinks = document.querySelectorAll(
                `main nav a:not([href='#${section.id}'])`
            );
            theOtherLinks.forEach((link)=>{
                // TODO check if section with the fieldsets are valid
                checkIfSectionsAreValid(link)
            })
        } 
    
    });
}
colorLinkNav();

function checkIfSectionsAreValid(link) {
    let currentUrl = link.href;
    let hashIndex = currentUrl.indexOf("#");
    let hashAndNext = currentUrl.substring(hashIndex);
    const everySection = document.querySelectorAll("main form section");
    everySection.forEach((section) => {
        if ("#" + section.id === hashAndNext) {
            const inputError = section.querySelector(
                "fieldset label input:user-invalid:not(:focus):not(:placeholder-shown)"
            );
            const validInputs = section.querySelectorAll(
                "fieldset label input:required:valid:not(:placeholder-shown)"
            );
            const allInputs = section.querySelectorAll(
                "fieldset input:required"
            );
            const linkMatchedSection = document.querySelector(
                `main nav a[href='#${section.id}']`
            );
            if (inputError) {
                linkMatchedSection.style.background = "red";
            } else if (validInputs.length >= allInputs.length) {
                linkMatchedSection.style.background = "green";
            } else {
                linkMatchedSection.style.background = "#8fcae7";
            }
        }
    });
}


function displayErrorMessage() {
    const everySection = document.querySelectorAll("main form section");
    everySection.forEach((section) => {
        const everyInput = section.querySelectorAll("fieldset label input");
        everyInput.forEach((input) => {
            input.addEventListener("blur", () => {
                const label = input.parentElement;
                const invalidInput = label.querySelector(
                    "input:user-invalid:not(:focus):not(:placeholder-shown)"
                );
                if (invalidInput) {
                    label.classList.add("showErrorMessage");
                } else {
                    label.classList.remove("showErrorMessage");
                }
            });
        });
    });
}
displayErrorMessage(); 

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
// scriptje zodat de datum in de toekomst bij datum velden niet gekozen kan worden
const inputDisabledFutures = [
    "input[name=overlijdensdatum-overledene]",
    "input[name=datum-testament]",
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

