// База даних iPhone для трейд-іну
const phonesDatabase = [
    {
        id: 1,
        model: "iPhone 15 Pro",
        brand: "Apple",
        image: "15p.png",
        basePrice: 45000,
        hasESIM: true,
        tradeInFactors: {
            memory: {
                "128": 0,
                "256": 3000,
                "512": 6000,
                "1TB": 10000
            },
            battery: {
                excellent: 0,
                good: -2000,
                poor: -5000,
                bad: -8000
            },
            condition: {
                excellent: 0,
                good: -3000,
                poor: -6000,
                bad: -10000
            },
            simType: {
                physical: 0,
                esim: 500
            }
        }
    },
    {
        id: 2,
        model: "iPhone 14 Pro",
        brand: "Apple",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3IDJIN0M1Ljg5NTQzIDIgNSAyLjg5NTQzIDUgNFYyMEM1IDIxLjEwNDYgNS44OTU0MyAyMiA3IDIySDE3QzE4LjEwNDYgMjIgMTkgMjEuMTA0NiAxOSAyMFY0QzE5IDIuODk1NDMgMTguMTA0NiAyIDE3IDJaIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIgMThIMTIuMDEiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1jYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
        basePrice: 38000,
        hasESIM: true,
        tradeInFactors: {
            memory: {
                "128": 0,
                "256": 2500,
                "512": 5000,
                "1TB": 8000
            },
            battery: {
                excellent: 0,
                good: -1500,
                poor: -4000,
                bad: -6500
            },
            condition: {
                excellent: 0,
                good: -2500,
                poor: -5000,
                bad: -8000
            },
            simType: {
                physical: 0,
                esim: 500
            }
        }
    },
    {
        id: 3,
        model: "iPhone 13 Pro",
        brand: "Apple",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3IDJIN0M1Ljg5NTQzIDIgNSAyLjg5NTQzIDUgNFYyMEM1IDIxLjEwNDYgNS44OTU0MyAyMiA3IDIySDE3QzE4LjEwNDYgMjIgMTkgMjEuMTA0NiAxOSAyMFY0QzE5IDIuODk1NDMgMTguMTA0NiAyIDE3IDJaIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1jYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMiAxOEgxMi4wMSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==",
        basePrice: 32000,
        hasESIM: true,
        tradeInFactors: {
            memory: {
                "128": 0,
                "256": 2000,
                "512": 4000,
                "1TB": 7000
            },
            battery: {
                excellent: 0,
                good: -1200,
                poor: -3000,
                bad: -5000
            },
            condition: {
                excellent: 0,
                good: -2000,
                poor: -4000,
                bad: -6500
            },
            simType: {
                physical: 0,
                esim: 500
            }
        }
    },
    {
        id: 4,
        model: "iPhone 12 Pro",
        brand: "Apple",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3IDJIN0M1Ljg5NTQzIDIgNSAyLjg5NTQzIDUgNFYyMEM1IDIxLjEwNDYgNS44OTU0MyAyMiA3IDIySDE3QzE4LjEwNDYgMjIgMTkgMjEuMTA0NiAxOSAyMFY0QzE5IDIuODk1NDMgMTguMTA0NiAyIDE3IDJaIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIgMThIMTIuMDEiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1jYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
        basePrice: 28000,
        hasESIM: false,
        tradeInFactors: {
            memory: {
                "128": 0,
                "256": 1500,
                "512": 3000,
                "1TB": 5000
            },
            battery: {
                excellent: 0,
                good: -1000,
                poor: -2500,
                bad: -4000
            },
            condition: {
                excellent: 0,
                good: -1800,
                poor: -3500,
                bad: -5500
            },
            simType: {
                physical: 0,
                esim: 0
            }
        }
    },
    {
        id: 5,
        model: "iPhone 11 Pro",
        brand: "Apple",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3IDJIN0M1Ljg5NTQzIDIgNSAyLjg5NTQzIDUgNFYyMEM1IDIxLjEwNDYgNS44OTU0MyAyMiA3IDIySDE3QzE4LjEwNDYgMjIgMTkgMjEuMTA0NiAxOSAyMFY0QzE5IDIuODk1NDMgMTguMTA0NiAyIDE3IDJaIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIgMThIMTIuMDEiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1jYXA9InJvdW5kIiBzdHJva2UtbGluZS1jYXA9InJvdW5kIi8+Cjwvc3ZnPgo=",
        basePrice: 24000,
        hasESIM: false,
        tradeInFactors: {
            memory: {
                "128": 0,
                "256": 1000,
                "512": 2000,
                "1TB": 3500
            },
            battery: {
                excellent: 0,
                good: -800,
                poor: -2000,
                bad: -3500
            },
            condition: {
                excellent: 0,
                good: -1500,
                poor: -3000,
                bad: -5000
            },
            simType: {
                physical: 0,
                esim: 0
            }
        }
    }
];

