// Fetch and insert the header
fetch('/components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;

        // Helper to set the language
        function setLanguage(lang) {
            document.documentElement.setAttribute('lang', lang);
            localStorage.setItem('language', lang); // Save language to localStorage

            // Update elements with data-lang attributes
            document.querySelectorAll('[data-lang-en]').forEach(el => {
                const translation = el.getAttribute(`data-lang-${lang}`);
                el[translation.includes('<') ? 'innerHTML' : 'textContent'] = translation;
            });

            updateActiveLanguageButton(lang);
        }

        // Update active language button
        function updateActiveLanguageButton(lang) {
            document.querySelectorAll('.footer-btn').forEach(button => {
                button.classList.toggle('active', button.textContent.trim().toLowerCase() === lang);
            });
        }

        // Helper to set the theme
        function setTheme(theme) {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(theme);
            localStorage.setItem('theme', theme); // Save theme to localStorage
        }

        // Initialize with stored preferences or browser defaults
        const storedLang = localStorage.getItem('language') || navigator.language.slice(0, 2).toLowerCase();
        const supportedLangs = ['en', 'fr'];
        const defaultLang = supportedLangs.includes(storedLang) ? storedLang : 'en';
        setLanguage(defaultLang);

        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);

        // Event listener for theme and language toggles
        document.addEventListener('click', (event) => {
            const target = event.target;

            // Theme Toggle
            if (target.closest('.footer-btn > i.fa-circle-half-stroke')) {
                const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
                setTheme(newTheme); // Toggle and save theme
            }

            // Language Toggle
            if (target.matches('.footer-btn') && ['EN', 'FR'].includes(target.textContent.trim().toUpperCase())) {
                setLanguage(target.textContent.trim().toLowerCase());
            }
        });
    })
    .catch(error => console.error('Error loading header:', error));