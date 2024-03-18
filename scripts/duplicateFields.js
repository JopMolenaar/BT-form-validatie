const duplicateSections = ["verkijger-velden-geen-aangifte"];
// TODO zonder lijst doen

function duplicateFields() {
    duplicateSections.forEach((sectionString) => {
        const section = document.querySelector(`.${sectionString}`);
        const placeToPutIt = section.parentElement;
        const removeLinkInThisSection = placeToPutIt.parentElement;
        const verkrijgerveldenLink = removeLinkInThisSection.querySelector("a");
        verkrijgerveldenLink.style.display = "none";
        const buttons = document.querySelectorAll(
            `[data-duplicate=${sectionString}] button`
        );
        buttons.forEach((button) => {
            const span = button.querySelector("span");
            span.style.display = "none";
            button.addEventListener("click", () => {
                if (button.classList.contains("add")) {
                    // Duplicate the section and append it to placeToPutIt
                    const clonedSection = section.cloneNode(true); // true for deep cloning including child nodes
                    const paragraph = clonedSection.querySelector("p");
                    paragraph.textContent = `Verkrijger ${
                        placeToPutIt.childElementCount + 1
                    }`;
                    const allInputs = clonedSection.querySelectorAll("input");
                    allInputs.forEach((input) => {
                        // input.name = "" default = something-verkrijger-1 the last numer needs to be changed
                        const parts = input.name.split("-");
                        parts[parts.length - 1] = (
                            placeToPutIt.childElementCount + 1
                        ).toString();
                        input.name = parts.join("-");
                        if (
                            input.type === "radio" ||
                            input.type === "checkbox"
                        ) {
                            input.checked = false;
                        } else {
                            input.value = "";
                        }
                    });
                    placeToPutIt.appendChild(clonedSection);
                } else {
                    // Delete the last child in the placeToPutIt
                    const lastChild = placeToPutIt.lastElementChild;
                    if (lastChild !== section) {
                        placeToPutIt.removeChild(lastChild);
                    }
                }
            });
        });
    });
}

duplicateFields();
