document.addEventListener('DOMContentLoaded', function(){

    // Selecting elements
    const searchInput = document.getElementById("search");
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    const productCards = document.querySelectorAll(".product-card");
    const productsGrid = document.getElementById("products-grid");
    const noResultsMessage = document.getElementById("no-results-message");

    // Apply filters to the product cards
    const applyFilters = function(){
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = document.querySelector('input[name="category"]:checked').value;

        let visibleProductsCount = 0;

        // for loop
        productCards.forEach(function(card){
            const productName = card.dataset.name.toLowerCase();
            const productCategory = card.dataset.category;

            const isSearchMatch = productName.includes(searchTerm);
            const isCategoryMatch = selectedCategory === 'all' || productCategory === selectedCategory;

            if(isSearchMatch && isCategoryMatch){
                card.classList.remove("hidden");
                visibleProductsCount++;
            } else { 
                    card.classList.add("hidden");
                }

                if(visibleProductsCount === 0){
                    productsGrid.classList.add("hidden");
                    noResultsMessage.classList.remove("hidden");
                } else {
                    productsGrid.classList.remove("hidden");
                    noResultsMessage.classList.add("hidden");
                }
        });
    };

    // Calling the function Apply Filters
    searchInput.addEventListener('input', applyFilters);

    categoryFilters.forEach(function(filter){
        filter.addEventListener('change', applyFilters);
    });

});
