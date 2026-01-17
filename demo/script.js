import { productsNew } from './products_new.js';
import { productsUsed } from './products_used.js';

// Central price formatter
export const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₴";
};

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('inventory-grid');
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title');
    const form = document.querySelector('.modal-form');

    const searchInput = document.getElementById('phone-search');
    const typeToggle = document.getElementById('type-toggle');
    const categoryNav = document.getElementById('category-nav');
    const priceSort = document.getElementById('price-sort');

    let currentType = 'used'; // used | new
    let currentCategory = 'iphone';
    let currentPage = 1;
    const itemsPerPage = 9;

    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scroll-top');

    // Scroll Effects
    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Top Button
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Navigation Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Render Inventory
    function renderInventory(filterQuery = '') {
        if (!grid) return;

        // Smooth transition: Start fade out
        grid.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        grid.style.opacity = '0';
        grid.style.transform = 'translateY(10px)';

        setTimeout(() => {
            grid.innerHTML = '';

            let products = [];
            const isSearching = filterQuery.trim() !== '';

            if (isSearching) {
                // Global search across ALL products
                products = [
                    ...productsUsed.map(p => ({ ...p, type: 'used' })),
                    ...productsNew.map(p => ({ ...p, type: 'new' }))
                ];
            } else {
                const source = currentType === 'new' ? productsNew : productsUsed;
                products = source.map(p => ({ ...p, type: currentType }));
            }

            let filteredItems = products.filter(item => {
                const matchesSearch = item.model.toLowerCase().includes(filterQuery.toLowerCase()) ||
                    item.color.toLowerCase().includes(filterQuery.toLowerCase()) ||
                    (item.tags && item.tags.some(t => t.toLowerCase().includes(filterQuery.toLowerCase())));

                let matchesCategory = true;
                if (currentCategory !== 'all' && !isSearching) {
                    matchesCategory = item.category === currentCategory;
                }

                return matchesSearch && matchesCategory;
            });

            // Sorting Logic
            const sortMode = priceSort ? priceSort.value : 'default';
            if (sortMode === 'cheap') {
                filteredItems.sort((a, b) => a.price - b.price);
            } else if (sortMode === 'expensive') {
                filteredItems.sort((a, b) => b.price - a.price);
            }

            if (filteredItems.length === 0) {
                grid.innerHTML = `
                    <div class="no-results">
                        <div class="no-results-icon">🔍</div>
                        <h3>Нічого не знайдено</h3>
                        <p>Спробуйте змінити запит або обрати іншу категорію</p>
                    </div>
                `;
                document.getElementById('pagination-controls').innerHTML = '';
                return;
            }

            // Pagination logic
            const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const itemsToShow = filteredItems.slice(startIndex, endIndex);

            itemsToShow.forEach(item => {
                const card = document.createElement('div');
                card.className = 'product-card glass-card';

                const hasDiscount = item.oldPrice > item.price;
                const discount = hasDiscount ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100) : 0;

                let conditionClass = 'condition-good';
                if (item.condition && (item.condition.includes('Ідеальний') || item.condition.includes('Новий'))) conditionClass = 'condition-perfect';

                // Special Label for global search
                const typeLabel = item.type === 'new' ?
                    '<span class="badge" style="background: var(--accent); color: white; border: none;">Новий</span>' :
                    '<span class="badge" style="background: rgba(0,0,0,0.05); color: var(--text-secondary); border: none;">Б/В</span>';

                card.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${item.image}" alt="${item.model}" class="product-main-img" onerror="this.src='https://placehold.co/400x500/png?text=${encodeURIComponent(item.model)}'">
                    
                    <div class="product-badges">
                        ${isSearching ? typeLabel : (hasDiscount ? `<span class="badge discount">-${discount}%</span>` : '')}
                        ${item.condition ? `<span class="badge condition ${conditionClass}">${item.condition.split(' ')[0]}</span>` : ''}
                    </div>

                    <div class="compact-specs">
                        ${item.memory ? `<span class="spec-pill memory ${item.type === 'new' ? 'is-new' : ''}">💾 ${item.memory}</span>` : ''}
                        ${item.battery ? `<span class="spec-pill battery">🔋 ${item.battery}</span>` : ''}
                    </div>

                    <div class="status-badge status-${item.availability}">
                        ${item.availability === 'in_stock' ? '● В наявності' : '○ Під замовлення'}
                    </div>
                </div>
                <div class="product-content">
                    <div class="product-header">
                        <h3 class="product-title">${item.model}</h3>
                        <div class="product-color">${item.color}</div>
                    </div>
                    
                    <div class="installment-block">
                        <span class="installment-label">Оплата частинами</span>
                        <div class="bank-icons">
                            <img src="bankicon/monobank.png" alt="Monobank" class="bank-logo">
                            <img src="bankicon/abank.png" alt="A-Bank" class="bank-logo">
                            <img src="bankicon/privat.png" alt="PrivatBank" class="bank-logo">
                        </div>
                    </div>

                    <div class="product-footer">
                        <div class="price-block">
                            ${hasDiscount ? `<div class="old-price">${formatPrice(item.oldPrice)}</div>` : ''}
                            <div class="current-price">${formatPrice(item.price)}</div>
                        </div>
                        <button class="btn-primary btn-product-buy" data-id="${item.id}" data-type="${item.type}">Деталі</button>
                    </div>
                </div>
            `;

                grid.appendChild(card);
            });

            // Render pagination controls
            renderPagination(totalPages);

            // Re-bind events to new buttons
            bindProductEvents();

            // Smooth transition: Fade in
            requestAnimationFrame(() => {
                grid.style.opacity = '1';
                grid.style.transform = 'translateY(0)';
            });
        }, 200);
    }

    // Render Pagination Controls
    function renderPagination(totalPages) {
        const paginationContainer = document.getElementById('pagination-controls');
        if (!paginationContainer || totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '<div class="pagination-buttons">';

        // Previous button
        if (currentPage > 1) {
            paginationHTML += `<button class="pagination-btn" data-page="${currentPage - 1}">← Назад</button>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                paginationHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                paginationHTML += `<span class="pagination-dots">...</span>`;
            }
        }

        // Next button
        if (currentPage < totalPages) {
            paginationHTML += `<button class="pagination-btn" data-page="${currentPage + 1}">Вперед →</button>`;
        }

        paginationHTML += '</div>';
        paginationContainer.innerHTML = paginationHTML;

        // Bind pagination button events
        document.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                currentPage = parseInt(e.target.dataset.page);
                renderInventory(searchInput?.value || '');

                // Scroll to top of inventory
                const inventorySection = document.getElementById('inventory');
                if (inventorySection) {
                    inventorySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Helper to bind events to buttons inside the grid
    function bindProductEvents() {
        document.querySelectorAll('.btn-product-buy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.target.dataset.id;
                const itemType = e.target.dataset.type;
                const source = itemType === 'new' ? productsNew : productsUsed;
                const item = source.find(p => p.id === itemId);
                if (item) openModal({ ...item, type: itemType });
            });
        });
    }

    // Type Toggle Logic
    if (typeToggle) {
        typeToggle.addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle-btn')) {
                document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                currentType = e.target.dataset.type;
                currentPage = 1; // Reset to first page

                // Toggle slider class
                if (currentType === 'new') {
                    typeToggle.classList.add('is-new');
                } else {
                    typeToggle.classList.remove('is-new');
                }

                renderInventory(searchInput?.value || '');

                // Scroll to top of inventory
                const inventorySection = document.getElementById('inventory');
                if (inventorySection) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = inventorySection.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Category Nav Logic
    if (categoryNav) {
        categoryNav.addEventListener('click', (e) => {
            const catItem = e.target.closest('.cat-item');
            if (catItem) {
                document.querySelectorAll('.cat-item').forEach(item => item.classList.remove('active'));
                const selectedCat = catItem.dataset.cat;
                document.querySelectorAll(`.cat-item[data-cat="${selectedCat}"]`).forEach(item => item.classList.add('active'));
                currentCategory = selectedCat;
                currentPage = 1; // Reset to first page
                renderInventory(searchInput?.value || '');

                // Scroll to top of inventory
                const inventorySection = document.getElementById('inventory');
                if (inventorySection) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = inventorySection.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Search Logic
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderInventory(e.target.value);
        });
    }

    // Sort Logic
    if (priceSort) {
        priceSort.addEventListener('change', () => {
            renderInventory(searchInput?.value || '');
        });
    }

    // Modal Logic
    function openModal(item) {
        modalTitle.innerText = item.model;

        const form = modal.querySelector('.modal-form');
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-detail-view';
        modalBody.innerHTML = `
            <div class="modal-detail-container">
                <div class="modal-header-info" style="flex-direction: column; align-items: center; text-align: center; gap: 8px; margin-bottom: 12px;">
                    <div class="modal-main-meta" style="width: 100%;">
                        <div class="status-badge-centered" style="margin: 15px 0 25px; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.06em; background: rgba(0,0,0,0.03); padding: 8px 16px; border-radius: 100px; display: inline-block;">
                            <span class="${item.availability === 'in_stock' ? 'status-in_stock-text' : 'status-pre_order-text'}">
                                ${item.availability === 'in_stock' ? '● В наявності' : '○ Під замовлення'}
                            </span>
                        </div>
                        <div class="modal-price-tag" style="margin: 0 auto; display: inline-block; min-width: 220px; font-size: 30px; letter-spacing: -0.02em;">${formatPrice(item.price)}</div>
                    </div>
                </div>

                <div class="modal-specs-grid">
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">Колір</span>
                        <span class="modal-spec-value">${item.color}</span>
                    </div>
                    ${item.memory ? `
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">Пам'ять</span>
                        <span class="modal-spec-value">${item.memory}</span>
                    </div>` : ''}
                    ${item.battery ? `
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">Акумулятор</span>
                        <span class="modal-spec-value">${item.battery}</span>
                    </div>` : ''}
                    ${item.condition ? `
                    <div class="modal-spec-item">
                        <span class="modal-spec-label">Стан</span>
                        <span class="modal-spec-value">${item.condition}</span>
                    </div>` : ''}
                    <div class="modal-spec-item" style="grid-column: 1 / -1;">
                        <span class="modal-spec-label">Гарантія</span>
                        <span class="modal-spec-value">
                            ${item.type === 'used' ? 'до 1 року*' : item.warranty}
                        </span>
                    </div>
                </div>

                <h3 style="text-align: center; font-size: 18px; font-weight: 700; margin-top: 10px; margin-bottom: 0;">Залишити заявку</h3>
            </div>
        `;

        const existingDetail = modal.querySelector('.modal-detail-view');
        if (existingDetail) existingDetail.remove();

        // Handle Warranty Disclaimer visibility
        const disclaimer = document.getElementById('modal-warranty-disclaimer');
        if (disclaimer) {
            disclaimer.style.display = item.type === 'used' ? 'block' : 'none';
        }

        form.parentNode.insertBefore(modalBody, form);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Hide disclaimer on close
        const disclaimer = document.getElementById('modal-warranty-disclaimer');
        if (disclaimer) disclaimer.style.display = 'none';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('client-name').value;
        const phone = document.getElementById('client-phone').value;
        const product = modalTitle.innerText;

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;

        // Visual feedback
        submitBtn.disabled = true;
        submitBtn.innerText = 'Відправляємо...';

        const botToken = '8270995372:AAE7tpNXsn6khExOWbsu4g8nnxzMYFgTIlg';
        const chatId = '-5096222862'; // Додав мінус, оскільки це група Telegram

        const message = `📦 *Нова заявка з сайту!*\n\n` +
            `👤 *Ім'я:* ${name}\n` +
            `📞 *Телефон:* ${phone}\n` +
            `📱 *Товар:* ${product}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });

            if (response.ok) {
                alert('Дякуємо! Ваша заявка прийнята. Менеджер звʼяжеться з вами найближчим часом.');
                form.reset();
                closeModal();
            } else {
                throw new Error('Помилка сервера');
            }
        } catch (error) {
            alert('На жаль, виникла помилка. Будь ласка, спробуйте ще раз або зателефонуйте нам.');
            console.error('Telegram Error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    });

    renderInventory();
});
