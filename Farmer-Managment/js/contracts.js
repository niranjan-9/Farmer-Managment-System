// Contracts functionality for the contracts.html page

document.addEventListener('DOMContentLoaded', function() {
    // Sample contracts data (in a real app, this would come from a database)
    const contracts = [
        {
            id: 1,
            title: 'Wheat Supply Agreement',
            buyer: {
                name: 'Global Foods Ltd.',
                location: 'Delhi',
                rating: 4.8
            },
            crop: 'Wheat',
            quantity: 5000,
            unit: 'kg',
            price: 28,
            totalValue: 140000,
            startDate: '2023-08-01',
            endDate: '2023-12-31',
            status: 'active',
            terms: 'Payment within 15 days of delivery. Quality standards as per FSSAI guidelines.'
        },
        {
            id: 2,
            title: 'Organic Rice Contract',
            buyer: {
                name: 'Organic Exports Inc.',
                location: 'Mumbai',
                rating: 4.9
            },
            crop: 'Basmati Rice',
            quantity: 3000,
            unit: 'kg',
            price: 85,
            totalValue: 255000,
            startDate: '2023-09-01',
            endDate: '2024-02-28',
            status: 'pending',
            terms: 'Organic certification required. Payment in advance for 50% of total value.'
        },
        {
            id: 3,
            title: 'Sugarcane Supply Agreement',
            buyer: {
                name: 'Sweet Sugar Mills',
                location: 'Uttar Pradesh',
                rating: 4.6
            },
            crop: 'Sugarcane',
            quantity: 10000,
            unit: 'kg',
            price: 3.5,
            totalValue: 35000,
            startDate: '2023-10-15',
            endDate: '2024-04-15',
            status: 'active',
            terms: 'Transportation to be arranged by the buyer. Quality to be tested at delivery.'
        },
        {
            id: 4,
            title: 'Cotton Supply Contract',
            buyer: {
                name: 'Textile Industries Ltd.',
                location: 'Gujarat',
                rating: 4.7
            },
            crop: 'Cotton',
            quantity: 2000,
            unit: 'kg',
            price: 65,
            totalValue: 130000,
            startDate: '2023-11-01',
            endDate: '2024-03-31',
            status: 'completed',
            terms: 'Long staple cotton only. Payment within 30 days of delivery.'
        }
    ];
    
    // Sample contract templates
    const contractTemplates = [
        {
            id: 1,
            title: 'Standard Crop Supply Agreement',
            description: 'A general-purpose contract for supplying crops to buyers with standard terms and conditions.',
            suitableFor: ['Grains', 'Vegetables', 'Fruits'],
            popularity: 'High'
        },
        {
            id: 2,
            title: 'Organic Produce Contract',
            description: 'Specialized contract for organic produce with certification requirements and premium pricing.',
            suitableFor: ['Organic Crops', 'Specialty Produce'],
            popularity: 'Medium'
        },
        {
            id: 3,
            title: 'Long-term Supply Agreement',
            description: 'Extended contract for establishing long-term relationships with buyers, including price adjustment mechanisms.',
            suitableFor: ['Staple Crops', 'Industrial Crops'],
            popularity: 'Medium'
        },
        {
            id: 4,
            title: 'Seasonal Harvest Contract',
            description: 'Short-term contract specifically for seasonal crops with flexible delivery schedules.',
            suitableFor: ['Seasonal Fruits', 'Seasonal Vegetables'],
            popularity: 'High'
        }
    ];
    
    // Populate contracts table
    function populateContractsTable(contractsData) {
        const contractsTableBody = document.getElementById('contracts-table-body');
        if (!contractsTableBody) return;
        
        contractsTableBody.innerHTML = '';
        
        contractsData.forEach(contract => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-green-50 transition duration-200';
            
            // Set status class
            let statusClass = '';
            if (contract.status === 'active') {
                statusClass = 'bg-green-100 text-green-800';
            } else if (contract.status === 'pending') {
                statusClass = 'bg-yellow-100 text-yellow-800';
            } else if (contract.status === 'completed') {
                statusClass = 'bg-blue-100 text-blue-800';
            }
            
            row.innerHTML = `
                <td class="py-3 px-4">${contract.title}</td>
                <td class="py-3 px-4">${contract.buyer.name}</td>
                <td class="py-3 px-4">${contract.crop}</td>
                <td class="py-3 px-4">${contract.quantity} ${contract.unit}</td>
                <td class="py-3 px-4">₹${contract.price}/${contract.unit}</td>
                <td class="py-3 px-4">₹${contract.totalValue.toLocaleString()}</td>
                <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${statusClass}">
                        ${contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                    </span>
                </td>
                <td class="py-3 px-4">
                    <div class="flex space-x-2">
                        <button class="view-contract-btn text-blue-600 hover:text-blue-800" data-id="${contract.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="edit-contract-btn text-green-600 hover:text-green-800" data-id="${contract.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-contract-btn text-red-600 hover:text-red-800" data-id="${contract.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            `;
            
            contractsTableBody.appendChild(row);
        });
        
        // Add event listeners to buttons
        document.querySelectorAll('.view-contract-btn').forEach(button => {
            button.addEventListener('click', function() {
                const contractId = parseInt(this.getAttribute('data-id'));
                const contract = contracts.find(c => c.id === contractId);
                
                if (contract) {
                    openViewContractModal(contract);
                }
            });
        });
        
        document.querySelectorAll('.edit-contract-btn').forEach(button => {
            button.addEventListener('click', function() {
                const contractId = parseInt(this.getAttribute('data-id'));
                const contract = contracts.find(c => c.id === contractId);
                
                if (contract) {
                    // In a real app, we would open an edit modal
                    alert('Edit contract functionality would be implemented here.');
                }
            });
        });
        
        document.querySelectorAll('.delete-contract-btn').forEach(button => {
            button.addEventListener('click', function() {
                const contractId = parseInt(this.getAttribute('data-id'));
                
                if (confirm('Are you sure you want to delete this contract?')) {
                    // In a real app, we would delete from the database
                    // For now, just remove from the array and refresh the table
                    const contractIndex = contracts.findIndex(c => c.id === contractId);
                    if (contractIndex !== -1) {
                        contracts.splice(contractIndex, 1);
                        populateContractsTable(contracts);
                    }
                }
            });
        });
    }
    
    // Populate contract templates
    function populateContractTemplates(templatesData) {
        const templatesContainer = document.getElementById('templates-container');
        if (!templatesContainer) return;
        
        templatesContainer.innerHTML = '';
        
        templatesData.forEach(template => {
            const templateCard = document.createElement('div');
            templateCard.className = 'bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:shadow-xl hover:scale-105';
            
            templateCard.innerHTML = `
                <h3 class="text-xl font-semibold text-green-800 mb-2">${template.title}</h3>
                <p class="text-gray-600 mb-4">${template.description}</p>
                <div class="mb-4">
                    <span class="text-gray-700 font-medium">Suitable for:</span>
                    <div class="flex flex-wrap mt-1">
                        ${template.suitableFor.map(item => `
                            <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2 mb-2">${item}</span>
                        `).join('')}
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-500">Popularity: ${template.popularity}</span>
                    <button class="use-template-btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300" data-id="${template.id}">
                        Use Template
                    </button>
                </div>
            `;
            
            templatesContainer.appendChild(templateCard);
        });
        
        // Add event listeners to use template buttons
        document.querySelectorAll('.use-template-btn').forEach(button => {
            button.addEventListener('click', function() {
                const templateId = parseInt(this.getAttribute('data-id'));
                const template = contractTemplates.find(t => t.id === templateId);
                
                if (template) {
                    openNewContractModal(template);
                }
            });
        });
    }
    
    // Open view contract modal
    function openViewContractModal(contract) {
        const viewContractModal = document.getElementById('view-contract-modal');
        if (!viewContractModal) return;
        
        // Update modal content with contract details
        const contractTitle = document.getElementById('contract-title');
        const buyerName = document.getElementById('buyer-name');
        const buyerLocation = document.getElementById('buyer-location');
        const buyerRating = document.getElementById('buyer-rating');
        const cropDetails = document.getElementById('crop-details');
        const contractDates = document.getElementById('contract-dates');
        const contractValue = document.getElementById('contract-value');
        const contractTerms = document.getElementById('contract-terms');
        const contractStatus = document.getElementById('contract-status');
        
        if (contractTitle) contractTitle.textContent = contract.title;
        if (buyerName) buyerName.textContent = contract.buyer.name;
        if (buyerLocation) buyerLocation.textContent = contract.buyer.location;
        if (buyerRating) {
            buyerRating.innerHTML = '';
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.className = i < Math.floor(contract.buyer.rating) ? 'fas fa-star text-yellow-400' : 'far fa-star text-yellow-400';
                buyerRating.appendChild(star);
            }
            buyerRating.appendChild(document.createTextNode(` ${contract.buyer.rating}`));
        }
        
        if (cropDetails) cropDetails.textContent = `${contract.crop} - ${contract.quantity} ${contract.unit} at ₹${contract.price}/${contract.unit}`;
        if (contractDates) contractDates.textContent = `${formatDate(contract.startDate)} to ${formatDate(contract.endDate)}`;
        if (contractValue) contractValue.textContent = `₹${contract.totalValue.toLocaleString()}`;
        if (contractTerms) contractTerms.textContent = contract.terms;
        
        if (contractStatus) {
            let statusClass = '';
            if (contract.status === 'active') {
                statusClass = 'bg-green-100 text-green-800';
            } else if (contract.status === 'pending') {
                statusClass = 'bg-yellow-100 text-yellow-800';
            } else if (contract.status === 'completed') {
                statusClass = 'bg-blue-100 text-blue-800';
            }
            
            contractStatus.className = `px-3 py-1 rounded-full text-sm font-semibold ${statusClass}`;
            contractStatus.textContent = contract.status.charAt(0).toUpperCase() + contract.status.slice(1);
        }
        
        // Show the modal
        viewContractModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    // Open new contract modal
    function openNewContractModal(template) {
        const newContractModal = document.getElementById('new-contract-modal');
        if (!newContractModal) return;
        
        // Update modal title with template name
        const modalTitle = document.getElementById('new-contract-modal-title');
        if (modalTitle && template) {
            modalTitle.textContent = `New Contract - ${template.title}`;
        }
        
        // Show the modal
        newContractModal.classList.remove('hidden');
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
    
    // New Contract Button
    const newContractBtn = document.getElementById('new-contract-btn');
    const newContractModal = document.getElementById('new-contract-modal');
    
    if (newContractBtn && newContractModal) {
        newContractBtn.addEventListener('click', function() {
            // Open new contract modal without a template
            openNewContractModal();
        });
    }
    
    // New Contract Form Submission
    const newContractForm = document.getElementById('new-contract-form');
    if (newContractForm) {
        newContractForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const contractTitle = document.getElementById('contract-title-input').value;
            const buyerName = document.getElementById('buyer-name-input').value;
            const buyerLocation = document.getElementById('buyer-location-input').value;
            const cropType = document.getElementById('crop-type').value;
            const quantity = document.getElementById('quantity').value;
            const unit = document.getElementById('unit').value;
            const price = document.getElementById('price').value;
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            const terms = document.getElementById('terms').value;
            
            // Validate form
            if (!contractTitle || !buyerName || !buyerLocation || !cropType || !quantity || !unit || !price || !startDate || !endDate) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Calculate total value
            const totalValue = parseFloat(quantity) * parseFloat(price);
            
            // Create new contract
            const newContract = {
                id: contracts.length + 1,
                title: contractTitle,
                buyer: {
                    name: buyerName,
                    location: buyerLocation,
                    rating: 5.0 // Default rating for new buyers
                },
                crop: cropType,
                quantity: parseFloat(quantity),
                unit: unit,
                price: parseFloat(price),
                totalValue: totalValue,
                startDate: startDate,
                endDate: endDate,
                status: 'pending',
                terms: terms
            };
            
            // Add to contracts array
            contracts.push(newContract);
            
            // Update the UI
            populateContractsTable(contracts);
            
            // Close the modal
            newContractModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            newContractForm.reset();
            
            // Show success message
            alert('Contract created successfully! It is now pending approval from the buyer.');
        });
    }
    
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('bg-white', 'text-green-600', 'border-green-600'));
                tabContents.forEach(content => content.classList.add('hidden'));
                
                // Add active class to clicked button
                this.classList.add('bg-white', 'text-green-600', 'border-green-600');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.remove('hidden');
                }
            });
        });
    }
    
    // Initialize the page
    populateContractsTable(contracts);
    populateContractTemplates(contractTemplates);
});