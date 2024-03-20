// Inputs that get changed
const elements = document.querySelectorAll(`input`);
elements.forEach((element) => {
    element.addEventListener("blur", () => {
        fillDupliInputs(element);
        disableInputs(element);
        // TODO kijken naar andere files waar dit ook staat en centeren in script.js?
    });
});

// TODO misschien de nummers uit deze velden opslaan en als autocomplete meegeven ipv al invullen?
/**
 * Fill in input that are multiple times asked in the form.
 * @param {Element} element - the element that is changed
 */
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

/**
 * Disable the other fields when one is filled in
 * @param {Element} element - The element in a possible "disable-the-rest" div.
 */
function disableInputs(element) {
    const label = element.parentElement;
    const div = label.parentElement;
    const classInput = element.classList[0];
    if (div.classList[1] === "disable-the-rest" && element.disabled === false) {
        const disabledInputs = div.querySelectorAll(`input:not(.${classInput})`);
        disabledInputs.forEach((input) => {
            if (element.value !== "") {
                input.disabled = true;
                input.value = "";
                input.innerHTML = "";
                const labelInput = input.parentElement;
                labelInput.setAttribute("class", "labelWithInput");
                input.removeAttribute("required", "");
            } else {
                input.disabled = false;
                input.setAttribute("required", "");
            }
        });
    }
}

/**
 * Get all the landcode sections and check if the landcode needs to visible or not.
 */
function fireFillInLandcode() {
    const landcodeSections = document.querySelectorAll(".autoFillInLandcodeNL");
    landcodeSections.forEach((landcodeSection) => {
        const landcodeCheckBoxInput = landcodeSection.querySelector("label:nth-of-type(1) input");
        const landcodeCheckBox = landcodeCheckBoxInput.parentElement;
        const landcodeInput = landcodeSection.querySelector("label:nth-of-type(2) input");
        const landcodeLabel = landcodeInput.parentElement;
        fillInLandcode(landcodeCheckBoxInput, landcodeInput, landcodeLabel);
        landcodeCheckBox.style.display = "inline";
        landcodeCheckBoxInput.addEventListener("click", () => {
            fillInLandcode(landcodeCheckBoxInput, landcodeInput, landcodeLabel);
        });
    });
}
fireFillInLandcode();

/**
 * Display the input field of the landcode or not
 * @param {Element} landcodeCheckBoxInput - A checkbox input element
 * @param {Element} landcodeInput - The landcode input element
 * @param {Element} landcodeLabel - The label of that input
 */
function fillInLandcode(landcodeCheckBoxInput, landcodeInput, landcodeLabel) {
    if (landcodeCheckBoxInput.checked) {
        landcodeInput.required = false;
        landcodeInput.value = ""; // need to be in generic function
        landcodeLabel.style.display = "none";
    } else {
        landcodeInput.required = true;
        landcodeInput.value = ""; // need to be in generic function
        landcodeLabel.style.display = "grid";
    }
}

/**
 * Set the details that has an input from the local storage open
 * @param {Element} inputFromLocalStorage - Input that has a local storage
 */
function checkDetailsOpen(inputFromLocalStorage) {
    const details = document.querySelectorAll("details");
    details.forEach((detail) => {
        const inputs = detail.querySelectorAll("input");
        inputs.forEach((input) => {
            if (inputFromLocalStorage === input) {
                detail.setAttribute("open", "");
                setReqOnDetails(detail);
            }
        });
    });
}

/**
 * Check when reloading the page if a detail is open or not, en set required on the inputs or not
 */
const details = document.querySelectorAll("details");
details.forEach((detail) => {
    detail.addEventListener("click", () => {
        // checkIfDetailsOpen(detail)
        const getAllInputs = detail.querySelectorAll("input");
        getAllInputs.forEach((input) => {
            if (!detail.open) {
                input.setAttribute("required", "");
            } else {
                input.removeAttribute("required", "");
            }
        });
    });
    setReqOnDetails(detail);
});

/**
 * set required on the inputs that are open, and remove them when the details is closed. 
 * @param {Element} detail - detail element
 */
function setReqOnDetails(detail) {
    const getAllInputs = detail.querySelectorAll("input");
    getAllInputs.forEach((input) => {
        if (detail.open) {
            input.setAttribute("required", "");
        } else {
            input.removeAttribute("required", "");
        }
    });
}