// Function for validating BSN numbers
// This does not mean it is an existing BSN, only that it is a possible BSN

function isPossibleBsn(bsn) {
    // Make an array from BSN chars
    const bsnChars = bsn.split("");

    // Add a zero if it is not 9 chars
    if (bsnChars.length < 9) {
        bsnChars.unshift(0);
    }

    // Multiply all chars by their inverse index
    const charsMultiplied = bsnChars.map((ch, index) => ch * (9 - index));

    // Add all the chars, but subtract last char
    let charsAdded = 0;

    charsMultiplied.forEach((ch, index) => {
        if (index === 8) {
            charsAdded -= ch;
        } else {
            charsAdded += ch;
        }
    });

    //Check if divisible by 11
    const elevenCheck = charsAdded % 11;

    if (elevenCheck === 0) {
        return true;
    } else {
        return false;
    }
}
// Source for validation: https://nl.wikipedia.org/wiki/Burgerservicenummer#11-proef

const allBsnNumbers = document.querySelectorAll(`input[data-bsn="true"]`);
allBsnNumbers.forEach((bsnNumberInput) => {
    bsnNumberInput.addEventListener("blur", () => {
        checkBsnAndShowError(bsnNumberInput);
    });
});

function checkBsnAndShowError(bsnNumberInput) {
    if (bsnNumberInput.dataset.bsn) {
        const showErrorMessage = isPossibleBsn(bsnNumberInput.value);
        const label = bsnNumberInput.parentElement;
        if (showErrorMessage) {
            console.log(showErrorMessage, "is a bsn");
            label.classList.remove("showErrorMessage");
        } else {
            console.log(showErrorMessage, "not a bsn");
            label.classList.add("showErrorMessage");
        }
    }
}