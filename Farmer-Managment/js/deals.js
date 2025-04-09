// Deals functionality for the deals.html page

document.addEventListener('DOMContentLoaded', function() {
    // Sample deals data (in a real app, this would come from an API)
    const deals = [
        {
            id: 1,
            title: 'Premium Quality Fertilizer',
            category: 'Fertilizers',
            price: 1200,
            unit: 'bag (50kg)',
            originalPrice: 1500,
            discount: 20,
            seller: {
                name: 'AgriSupplies Ltd.',
                location: 'Delhi',
                rating: 4.7
            },
            description: 'High-quality NPK fertilizer suitable for all crops. Balanced nutrients for optimal growth.',
            expiryDate: '2023-07-31',
            image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            id: 2,
            title: 'Tractor Rental - Special Offer',
            category: 'Equipment',
            price: 800,
            unit: 'day',
            originalPrice: 1200,
            discount: 33,
            seller: {
                name: 'Farm Machinery Rentals',
                location: 'Punjab',
                rating: 4.8
            },
            description: 'Modern tractor available for rent at special discounted rates. Includes basic implements.',
            expiryDate: '2023-08-15',
            image: 'https://images.unsplash.com/photo-1592805144716-feeccccef5ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            id: 3,
            title: 'Organic Pesticide Bundle',
            category: 'Pesticides',
            price: 950,
            unit: 'set',
            originalPrice: 1200,
            discount: 21,
            seller: {
                name: 'Green Earth Organics',
                location: 'Maharashtra',
                rating: 4.6
            },
            description: 'Complete set of organic pesticides for pest control. Safe for organic farming and eco-friendly.',
            expiryDate: '2023-08-10',
            image: 'https://images.unsplash.com/photo-1589928558003-9d3a9dcde173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            id: 4,
            title: 'High-Yield Wheat Seeds',
            category: 'Seeds',
            price: 180,
            unit: 'kg',
            originalPrice: 220,
            discount: 18,
            seller: {
                name: 'Premium Seeds Co.',
                location: 'Haryana',
                rating: 4.9
            },
            description: 'Drought-resistant wheat seeds with high yield potential. Ideal for various soil conditions.',
            expiryDate: '2023-09-01',
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1c5a1ec21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            id: 5,
            title: 'Drip Irrigation System',
            category: 'Equipment',
            price: 5500,
            unit: 'set',
            originalPrice: 7000,
            discount: 21,
            seller: {
                name: 'Water Solutions Ltd.',
                location: 'Gujarat',
                rating: 4.7
            },
            description: 'Complete drip irrigation system for 1 acre. Includes pipes, drippers, filters, and connectors.',
            expiryDate: '2023-08-20',
            image: 'https://images.unsplash.com/photo-1591339093417-5edf4d6ea3d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            id: 6,
            title: 'Bulk Purchase - Jute Bags',
            category: 'Packaging',
            price: 15,
            unit: 'bag',
            originalPrice: 25,
            discount: 40,
            seller: {
                name: 'Eco Packaging Solutions',
                location: 'West Bengal',
                rating: 4.5
            },
            description: 'Eco-friendly jute bags for crop storage and transportation. Minimum order: 100 bags.',
            expiryDate: '2023-07-25',
            image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
        }
    ];
    
    // Populate deals grid
    function populateDeals(dealsData) {
        const dealsContainer = document.getElementById('deals-container');
        if (!dealsContainer) return;
        
        dealsContainer.innerHTML = '';
        
        dealsData.forEach(deal => {
            const dealCard = document.createElement('div');
            dealCard.className = 'bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-105';
            
            // Calculate days remaining until expiry
            const today = new Date();
            const expiryDate = new Date(deal.expiryDate);
            const daysRemaining = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            
            dealCard.innerHTML = `
                <div class="relative">
                    <img src="${deal.image}" alt="${deal.title}" class="w-full h-48 object-cover">
                    <div class="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg font-bold">
                        ${deal.discount}% OFF
                    </div>
                    ${daysRemaining <= 5 ? `
                        <div class="absolute bottom-0 left-0 right-0 bg-red-600 bg-opacity-80 text-white px-3 py-1 text-center text-sm font-semibold">
                            ${daysRemaining <= 0 ? 'Expired' : `Expires in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`}
                        </div>
                    ` : ''}
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-start">
                        <h3 class="text-lg font-semibold text-gray-800">${deal.title}</h3>
                        <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">${deal.category}</span>
                    </div>
                    <div class="mt-2">
                        <span class="text-2xl font-bold text-gray-800">₹${deal.price}</span>
                        <span class="text-sm text-gray-500">/${deal.unit}</span>
                        <span class="ml-2 text-sm text-gray-500 line-through">₹${deal.originalPrice}</span>
                    </div>
                    <p class="text-gray-600 text-sm mt-2">${deal.description.substring(0, 100)}${deal.description.length > 100 ? '...' : ''}</p>
                    <div class="flex justify-between items-center mt-4">
                        <div class="flex items-center">
                            <i class="fas fa-map-marker-alt text-gray-500 mr-1"></i>
                            <span class="text-gray-500 text-sm">${deal.seller.location}</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-star text-yellow-400 mr-1"></i>
                            <span class="text-gray-500 text-sm">${deal.seller.rating}</span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <button class="view-deal-btn w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300" data-id="${deal.id}">
                            View Deal
                        </button>
                    </div>
                </div>
            `;
            
            dealsContainer.appendChild(dealCard);
        });
        
        // Add event listeners to view deal buttons
        document.querySelectorAll('.view-deal-btn').forEach(button => {
            button.addEventListener('click', function() {
                const dealId = parseInt(this.getAttribute('data-id'));
                const deal = deals.find(d => d.id === dealId);
                
                if (deal) {
                    openDealModal(deal);
                }
            });
        });
    }
    
    // Open deal modal
    function openDealModal(deal) {
        const dealModal = document.getElementById('deal-modal');
        if (!dealModal) return;
        
        // Update modal content with deal details
        const dealTitle = document.getElementById('deal-title');
        const dealImage = document.getElementById('deal-image');
        const dealPrice = document.getElementById('deal-price');
        const dealOriginalPrice = document.getElementById('deal-original-price');
        const dealDiscount = document.getElementById('deal-discount');
        const dealDescription = document.getElementById('deal-description');
        const dealSeller = document.getElementById('deal-seller');
        const dealLocation = document.getElementById('deal-location');
        const dealRating = document.getElementById('deal-rating');
        const dealExpiry = document.getElementById('deal-expiry');
        
        if (dealTitle) dealTitle.textContent = deal.title;
        if (dealImage) dealImage.src = deal.image;
        if (dealPrice) dealPrice.textContent = `₹${deal.price}/${deal.unit}`;
        if (dealOriginalPrice) dealOriginalPrice.textContent = `₹${deal.originalPrice}`;
        if (dealDiscount) dealDiscount.textContent = `${deal.discount}% OFF`;
        if (dealDescription) dealDescription.textContent = deal.description;
        if (dealSeller) dealSeller.textContent = deal.seller.name;
        if (dealLocation) dealLocation.textContent = deal.seller.location;
        
        if (dealRating) {
            dealRating.innerHTML = '';
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.className = i < Math.floor(deal.seller.rating) ? 'fas fa-star text-yellow-400' : 'far fa-star text-yellow-400';
                dealRating.appendChild(star);
            }
            dealRating.appendChild(document.createTextNode(` ${deal.seller.rating}`));
        }
        
        if (dealExpiry) {
            const today = new Date();
            const expiryDate = new Date(deal.expiryDate);
            const daysRemaining = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            
            if (daysRemaining <= 0) {
                dealExpiry.textContent = 'Expired';
                dealExpiry.className = 'text-red-600 font-semibold';
            } else {
                dealExpiry.textContent = `Expires in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} (${formatDate(deal.expiryDate)})`;
                dealExpiry.className = daysRemaining <= 5 ? 'text-red-600 font-semibold' : 'text-gray-600';
            }
        }
        
        // Show the modal
        dealModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    }
    
    // Close modals
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');
    
    if (closeModalButtons.length > 0 && modals.length > 0) {
        closeModalButtons.forEach(button => {
            button.addEventListener('click', function() {
                modals.forEach(modal => {
                    modal.classList.add('hidden');
                });
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Filter deals
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const category = document.getElementById('category').value;
            const location = document.getElementById('location').value;
            const priceRange = document.getElementById('price-range').value;
            
            // Filter the data (in a real app, this would make an API call with these filters)
            let filteredDeals = [...deals];
            
            if (category !== 'all') {
                filteredDeals = filteredDeals.filter(deal => deal.category.toLowerCase() === category.toLowerCase());
            }
            
            if (location !== 'all') {
                const locationMap = {
                    'delhi': 'Delhi',
                    'punjab': 'Punjab',
                    'maharashtra': 'Maharashtra',
                    'gujarat': 'Gujarat',
                    'haryana': 'Haryana',
                    'wb': 'West Bengal'
                };
                filteredDeals = filteredDeals.filter(deal => deal.seller.location === locationMap[location]);
            }
            
            if (priceRange !== 'all') {
                const ranges = {
                    'low': [0, 500],
                    'medium': [500, 2000],
                    'high': [2000, 10000]
                };
                
                if (ranges[priceRange]) {
                    filteredDeals = filteredDeals.filter(deal => 
                        deal.price >= ranges[priceRange][0] && deal.price <= ranges[priceRange][1]
                    );
                }
            }
            
            // Update the deals grid with filtered data
            populateDeals(filteredDeals);
            
            // Show a message if no results
            if (filteredDeals.length === 0) {
                const dealsContainer = document.getElementById('deals-container');
                dealsContainer.innerHTML = `
                    <div class="col-span-full py-8 text-center text-gray-500">
                        <i class="fas fa-search text-4xl mb-4"></i>
                        <p>No deals found for the selected filters.</p>
                    </div>
                `;
            }
        });
    }
    
    // Sort deals
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            let sortedDeals = [...deals];
            
            if (sortBy === 'price-low') {
                sortedDeals.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-high') {
                sortedDeals.sort((a, b) => b.price - a.price);
            } else if (sortBy === 'discount') {
                sortedDeals.sort((a, b) => b.discount - a.discount);
            } else if (sortBy === 'expiry') {
                sortedDeals.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
            }
            
            populateDeals(sortedDeals);
        });
    }
    
    // Initialize the page
    populateDeals(deals);
});