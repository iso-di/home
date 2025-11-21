// Unified Oche Calculation Logic
const bankPercentages = {
    mono: { 3: 3.1, 6: 8, 10: 13.7, 12: 16.9, 15: 21.6, 18: 26.5 },
    privat: { 3: 1.8, 6: 7.7, 10: 15.6, 12: 16.6, 15: 21.6, 18: 26.6 },
    abank: { 3: 3.4, 6: 7.8, 10: 12.5, 12: 14.8, 15: 17.9, 18: 21.5 }
};

let currentBank = null;
let currentMonth = null;

window.selectBank = function (bank) {
    console.log("Selected bank:", bank);
    currentBank = bank;
    document.querySelectorAll('.bank-card').forEach(card => {
        card.classList.toggle('active', card.dataset.bank === bank);
    });
    updateCalculation();
}

window.selectMonth = function (month) {
    console.log("Selected month:", month);
    currentMonth = month;
    document.querySelectorAll('.month-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.textContent, 10) === month);
    });
    updateCalculation();
}

window.updateCalculation = function () {
    const inputElement = document.getElementById('unifiedInput');
    if (!inputElement) return;

    const inputVal = parseFloat(inputElement.value);
    const result1C = document.getElementById('unifiedResult1C');
    const resultMonth = document.getElementById('unifiedResultMonth');

    console.log("Update Calc:", { inputVal, currentBank, currentMonth });

    if (!inputVal || isNaN(inputVal) || inputVal <= 0) {
        if (result1C) result1C.textContent = '0.00 ₴';
        if (resultMonth) resultMonth.textContent = '0.00 ₴';
        return;
    }

    if (!currentBank || !currentMonth) {
        return;
    }

    const percentage = bankPercentages[currentBank][currentMonth];
    if (percentage === undefined) return;

    const total = inputVal + (inputVal * (percentage / 100));
    const monthly = total / currentMonth;

    if (result1C) result1C.textContent = `${total.toFixed(2)} ₴`;
    if (resultMonth) resultMonth.textContent = `${monthly.toFixed(2)} ₴`;
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded - Initializing Calculator");
    const input = document.getElementById('unifiedInput');
    if (input) {
        input.addEventListener('input', updateCalculation);
        console.log("Input listener attached");
    } else {
        console.error("unifiedInput not found!");
    }
});
