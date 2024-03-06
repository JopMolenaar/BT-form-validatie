const rootStyles = getComputedStyle(document.documentElement);
const supportsSelectorWhere =
    rootStyles.getPropertyValue("--supports-selector-has").trim() == "1";

console.log(
    "falback js function when :has() isn's supported runs = ",
    !supportsSelectorWhere
); // boolean -> true if supported
if (!supportsSelectorWhere) {
    displayFollowUpQuestion();
}

function displayFollowUpQuestion() {
    console.log("displayFollowUpQuestion");
}

// TODO scriptje om dingen te showen als progressive enhancement voor als :has() niet werkt
