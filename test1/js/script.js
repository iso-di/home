/**
 * Main Application Script
 * Handles navigation, calculator logic, and dynamic content rendering.
 */

document.addEventListener("DOMContentLoaded", () => {
    initializeCalculators();
    initializeRemontTable();
    // initializeNavigation(); // Removed as it's not defined

    // Initial view
    filterByCategory('tradein');
    // Service Worker Registration
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js")
            .then(() => console.log("✅ Service Worker Registered"))
            .catch(err => console.error("❌ Service Worker Error:", err));
    }
});

/* =========================================
   Navigation & UI Logic
   ========================================= */

/**
 * Toggles the visibility of sub-models in the Trade-In section.
 * @param {HTMLElement} seriesElement - The clicked series header element.
 */
/**
 * Toggles the visibility of sub-models in the Trade-In section.
 * @param {HTMLElement} seriesElement - The clicked series header element.
 */

window.toggleSubModels = function (seriesElement) {
    const subModels = seriesElement.nextElementSibling;

    // Close all other sub-models
    document.querySelectorAll(".sub-models").forEach(sm => {
        if (sm !== subModels) {
            sm.style.display = "none";
            if (sm.previousElementSibling) sm.previousElementSibling.classList.remove('expanded');
        }
    });

    // Toggle current
    const isHidden = subModels.style.display !== "block";
    subModels.style.display = isHidden ? "block" : "none";

    if (isHidden) {
        seriesElement.classList.add('expanded');
        // Reset inner details to closed state
        subModels.querySelectorAll('.details').forEach(d => d.style.display = 'none');
        subModels.querySelectorAll('.model').forEach(m => m.classList.remove('expanded'));
    } else {
        seriesElement.classList.remove('expanded');
    }
};

/**
 * Toggles the visibility of details for a specific model.
 * @param {HTMLElement} modelElement - The clicked model header element.
 */
window.toggleDetails = function (modelElement) {
    const details = modelElement.nextElementSibling;

    // Close all other details in the same list
    const parent = modelElement.parentElement;
    parent.querySelectorAll(".details").forEach(d => {
        if (d !== details) {
            d.style.display = "none";
            if (d.previousElementSibling) d.previousElementSibling.classList.remove('expanded');
        }
    });

    // Toggle current
    const isHidden = details.style.display !== "block";
    details.style.display = isHidden ? "block" : "none";

    if (isHidden) {
        modelElement.classList.add('expanded');
    } else {
        modelElement.classList.remove('expanded');
    }
};


/**
 * Filters the main content by category.
 * @param {string} category - The category ID to show.
 */
window.filterByCategory = function (category) {
    const sections = [
        'tradein', 'airpods', 'oplatabank',
        'iphone_check', 'pencil', 'remont'
    ];

    // Hide all sections
    sections.forEach(id => {
        const el = document.getElementById(id === 'oplatabank' ? 'oplatabank' : id); // Handle ID mismatch if any
        if (document.getElementById(id)) {
            document.getElementById(id).style.display = 'none';
        }
    });

    // Show selected section
    const selected = document.getElementById(category === 'och' ? 'oplatabank' : category);
    if (selected) selected.style.display = 'block';

    // Special handling for Trade-In categories
    if (category === 'tradein') {
        const tradeInContainer = document.getElementById('tradein');
        if (tradeInContainer) tradeInContainer.style.display = 'block';

        document.querySelectorAll('.series').forEach(series => {
            // Show all series by default or filter if needed
            series.style.display = 'flex';
        });
    }

    // Close the menu after selection
    const navOverlay = document.querySelector('.nav-overlay');
    if (navOverlay) navOverlay.classList.remove('expanded');

    // Update active state in bottom nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(category)) {
            item.classList.add('active');
        }
    });
};

/* =========================================
   Calculator Logic
   ========================================= */

function initializeCalculators() {
    const configs = [
        {
            inputId: "inputX",
            buttonSelector: '.button-group button[data-months]',
            formulaId: "formula1",
            resultId: "result1",
            percentages: { 3: 3.1, 6: 8, 10: 13.7, 12: 16.9, 15: 21.6, 18: 26.5 }
        },
        {
            inputId: "inputY",
            buttonSelector: '.button-group button[data-months2]',
            formulaId: "formula2",
            resultId: "result2",
            percentages: { 3: 1.8, 6: 7.7, 10: 15.6, 12: 16.6, 15: 21.6, 18: 26.6 }
        },
        {
            inputId: "inputZ",
            buttonSelector: '.button-group button[data-months3]',
            formulaId: "formula3",
            resultId: "result3",
            percentages: { 3: 3.4, 6: 7.8, 10: 12.5, 12: 14.8, 15: 17.9, 18: 21.5 }
        }
    ];

    configs.forEach(config => setupCalculator(config));
}

