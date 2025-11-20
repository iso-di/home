document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');

    // Check local storage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // --- Real-time Search ---
    const searchInput = document.getElementById('search-input');
    const seriesElements = document.querySelectorAll('.series');
    const tradeinContainer = document.getElementById('tradein'); // Target specific container

    // Helper to get all models inside a series
    function getModelsInSeries(seriesElement) {
        // The sub-models div is the next sibling
        let next = seriesElement.nextElementSibling;
        if (next && next.classList.contains('sub-models')) {
            return next.querySelectorAll('.model');
        }
        return [];
    }

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();

        // Check which section is active
        const remontSection = document.getElementById('remont');
        const isRemontActive = remontSection.style.display !== 'none';

        if (isRemontActive) {
            // Filter Remont Select Options (Hidden but used for logic)
            const select = document.getElementById('model-remont');
            const options = select.options;
            let matchingValues = [];

            // Find all matching options
            for (let i = 0; i < options.length; i++) {
                const text = options[i].text.toLowerCase();
                if (text.includes(term) && term.length > 0) {
                    matchingValues.push(options[i].value);
                }
            }

            // Render table with all matches
            renderTableRemont(matchingValues);

            return; // Don't do trade-in search logic
        }

        // Check if Pencil section is active
        const pencilSection = document.getElementById('pencil');
        const isPencilActive = pencilSection && pencilSection.style.display !== 'none';

        if (isPencilActive) {
            const pencilItems = document.querySelectorAll('.pencil-item');
            const pencilPrompt = document.getElementById('pencil-prompt');
            const pencilResults = document.getElementById('pencil-results');
            let hasMatch = false;

            if (term.length > 0) {
                if (pencilPrompt) pencilPrompt.style.display = 'none';
                if (pencilResults) pencilResults.style.display = 'block';

                pencilItems.forEach(item => {
                    const models = item.dataset.models || '';
                    if (models.includes(term)) {
                        item.style.display = 'block';
                        hasMatch = true;
                    } else {
                        item.style.display = 'none';
                    }
                });

                if (!hasMatch) {
                    // Optional: Show "No results" message?
                    // For now, just show nothing or maybe keep the prompt hidden
                }
            } else {
                if (pencilPrompt) pencilPrompt.style.display = 'block';
                if (pencilResults) pencilResults.style.display = 'none';
            }
            return;
        }

        // Trade-in Search Logic (existing)
        // Show/Hide card container based on input
        if (term.length > 0) {
            tradeinContainer.classList.add('visible-search');
            tradeinContainer.style.display = 'block'; // Ensure it's visible
        } else {
            tradeinContainer.classList.remove('visible-search');
            tradeinContainer.style.display = 'none'; // Hide if empty
            return; // Stop processing if empty
        }

        seriesElements.forEach(series => {
            const seriesName = series.innerText.toLowerCase();
            const subModelsDiv = series.nextElementSibling;
            const models = subModelsDiv ? subModelsDiv.querySelectorAll('.model') : [];
            let hasMatch = false;

            // Check if series name matches
            if (seriesName.includes(term)) {
                hasMatch = true;
                // If series matches, show all its models? Or just show the series?
                // Let's show the series and all models if the series matches
                models.forEach(model => model.style.display = 'flex');
            } else {
                // Check individual models
                let modelMatch = false;
                models.forEach(model => {
                    if (model.innerText.toLowerCase().includes(term)) {
                        model.style.display = 'flex';
                        modelMatch = true;
                    } else {
                        model.style.display = 'none';
                    }
                });
                hasMatch = modelMatch;
            }

            // Toggle visibility of the series header and sub-models container
            if (hasMatch) {
                series.style.display = 'flex';
                // If searching, auto-expand to show results
                if (term.length > 0) {
                    subModelsDiv.style.display = 'block';
                    series.classList.add('active');
                } else {
                    // Reset to default state (collapsed) if search is cleared
                    subModelsDiv.style.display = 'none';
                    series.classList.remove('active');
                }
            } else {
                series.style.display = 'none';
                if (subModelsDiv) subModelsDiv.style.display = 'none';
            }
        });
    });

    // --- Scroll Reveal Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card, .series, .model');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in-section');
        // Add a slight delay based on index for staggered effect if desired, 
        // but simple intersection is usually enough.
        observer.observe(el);
    });
});
