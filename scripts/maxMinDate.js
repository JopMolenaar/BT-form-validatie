// scriptje zodat de datum in de toekomst bij datum velden niet gekozen kan worden
const inputDisabledFuture = [
    "input[name=overlijdensdatum-overledene]",
    "input[name=datum-testament]",
    "input[name=datum-partnerschapsvoorwaarden]",
];
// TODO geen lijstje
// TODO min date
inputDisabledFuture.forEach((input) => {
    const dynInput = document.querySelector(input);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    // Set the max attribute of the date input to today's date
    dynInput.max = today;
});