function setupCalculator({ inputId, buttonSelector, formulaId, resultId, percentages }) {
    const inputEl = document.getElementById(inputId);
    if (!inputEl) return;

    const calculate = () => {
        const inputVal = parseFloat(inputEl.value);
        const activeBtn = document.querySelector(`${buttonSelector}.active`);

        if (!activeBtn || isNaN(inputVal)) {
            updateResult(formulaId, resultId, null);
            return;
        }

        const months = parseFloat(
            activeBtn.dataset.months ||
            activeBtn.dataset.months2 ||
            activeBtn.dataset.months3
        );

        if (months > 0) {
            const percent = percentages[months] || 0;
            const total = inputVal + (inputVal * (percent / 100));
            updateResult(formulaId, resultId, total, months);
        }
    };

    inputEl.addEventListener("input", calculate);

    document.querySelectorAll(buttonSelector).forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(buttonSelector).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            calculate();
        });
    });
}

function updateResult(formulaId, resultId, total, months) {
    const formulaEl = document.getElementById(formulaId);
    const resultEl = document.getElementById(resultId);

    if (total === null) {
        if (formulaEl) formulaEl.innerHTML = "–";
        if (resultEl) resultEl.textContent = "–";
    } else {
        if (formulaEl) formulaEl.innerHTML = `<span style="color: #5ac8fa; font-weight: 600;">Вартість по 1С:</span> <b>${total.toFixed(2)} ₴</b>`;
        if (resultEl) resultEl.textContent = `В місяць по: ${(total / months).toFixed(2)} ₴`;
    }
}

/* =========================================
   Repair (Remont) Logic
   ========================================= */

const serviceIcons = {
    'Заміна дисплею': '<i class="fas fa-mobile-alt" style="color:#007aff;"></i>',
    'Переклей скла дисплею': '<i class="fas fa-window-maximize" style="color:#00c853;"></i>',
    'Заміна аккумулятора': '<i class="fas fa-battery-full" style="color:#ffb300;"></i>',
    'Заміна заднього скла': '<i class="fas fa-square" style="color:#6c757d;"></i>',
    'Заміна корпусу': '<i class="fas fa-border-all" style="color:#8e24aa;"></i>'
};

