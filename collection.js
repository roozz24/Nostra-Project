document.addEventListener('DOMContentLoaded', function() {

    // --- DOM ELEMENTS ---
    // Get references to all the interactive elements on the page.
    const searchInput = document.getElementById('search');
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    const productCards = document.querySelectorAll('.product-card');
    const noResultsMessage = document.getElementById('no-results-message');
    const productsGrid = document.getElementById('products-grid');

    /**
     * This is the main function that filters the products based on user input.
     * Instead of re-creating HTML, it just shows or hides the existing product cards.
     */
    const applyFilters = () => {
        // Get the current values from the search and category filters.
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = document.querySelector('input[name="category"]:checked').value;
        
        let visibleProductsCount = 0;

        // Loop through each product card that exists in the HTML.
        productCards.forEach(card => {
            // Read the data attributes we stored on each card.
            const productName = card.dataset.name.toLowerCase();
            const productCategory = card.dataset.category;

            // Determine if the card should be visible based on the filters.
            const isSearchMatch = productName.includes(searchTerm);
            const isCategoryMatch = selectedCategory === 'all' || productCategory === selectedCategory;

            // If the card matches both filters, make it visible. Otherwise, hide it.
            if (isSearchMatch && isCategoryMatch) {
                card.classList.remove('hidden');
                visibleProductsCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // After checking all cards, see if any are visible.
        // If not, show the "unavailable" message. Otherwise, hide it.
        if (visibleProductsCount === 0) {
            productsGrid.classList.add('hidden'); // Hide the grid to make space for the message
            noResultsMessage.classList.remove('hidden');
        } else {
            productsGrid.classList.remove('hidden'); // Show the grid
            noResultsMessage.classList.add('hidden');
        }
    };

    // --- EVENT LISTENERS ---
    // These lines set up the filtering to run every time the user interacts
    // with the search bar or the category radio buttons.
    
    // Filter on every key press.
    searchInput.addEventListener('input', applyFilters);
    
    // Filter when a new option is selected.
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

});
