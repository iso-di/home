// App Logic

// Check if setup is already done
// Check if setup is already done
document.addEventListener('DOMContentLoaded', () => {
    const savedModel = localStorage.getItem('showcase_model');
    const savedPriceOld = localStorage.getItem('showcase_price_old');
    const savedPriceNew = localStorage.getItem('showcase_price_new');
    const savedStorage = localStorage.getItem('showcase_storage');
    const savedBattery = localStorage.getItem('showcase_battery');

    if (savedModel && savedPriceNew) {
        // If data exists, go straight to showcase
        initializeShowcase(savedModel, savedPriceOld, savedPriceNew, savedStorage, savedBattery);
    } else {
        // Otherwise show setup
        document.getElementById('setup-screen').classList.remove('hidden');
    }
});

function saveSetup() {
    const model = document.getElementById('model-select').value;
    const storage = document.getElementById('storage-select').value;
    const battery = document.getElementById('battery-input').value || '100';
    const priceOld = document.getElementById('price-old-input').value;
    const priceNew = document.getElementById('price-new-input').value;

    if (!priceNew) {
        alert('Пожалуйста, введите акционную цену');
        return;
    }

    localStorage.setItem('showcase_model', model);
    localStorage.setItem('showcase_storage', storage);
    localStorage.setItem('showcase_battery', battery);
    localStorage.setItem('showcase_price_old', priceOld);
    localStorage.setItem('showcase_price_new', priceNew);

    initializeShowcase(model, priceOld, priceNew, storage, battery);
}

function initializeShowcase(model, priceOld, priceNew, storage, battery) {
    // Hide setup, show showcase
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('showcase-screen').classList.remove('hidden');

    // Update UI
    if (priceOld) {
        document.getElementById('display-old-price').textContent = `${priceOld} ₴`;
        document.getElementById('display-old-price').style.display = 'block';
    } else {
        document.getElementById('display-old-price').style.display = 'none';
    }

    document.getElementById('display-new-price').textContent = `${priceNew} ₴`;
    document.getElementById('display-new-price').classList.add('discounted');
    document.getElementById('display-storage').textContent = `${storage.toUpperCase()} GB`;
    document.getElementById('display-battery').textContent = `${battery}%`;

    // Format model name nicely
    const modelNames = {
        'iphone16promax': 'iPhone 16 Pro Max',
        'iphone16pro': 'iPhone 16 Pro',
        'iphone16plus': 'iPhone 16 Plus',
        'iphone16': 'iPhone 16',
        'iphone15promax': 'iPhone 15 Pro Max',
        'iphone15pro': 'iPhone 15 Pro',
        'iphone15plus': 'iPhone 15 Plus',
        'iphone15': 'iPhone 15',
        'iphone14promax': 'iPhone 14 Pro Max',
        'iphone14pro': 'iPhone 14 Pro',
        'iphone14plus': 'iPhone 14 Plus',
        'iphone14': 'iPhone 14',
        'iphone13promax': 'iPhone 13 Pro Max',
        'iphone13pro': 'iPhone 13 Pro',
        'iphone13': 'iPhone 13',
        'iphone13mini': 'iPhone 13 mini',
        'iphone12promax': 'iPhone 12 Pro Max',
        'iphone12pro': 'iPhone 12 Pro',
        'iphone12': 'iPhone 12',
        'iphone12mini': 'iPhone 12 mini',
        'iphone11promax': 'iPhone 11 Pro Max',
        'iphone11pro': 'iPhone 11 Pro',
        'iphone11': 'iPhone 11',
        'iphonese3': 'iPhone SE (2022)',
        'iphonexr': 'iPhone XR'
    };
    document.getElementById('display-model-name').textContent = modelNames[model] || model;

    // Set Image
    const imgElement = document.getElementById('phone-visual');
    imgElement.src = '15pm.png';
}

// Reset function for testing (double tap logo maybe?)
document.querySelector('.logo').addEventListener('dblclick', () => {
    if (confirm('Сбросить настройки?')) {
        localStorage.clear();
        location.reload();
    }
});