const pricesRemont = {
    '16PM': [
        { service: 'Заміна дисплею', price: '20 300' },
        { service: 'Переклей скла дисплею', price: '10 000' },
        { service: 'Заміна аккумулятора', price: '5 000' },
        { service: 'Заміна заднього скла', price: '0 000' },
    ],
    '16P': [
        { service: 'Заміна дисплею', price: '19 000' },
        { service: 'Переклей скла дисплею', price: '10 000' },
        { service: 'Заміна аккумулятора', price: '5 000' },
        { service: 'Заміна заднього скла', price: '0 000' },
    ],
    '16plus': [
        { service: 'Заміна дисплею', price: '13 000' },
        { service: 'Переклей скла дисплею', price: '9 000' },
        { service: 'Заміна аккумулятора', price: '5 000' },
        { service: 'Заміна заднього скла', price: '0 000' },
    ],
    '16': [
        { service: 'Заміна дисплею', price: '13 000' },
        { service: 'Переклей скла дисплею', price: '8 000' },
        { service: 'Заміна аккумулятора', price: '4 500' },
        { service: 'Заміна заднього скла', price: '0 000' },
    ],
    '15PM': [
        { service: 'Заміна дисплею', price: '17 000' },
        { service: 'Переклей скла дисплею', price: '10 000' },
        { service: 'Заміна аккумулятора', price: '4 600' },
        { service: 'Заміна заднього скла', price: '5 000' },
    ],
    '15P': [
        { service: 'Заміна дисплею', price: '13 800' },
        { service: 'Переклей скла дисплею', price: '6 700' },
        { service: 'Заміна аккумулятора', price: '4 100' },
        { service: 'Заміна заднього скла', price: '4 800' },
    ],
    '15plus': [
        { service: 'Заміна дисплею', price: '10 500' },
        { service: 'Переклей скла дисплею', price: '6 500' },
        { service: 'Заміна аккумулятора', price: '4 000' },
        { service: 'Заміна заднього скла', price: '4 300' },
    ],
    '15': [
        { service: 'Заміна дисплею', price: '8 700' },
        { service: 'Переклей скла дисплею', price: '6 200' },
        { service: 'Заміна аккумулятора', price: '3 000' },
        { service: 'Заміна заднього скла', price: '4 100' },
    ],
    '14PM': [
        { service: 'Заміна дисплею', price: '15 500' },
        { service: 'Переклей скла дисплею', price: '7 000' },
        { service: 'Заміна аккумулятора', price: '4 300' },
        { service: 'Заміна заднього скла', price: '4 000' },
    ],
    '14P': [
        { service: 'Заміна дисплею', price: '16 500' },
        { service: 'Переклей скла дисплею', price: '5 500' },
        { service: 'Заміна аккумулятора', price: '3 500' },
        { service: 'Заміна заднього скла', price: '4 000' },
    ],
    '14plus': [
        { service: 'Заміна дисплею', price: '7 000' },
        { service: 'Переклей скла дисплею', price: '5 000' },
        { service: 'Заміна аккумулятора', price: '4 000' },
        { service: 'Заміна заднього скла', price: '3 000' },
    ],
    '14': [
        { service: 'Заміна дисплею', price: '7 000' },
        { service: 'Переклей скла дисплею', price: '5 500' },
        { service: 'Заміна аккумулятора', price: '3 500' },
        { service: 'Заміна заднього скла', price: '2 500' },
    ],
    '13PM': [
        { service: 'Заміна дисплею', price: '11 000' },
        { service: 'Переклей скла дисплею', price: '6 500' },
        { service: 'Заміна аккумулятора', price: '4 000' },
        { service: 'Заміна заднього скла', price: '3 500' },
    ],
    '13P': [
        { service: 'Заміна дисплею', price: '9 500' },
        { service: 'Переклей скла дисплею', price: '5 000' },
        { service: 'Заміна аккумулятора', price: '3 300' },
        { service: 'Заміна заднього скла', price: '2 500' },
    ],
    '13mini': [
        { service: 'Заміна дисплею', price: '6 000' },
        { service: 'Переклей скла дисплею', price: '4 000' },
        { service: 'Заміна аккумулятора', price: '3 000' },
        { service: 'Заміна заднього скла', price: '2 000' },
    ],
    '13': [
        { service: 'Заміна дисплею', price: '6 500' },
        { service: 'Переклей скла дисплею', price: '5 000' },
        { service: 'Заміна аккумулятора', price: '3 300' },
        { service: 'Заміна заднього скла', price: '2 500' },
    ],
    '12PM': [
        { service: 'Заміна дисплею', price: '7 500' },
        { service: 'Переклей скла дисплею', price: '5 000' },
        { service: 'Заміна аккумулятора', price: '3 000' },
        { service: 'Заміна заднього скла', price: '3 000' },
    ],
    '12P': [
        { service: 'Заміна дисплею', price: '6 000' },
        { service: 'Переклей скла дисплею', price: '4 000' },
        { service: 'Заміна аккумулятора', price: '2 600' },
        { service: 'Заміна заднього скла', price: '2 200' },
    ],
    '12mini': [
        { service: 'Заміна дисплею', price: '5 000' },
        { service: 'Переклей скла дисплею', price: '3 000' },
        { service: 'Заміна аккумулятора', price: '2 200' },
        { service: 'Заміна заднього скла', price: '2 000' },
    ],
    '12': [
        { service: 'Заміна дисплею', price: '6 000' },
        { service: 'Переклей скла дисплею', price: '4 000' },
        { service: 'Заміна аккумулятора', price: '2 600' },
        { service: 'Заміна заднього скла', price: '2 200' },
    ],
    '11PM': [
        { service: 'Заміна дисплею', price: '6 000' },
        { service: 'Переклей скла дисплею', price: '3 800' },
        { service: 'Заміна аккумулятора', price: '2 600' },
        { service: 'Заміна заднього скла', price: '2 500' },
    ],
    '11P': [
        { service: 'Заміна дисплею', price: '5 000' },
        { service: 'Переклей скла дисплею', price: '3 500' },
        { service: 'Заміна аккумулятора', price: '2 000' },
        { service: 'Заміна заднього скла', price: '2 300' },
    ],
    '11': [
        { service: 'Заміна дисплею', price: '4 500' },
        { service: 'Переклей скла дисплею', price: '2 500' },
        { service: 'Заміна аккумулятора', price: '2 000' },
        { service: 'Заміна заднього скла', price: '2 000' },
    ],
    'XSMAX': [
        { service: 'Заміна дисплею', price: '5 000' },
        { service: 'Переклей скла дисплею', price: '3 500' },
        { service: 'Заміна аккумулятора', price: '1 800' },
        { service: 'Заміна заднього скла', price: '1 600' },
    ],
    'XS': [
        { service: 'Заміна дисплею', price: '4 000' },
        { service: 'Переклей скла дисплею', price: '3 000' },
        { service: 'Заміна аккумулятора', price: '1 800' },
        { service: 'Заміна заднього скла', price: '1 600' },
    ],
    'X': [
        { service: 'Заміна дисплею', price: '4 000' },
        { service: 'Переклей скла дисплею', price: '2 500' },
        { service: 'Заміна аккумулятора', price: '1 800' },
        { service: 'Заміна заднього скла', price: '1 600' },
    ],
    'XR': [
        { service: 'Заміна дисплею', price: '4 000' },
        { service: 'Переклей скла дисплею', price: '2 500' },
        { service: 'Заміна аккумулятора', price: '1 800' },
        { service: 'Заміна заднього скла', price: '1 600' },
    ],
    'SE2': [
        { service: 'Заміна дисплею', price: '2 500' },
        { service: 'Переклей скла дисплею', price: '1 500' },
        { service: 'Заміна аккумулятора', price: '1 800' },
        { service: 'Заміна заднього скла', price: '1 600' },
    ],
    '8plus': [
        { service: 'Заміна дисплею', price: '2 000' },
        { service: 'Переклей скла дисплею', price: '1 000' },
        { service: 'Заміна аккумулятора', price: '1 000' },
        { service: 'Заміна заднього скла', price: '1 500' },
    ],
    '8': [
        { service: 'Заміна дисплею', price: '1 500' },
        { service: 'Переклей скла дисплею', price: '1 000' },
        { service: 'Заміна аккумулятора', price: '1 000' },
        { service: 'Заміна заднього скла', price: '1 500' },
    ]
};

