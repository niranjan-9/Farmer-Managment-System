// Marketplace functionality for the marketplace.html page

document.addEventListener('DOMContentLoaded', function() {
    // Sample product data (in a real app, this would come from an API)
    const products = [
        {
            id: 1,
            name: 'Premium Basmati Rice',
            description: 'Organically grown premium quality basmati rice. Long grain, aromatic, and perfect for special occasions.',
            price: 85,
            unit: 'kg',
            quantity: 500,
            location: 'Punjab',
            seller: {
                name: 'Gurpreet Singh',
                rating: 4.8,
                verified: true
            },
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            id: 2,
            name: 'Organic Wheat',
            description: 'Chemical-free wheat grown using traditional farming methods. Perfect for making rotis, chapatis, and bread.',
            price: 32,
            unit: 'kg',
            quantity: 1000,
            location: 'Madhya Pradesh',
            seller: {
                name: 'Ramesh Patel',
                rating: 4.6,
                verified: true
            },
            image: 'https://images.unsplash.com/photo-1565530995968-2ea021ef1c0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            id: 3,
            name: 'Fresh Red Tomatoes',
            description: 'Juicy, ripe tomatoes harvested daily. Perfect for salads, curries, and sauces.',
            price: 40,
            unit: 'kg',
            quantity: 100,
            location: 'Maharashtra',
            seller: {
                name: 'Anita Sharma',
                rating: 4.9,
                verified: true
            },
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            id: 4,
            name: 'Alphonso Mangoes',
            description: 'Premium quality Alphonso mangoes, known for their sweetness and rich flavor. Limited seasonal availability.',
            price: 450,
            unit: 'dozen',
            quantity: 50,
            location: 'Maharashtra',
            seller: {
                name: 'Vijay Deshmukh',
                rating: 4.7,
                verified: true
            },
            image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
        },
        {
            id: 5,
            name: 'Organic Turmeric',
            description: 'High-curcumin organic turmeric, freshly harvested. Perfect for cooking and medicinal purposes.',
            price: 180,
            unit: 'kg',
            quantity: 200,
            location: 'Tamil Nadu',
            seller: {
                name: 'Lakshmi Rajan',
                rating: 4.9,
                verified: true
            },
            image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            id: 6,
            name: 'Fresh Sugarcane',
            description: 'Sweet and juicy sugarcane, perfect for extracting juice or direct consumption.',
            price: 25,
            unit: 'kg',
            quantity: 1000,
            location: 'Uttar Pradesh',
            seller: {
                name: 'Rajendra Kumar',
                rating: 4.5,
                verified: true
            },
            image: 'https://images.unsplash.com/photo-1596240898243-9ce233dd9c32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        }
    ];
    
    // Populate the products grid
    function populateProducts(productsData) {
        const productsContainer = document.getElementById('products-container');
        if (!productsContainer) return;
        
        productsContainer.innerHTML = '';
        
        productsData.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-105';
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <div class="flex justify-between items-start">
                        <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                        <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">₹${product.price}/${product.unit}</span>
                    </div>
                    <p class="text-gray-600 text-sm mt-1">${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}</p>
                    <div class="flex justify-between items-center mt-4">
                        <div class="flex items-center">
                            <i class="fas fa-map-marker-alt text-gray-500 mr-1"></i>
                            <span class="text-gray-500 text-sm">${product.location}</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-star text-yellow-400 mr-1"></i>
                            <span class="text-gray-500 text-sm">${product.seller.rating}</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mt-4">
                        <span class="text-gray-500 text-sm">Available: ${product.quantity} ${product.unit}</span>
                        <button class="contact-seller-btn bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-1 px-3 rounded transition duration-300" data-id="${product.id}">
                            Contact Seller
                        </button>
                    </div>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
        
        // Add event listeners to contact seller buttons
        document.querySelectorAll('.contact-seller-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const product = products.find(p => p.id === parseInt(productId));
                
                if (product) {
                    openContactModal(product);
                }
            });
        });
    }
    
    // Open contact seller modal
    function openContactModal(product) {
        const modal = document.getElementById('contact-modal');
        if (!modal) return;
        
        // Update modal content with product details
        const modalTitle = modal.querySelector('h3');
        const sellerName = modal.querySelector('#seller-name');
        const productName = modal.querySelector('#product-name');
        const productImage = modal.querySelector('#product-image');
        
        if (modalTitle) modalTitle.textContent = `Contact ${product.seller.name}`;
        if (sellerName) sellerName.textContent = product.seller.name;
        if (productName) productName.textContent = product.name;
        if (productImage) productImage.src = product.image;
        
        // Show the modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    // Close contact modal
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const contactModal = document.getElementById('contact-modal');
    
    if (closeModalButtons.length > 0 && contactModal) {
        closeModalButtons.forEach(button => {
            button.addEventListener('click', function() {
                contactModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Close modal when clicking outside
    if (contactModal) {
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                contactModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const message = document.getElementById('message').value;
            const quantity = document.getElementById('quantity').value;
            
            // Validate form
            if (!message || !quantity) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            alert('Your message has been sent to the seller. They will contact you soon.');
            contactModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            contactForm.reset();
        });
    }
    
    // Filter products
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const category = document.getElementById('category').value;
            const location = document.getElementById('location').value;
            const priceRange = document.getElementById('price-range').value;
            
            // Filter the data (in a real app, this would make an API call with these filters)
            let filteredProducts = [...products];
            
            // In a real app, we would have more sophisticated filtering
            // For now, we'll just simulate filtering by location
            if (location !== 'all') {
                const locationMap = {
                    'punjab': 'Punjab',
                    'mp': 'Madhya Pradesh',
                    'maharashtra': 'Maharashtra',
                    'tn': 'Tamil Nadu',
                    'up': 'Uttar Pradesh'
                };
                filteredProducts = filteredProducts.filter(product => product.location === locationMap[location]);
            }
            
            // Update the products grid with filtered data
            populateProducts(filteredProducts);
            
            // Show a message if no results
            if (filteredProducts.length === 0) {
                const productsContainer = document.getElementById('products-container');
                productsContainer.innerHTML = `
                    <div class="col-span-full py-8 text-center text-gray-500">
                        <i class="fas fa-search text-4xl mb-4"></i>
                        <p>No products found for the selected filters.</p>
                    </div>
                `;
            }
        });
    }
    
    // Add product modal
    const addProductBtn = document.getElementById('add-product-btn');
    const addProductModal = document.getElementById('add-product-modal');
    
    if (addProductBtn && addProductModal) {
        addProductBtn.addEventListener('click', function() {
            addProductModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close add product modal
    const closeAddProductModal = document.querySelectorAll('.close-add-product-modal');
    
    if (closeAddProductModal.length > 0 && addProductModal) {
        closeAddProductModal.forEach(button => {
            button.addEventListener('click', function() {
                addProductModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Close modal when clicking outside
    if (addProductModal) {
        addProductModal.addEventListener('click', function(e) {
            if (e.target === addProductModal) {
                addProductModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Add product form submission
    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const productName = document.getElementById('product-name-input').value;
            const productDescription = document.getElementById('product-description').value;
            const productPrice = document.getElementById('product-price').value;
            const productUnit = document.getElementById('product-unit').value;
            const productQuantity = document.getElementById('product-quantity').value;
            const productLocation = document.getElementById('product-location').value;
            
            // Validate form
            if (!productName || !productDescription || !productPrice || !productUnit || !productQuantity || !productLocation) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            alert('Your product has been listed successfully!');
            addProductModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            addProductForm.reset();
            
            // In a real app, we would add the new product to the list and refresh the display
        });
    }
    
    // Initialize the page
    populateProducts(products);
});