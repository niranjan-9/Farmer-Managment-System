// Market data functionality for the market-prices.html page

document.addEventListener('DOMContentLoaded', function() {
    // Sample market price data (in a real app, this would come from an API)
    const marketPriceData = [
        { crop: 'Rice', variety: 'Basmati', location: 'Punjab', market: 'Wholesale', price: 3850, change: '+120', lastUpdated: '2023-07-15' },
        { crop: 'Rice', variety: 'Sona Masuri', location: 'Andhra Pradesh', market: 'Mandi', price: 2950, change: '+80', lastUpdated: '2023-07-15' },
        { crop: 'Wheat', variety: 'Sharbati', location: 'Madhya Pradesh', market: 'Wholesale', price: 2450, change: '-30', lastUpdated: '2023-07-15' },
        { crop: 'Wheat', variety: 'Lokwan', location: 'Maharashtra', market: 'Mandi', price: 2350, change: '+45', lastUpdated: '2023-07-15' },
        { crop: 'Corn', variety: 'Yellow', location: 'Karnataka', market: 'Wholesale', price: 1850, change: '+25', lastUpdated: '2023-07-15' },
        { crop: 'Sugarcane', variety: 'CO-86032', location: 'Uttar Pradesh', market: 'Wholesale', price: 350, change: '+10', lastUpdated: '2023-07-15' },
        { crop: 'Cotton', variety: 'Long Staple', location: 'Gujarat', market: 'Wholesale', price: 6750, change: '-120', lastUpdated: '2023-07-15' },
        { crop: 'Tomato', variety: 'Hybrid', location: 'Maharashtra', market: 'Retail', price: 4500, change: '+500', lastUpdated: '2023-07-15' },
        { crop: 'Onion', variety: 'Red', location: 'Maharashtra', market: 'Retail', price: 2200, change: '-300', lastUpdated: '2023-07-15' },
        { crop: 'Potato', variety: 'Kufri Jyoti', location: 'Uttar Pradesh', market: 'Retail', price: 1800, change: '+200', lastUpdated: '2023-07-15' }
    ];
    
    // Historical price data for charts (in a real app, this would come from an API)
    const historicalPriceData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: {
            'Rice': [3200, 3300, 3450, 3600, 3700, 3730, 3850],
            'Wheat': [2300, 2350, 2400, 2500, 2480, 2430, 2450],
            'Corn': [1700, 1750, 1780, 1800, 1820, 1830, 1850],
            'Sugarcane': [320, 330, 335, 340, 345, 340, 350],
            'Cotton': [6900, 6850, 6800, 6750, 6800, 6870, 6750],
            'Tomato': [2500, 2800, 3200, 3600, 4000, 4200, 4500],
            'Onion': [2800, 2600, 2500, 2400, 2300, 2500, 2200],
            'Potato': [1500, 1550, 1600, 1650, 1700, 1750, 1800]
        }
    };
    
    // Populate the price table
    function populatePriceTable(data) {
        const tableBody = document.getElementById('price-table-body');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-green-50 transition duration-200';
            
            // Format the change value with color
            const changeClass = item.change.startsWith('+') ? 'text-green-600' : 'text-red-600';
            
            row.innerHTML = `
                <td class="py-3 px-4">${item.crop}</td>
                <td class="py-3 px-4">${item.variety}</td>
                <td class="py-3 px-4">${item.location}</td>
                <td class="py-3 px-4">${item.market}</td>
                <td class="py-3 px-4">₹${item.price}</td>
                <td class="py-3 px-4 ${changeClass}">${item.change}</td>
                <td class="py-3 px-4">${formatDate(item.lastUpdated)}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    }
    
    // Initialize price chart
    function initializePriceChart() {
        const ctx = document.getElementById('price-chart');
        if (!ctx) return;
        
        // Default to showing Rice prices
        const selectedCrop = 'Rice';
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: historicalPriceData.labels,
                datasets: [{
                    label: `${selectedCrop} Price (₹/Quintal)`,
                    data: historicalPriceData.datasets[selectedCrop],
                    borderColor: '#16a34a',
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `₹${context.raw} per Quintal`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Price (₹/Quintal)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Month (2023)'
                        }
                    }
                }
            }
        });
        
        // Update chart when crop type changes
        const cropTypeSelect = document.getElementById('crop-type');
        if (cropTypeSelect) {
            cropTypeSelect.addEventListener('change', function() {
                const selectedCrop = this.value === 'all' ? 'Rice' : this.value.charAt(0).toUpperCase() + this.value.slice(1);
                
                // Check if we have data for this crop
                if (historicalPriceData.datasets[selectedCrop]) {
                    chart.data.datasets[0].label = `${selectedCrop} Price (₹/Quintal)`;
                    chart.data.datasets[0].data = historicalPriceData.datasets[selectedCrop];
                    chart.update();
                }
            });
        }
        
        // Apply filters button
        const applyFiltersBtn = document.getElementById('apply-filters');
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', function() {
                const cropType = document.getElementById('crop-type').value;
                const location = document.getElementById('location').value;
                const marketType = document.getElementById('market-type').value;
                
                // Filter the data (in a real app, this would make an API call with these filters)
                let filteredData = [...marketPriceData];
                
                if (cropType !== 'all') {
                    const cropName = cropType.charAt(0).toUpperCase() + cropType.slice(1);
                    filteredData = filteredData.filter(item => item.crop === cropName);
                }
                
                if (location !== 'all') {
                    const locationMap = {
                        'punjab': 'Punjab',
                        'haryana': 'Haryana',
                        'up': 'Uttar Pradesh',
                        'mp': 'Madhya Pradesh',
                        'gujarat': 'Gujarat',
                        'maharashtra': 'Maharashtra',
                        'karnataka': 'Karnataka'
                    };
                    filteredData = filteredData.filter(item => item.location === locationMap[location]);
                }
                
                if (marketType !== 'all') {
                    const marketMap = {
                        'wholesale': 'Wholesale',
                        'retail': 'Retail',
                        'mandi': 'Mandi',
                        'export': 'Export'
                    };
                    filteredData = filteredData.filter(item => item.market === marketMap[marketType]);
                }
                
                // Update the table with filtered data
                populatePriceTable(filteredData);
                
                // Show a message if no results
                if (filteredData.length === 0) {
                    const tableBody = document.getElementById('price-table-body');
                    tableBody.innerHTML = `
                        <tr>
                            <td colspan="7" class="py-4 text-center text-gray-500">No results found for the selected filters.</td>
                        </tr>
                    `;
                }
            });
        }
    }
    
    // SMS Alerts Modal
    const smsAlertsBtn = document.getElementById('sms-alerts-btn');
    const smsAlertModal = document.getElementById('sms-alert-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    if (smsAlertsBtn && smsAlertModal) {
        smsAlertsBtn.addEventListener('click', function() {
            smsAlertModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeModalButtons.length > 0 && smsAlertModal) {
        closeModalButtons.forEach(button => {
            button.addEventListener('click', function() {
                smsAlertModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Close modal when clicking outside
    if (smsAlertModal) {
        smsAlertModal.addEventListener('click', function(e) {
            if (e.target === smsAlertModal) {
                smsAlertModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // SMS Alert Form Submission
    const smsAlertForm = document.getElementById('sms-alert-form');
    if (smsAlertForm) {
        smsAlertForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phoneNumber = document.getElementById('phone-number').value;
            const alertFrequency = document.getElementById('alert-frequency').value;
            const preferredLanguage = document.getElementById('preferred-language').value;
            
            // Get selected crops
            const selectedCrops = [];
            smsAlertForm.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                selectedCrops.push(checkbox.value);
            });
            
            // Validate form
            if (!phoneNumber) {
                alert('Please enter your phone number');
                return;
            }
            
            if (selectedCrops.length === 0) {
                alert('Please select at least one crop for alerts');
                return;
            }
            
            // Simulate form submission
            alert(`SMS alerts enabled for ${selectedCrops.join(', ')}. You will receive ${alertFrequency} updates in ${preferredLanguage}.`);
            smsAlertModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            smsAlertForm.reset();
        });
    }
    
    // Price History Button
    const priceHistoryBtn = document.getElementById('price-history-btn');
    if (priceHistoryBtn) {
        priceHistoryBtn.addEventListener('click', function() {
            // Scroll to the chart section
            const chartSection = document.querySelector('.bg-white.rounded-lg.shadow-md.p-6.mb-8');
            if (chartSection) {
                chartSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Initialize the page
    populatePriceTable(marketPriceData);
    initializePriceChart();
});