function initializeRemontTable() {
    const select = document.getElementById('model-remont');
    if (!select) return;

    // Initial render
    renderTableRemont(select.value);

    // Change listener
    select.addEventListener('change', function () {
        renderTableRemont(this.value);
    });
}

function renderTableRemont(model) {
    const tbody = document.querySelector('#price-table-remont tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const items = pricesRemont[model];
    if (items) {
        items.forEach(item => {
            const icon = serviceIcons[item.service] || '';
            const serviceText = `${icon} <span style="margin-left:8px;">${item.service}</span>`;

            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td>${serviceText}</td>
        <td class="price">${item.price}</td>
      `;
            tbody.appendChild(tr);
        });
    }
}

/* =========================================
   Global & Utility
   ========================================= */


// Inject Trade-in HTML
const tradeInContainer = document.getElementById('tradein-container');
if (tradeInContainer && window.tradeInHTML) {
    tradeInContainer.innerHTML = window.tradeInHTML;
}

// Service Worker Registration
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then(() => console.log("✅ Service Worker Registered"))
        .catch(err => console.error("❌ Service Worker Error:", err));
}

/* =========================================
   Swipe Navigation Logic
   ========================================= */

let touchStartX = 0;
let touchEndX = 0;
const minSwipeDistance = 50;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
        // Swipe Right (Previous)
        navigateCategory(-1);
    } else {
        // Swipe Left (Next)
        navigateCategory(1);
    }
}

function navigateCategory(direction) {
    const categories = ['tradein', 'airpods', 'och', 'iphone_check', 'pencil', 'remont'];

    // Find current active category
    let currentIndex = -1;

    // Check which section is currently visible
    for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        const el = document.getElementById(cat === 'och' ? 'oplatabank' : cat);
        if (el && el.style.display === 'block') {
            currentIndex = i;
            break;
        }
    }

    // If tradein container is visible and tradein is active
    if (currentIndex === -1) {
        const tradeInEl = document.getElementById('tradein-container');
        // Check if tradein-container has children and is visible (it usually is by default if nothing else is)
        // But our filterByCategory sets display block/none on sections.
        // Let's rely on the nav-item active class as a fallback or primary source of truth?
        // Actually, let's check the nav items.
        const activeNav = document.querySelector('.nav-item.active');
        if (activeNav) {
            const onclick = activeNav.getAttribute('onclick');
            const match = onclick.match(/'([^']+)'/);
            if (match) {
                currentIndex = categories.indexOf(match[1]);
            }
        }
    }

    if (currentIndex !== -1) {
        let newIndex = currentIndex + direction;

        // Clamp or Wrap? Let's clamp.
        if (newIndex < 0) newIndex = 0;
        if (newIndex >= categories.length) newIndex = categories.length - 1;

        if (newIndex !== currentIndex) {
            filterByCategory(categories[newIndex]);
        }
    }
}