// DOM елементи
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const noResults = document.getElementById('noResults');
const phoneModal = document.getElementById('phoneModal');
const closeModal = document.getElementById('closeModal');
const orderBtn = document.getElementById('orderBtn');

// Функція пошуку телефонів
function searchPhones(query) {
    if (!query.trim()) {
        searchResults.classList.remove('active');
        noResults.style.display = 'none';
        return;
    }

    const results = phonesDatabase.filter(phone => 
        phone.model.toLowerCase().includes(query.toLowerCase()) ||
        phone.brand.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length > 0) {
        displaySearchResults(results);
        searchResults.classList.add('active');
        noResults.style.display = 'none';
    } else {
        searchResults.classList.remove('active');
        noResults.style.display = 'block';
    }
}

// Відображення результатів пошуку
function displaySearchResults(phones) {
    searchResults.innerHTML = '';
    
    phones.forEach(phone => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        
        // Визначаємо, чи це зображення чи SVG
        const isImage = phone.image && !phone.image.startsWith('data:image/svg+xml');
        
        resultItem.innerHTML = `
            <div class="phone-icon">
                ${isImage 
                    ? `<img src="${phone.image}" alt="${phone.brand} ${phone.model}">`
                    : `<svg viewBox="0 0 24 24" fill="none">
                        <path d="M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 18H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`
                }
            </div>
                           <div class="phone-info">
                   <h4>${phone.brand} ${phone.model}</h4>
                   <p>${phone.basePrice.toLocaleString()} грн</p>
               </div>
        `;
        
        resultItem.addEventListener('click', () => {
            openPhoneModal(phone);
            searchResults.classList.remove('active');
        });
        
        searchResults.appendChild(resultItem);
    });
}

// Відкриття модального вікна з деталями телефону та системою трейд-іну
function openPhoneModal(phone) {
    document.getElementById('modalTitle').textContent = `${phone.brand} ${phone.model}`;
    document.getElementById('modalPhoneImage').src = phone.image;
    document.getElementById('modalPhoneImage').alt = `${phone.brand} ${phone.model}`;
    

    
    // Система трейд-іну
    const tradeInContainer = document.getElementById('modalTradeIn');
    if (tradeInContainer) {
        tradeInContainer.innerHTML = `
            <div class="trade-in-section">
                <h3>Оцінка для трейд-іну</h3>
                <div class="trade-in-base">
                    <span class="base-price-label">Базова ціна:</span>
                    <span class="base-price-value">${phone.basePrice.toLocaleString()} грн</span>
                </div>
                
                <div class="trade-in-factors">
                    <div class="factor-group">
                        <label>Об'єм пам'яті:</label>
                        <select id="memorySize" onchange="calculateTradeInPrice()">
                            <option value="128">128 ГБ</option>
                            <option value="256">256 ГБ</option>
                            <option value="512">512 ГБ</option>
                            <option value="1TB">1 ТБ</option>
                        </select>
                    </div>
                    
                    <div class="factor-group">
                        <label>Стан батареї:</label>
                        <select id="batteryCondition" onchange="calculateTradeInPrice()">
                            <option value="excellent">Відмінний (100%)</option>
                            <option value="good">Хороший (80-99%)</option>
                            <option value="poor">Середній (60-79%)</option>
                            <option value="bad">Поганий (менше 60%)</option>
                        </select>
                    </div>
                    
                    <div class="factor-group">
                        <label>Загальний стан:</label>
                        <select id="phoneCondition" onchange="calculateTradeInPrice()">
                            <option value="excellent">Відмінний</option>
                            <option value="good">Хороший</option>
                            <option value="poor">Середній</option>
                            <option value="bad">Поганий</option>
                        </select>
                    </div>
                    
                    ${phone.hasESIM ? `
                    <div class="factor-group">
                        <label>Тип SIM:</label>
                        <select id="simType" onchange="calculateTradeInPrice()">
                            <option value="physical">Фізична SIM</option>
                            <option value="esim">eSIM</option>
                        </select>
                    </div>
                    ` : ''}
                </div>
                
                <div class="trade-in-result">
                    <span class="final-price-label">Фінальна ціна:</span>
                    <span class="final-price-value" id="finalPrice">${phone.basePrice.toLocaleString()} грн</span>
                </div>
            </div>
        `;
    }
    
    phoneModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закриття модального вікна
function closePhoneModal() {
    phoneModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Розрахунок фінальної ціни трейд-іну
function calculateTradeInPrice() {
    const memorySize = document.getElementById('memorySize').value;
    const batteryCondition = document.getElementById('batteryCondition').value;
    const phoneCondition = document.getElementById('phoneCondition').value;
    
    // Знаходимо поточний телефон у модальному вікні
    const phoneTitle = document.getElementById('modalTitle').textContent;
    const phone = phonesDatabase.find(p => `${p.brand} ${p.model}` === phoneTitle);
    
    if (!phone) return;
    
    let finalPrice = phone.basePrice;
    
    // Додаємо вартість за пам'ять
    finalPrice += phone.tradeInFactors.memory[memorySize];
    
    // Додаємо знижки за стан
    finalPrice += phone.tradeInFactors.battery[batteryCondition];
    finalPrice += phone.tradeInFactors.condition[phoneCondition];
    
    // Додаємо вартість за тип SIM (якщо є eSIM)
    if (phone.hasESIM) {
        const simType = document.getElementById('simType').value;
        finalPrice += phone.tradeInFactors.simType[simType];
    }
    
    // Оновлюємо фінальну ціну
    document.getElementById('finalPrice').textContent = finalPrice.toLocaleString() + ' грн';
    
    // Додаємо анімацію зміни ціни
    const finalPriceElement = document.getElementById('finalPrice');
    finalPriceElement.style.transform = 'scale(1.1)';
    finalPriceElement.style.color = finalPrice < phone.basePrice ? '#FF3B30' : '#34C759';
    
    setTimeout(() => {
        finalPriceElement.style.transform = 'scale(1)';
    }, 200);
}

// Обробник пошуку
searchInput.addEventListener('input', (e) => {
    searchPhones(e.target.value);
});

// Закриття модального вікна при кліку на кнопку закриття
closeModal.addEventListener('click', closePhoneModal);

// Закриття модального вікна при кліку поза ним
phoneModal.addEventListener('click', (e) => {
    if (e.target === phoneModal) {
        closePhoneModal();
    }
});

// Обробник кнопки замовлення
orderBtn.addEventListener('click', () => {
    const phoneTitle = document.getElementById('modalTitle').textContent;
    alert(`Дякуємо за замовлення! Ми зв'яжемося з вами щодо ${phoneTitle}`);
    closePhoneModal();
});

// Закриття результатів пошуку при кліку поза ними
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
    }
});

// PWA функціональність
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Додавання до головного екрану
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Можна показати кнопку "Встановити додаток"
    setTimeout(() => {
        if (deferredPrompt) {
            showInstallPrompt();
        }
    }, 3000);
});

function showInstallPrompt() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    }
}

// Обробка клавіш
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
            const results = phonesDatabase.filter(phone => 
                phone.model.toLowerCase().includes(query.toLowerCase()) ||
                phone.brand.toLowerCase().includes(query.toLowerCase())
            );
            if (results.length > 0) {
                openPhoneModal(results[0]);
            }
        }
    }
});

// Анімація появи результатів
function animateSearchResults() {
    const items = searchResults.querySelectorAll('.search-result-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Оновлення функції відображення результатів з анімацією
const originalDisplaySearchResults = displaySearchResults;
displaySearchResults = function(phones) {
    originalDisplaySearchResults(phones);
    setTimeout(animateSearchResults, 50);
};
