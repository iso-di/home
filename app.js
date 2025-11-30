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
        alert('Будь ласка, введіть акційну ціну');
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
        'iphonexsmax': 'iPhone XS Max',
        'iphonexs': 'iPhone XS',
        'iphonese3': 'iPhone SE (2022)',
        'iphonexr': 'iPhone XR'
    };
    document.getElementById('display-model-name').textContent = modelNames[model] || model;

    // Set Image based on model
    const imgElement = document.getElementById('phone-visual');
    let imgSrc = '15pm.png'; // Default fallback

    if (model === 'iphone16promax' || model === 'iphone16pro') imgSrc = '16pm.png';
    else if (model === 'iphone16' || model === 'iphone16plus') imgSrc = '16.png';
    else if (model === 'iphone15promax' || model === 'iphone15pro') imgSrc = '15pm.png';
    else if (model === 'iphone15' || model === 'iphone15plus') imgSrc = '15.png';
    else if (model === 'iphone14promax' || model === 'iphone14pro') imgSrc = '14pm.png';
    else if (model === 'iphone14' || model === 'iphone14plus') imgSrc = '14.png';
    else if (model === 'iphone13promax' || model === 'iphone13pro') imgSrc = '13pm.png';
    else if (model === 'iphone13' || model === 'iphone13mini') imgSrc = '13.png';
    else if (model === 'iphone12promax' || model === 'iphone12pro') imgSrc = '12pm.png';
    else if (model === 'iphone12' || model === 'iphone12mini') imgSrc = '12.png';
    else if (model === 'iphone11promax' || model === 'iphone11pro') imgSrc = '11pm.png';
    else if (model === 'iphone11') imgSrc = '11.png';
    else if (model === 'iphonexs' || model === 'iphonexsmax') imgSrc = 'xs.png';
    else if (model === 'iphonexr') imgSrc = 'xr.png';
    else if (model === 'iphonese3' || model === 'iphonese2') imgSrc = 'se2.png';

    imgElement.src = imgSrc;
}

// Reset function for testing (double tap logo maybe?)
document.querySelector('.logo').addEventListener('dblclick', () => {
    if (confirm('Сбросить настройки?')) {
        localStorage.clear();
        location.reload();
    }
});
