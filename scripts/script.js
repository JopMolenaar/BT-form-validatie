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

// TODO scriptje om error message te showen als progressive enhancement voor als :has() niet werkt

// TODO scriptje om de links een kleur te geven als een fieldset invalid is of valid is of een error heeft

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

