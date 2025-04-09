// Farm Management functionality for the farm-management.html page

document.addEventListener('DOMContentLoaded', function() {
    // Sample tasks data (in a real app, this would come from a database)
    const tasks = [
        { id: 1, title: 'Apply fertilizer to wheat field', dueDate: '2023-07-20', priority: 'high', status: 'pending', category: 'cultivation' },
        { id: 2, title: 'Repair irrigation system', dueDate: '2023-07-18', priority: 'medium', status: 'completed', category: 'maintenance' },
        { id: 3, title: 'Harvest rice crop', dueDate: '2023-07-25', priority: 'high', status: 'pending', category: 'harvesting' },
        { id: 4, title: 'Purchase new seeds', dueDate: '2023-07-30', priority: 'medium', status: 'pending', category: 'procurement' },
        { id: 5, title: 'Spray pesticides on vegetable garden', dueDate: '2023-07-19', priority: 'high', status: 'pending', category: 'cultivation' }
    ];
    
    // Sample inventory data
    const inventory = [
        { id: 1, name: 'Wheat Seeds', category: 'Seeds', quantity: 500, unit: 'kg', lastUpdated: '2023-07-10' },
        { id: 2, name: 'NPK Fertilizer', category: 'Fertilizers', quantity: 200, unit: 'kg', lastUpdated: '2023-07-12' },
        { id: 3, name: 'Pesticide - Neem Oil', category: 'Pesticides', quantity: 50, unit: 'liters', lastUpdated: '2023-07-15' },
        { id: 4, name: 'Tractor Fuel', category: 'Fuel', quantity: 100, unit: 'liters', lastUpdated: '2023-07-14' },
        { id: 5, name: 'Irrigation Pipes', category: 'Equipment', quantity: 20, unit: 'pieces', lastUpdated: '2023-06-30' }
    ];
    
    // Sample financial data
    const financialTransactions = [
        { id: 1, date: '2023-07-15', description: 'Sold wheat crop', type: 'income', amount: 45000, category: 'Sales' },
        { id: 2, date: '2023-07-12', description: 'Purchased fertilizers', type: 'expense', amount: 8000, category: 'Supplies' },
        { id: 3, date: '2023-07-10', description: 'Tractor maintenance', type: 'expense', amount: 3500, category: 'Equipment' },
        { id: 4, date: '2023-07-05', description: 'Sold vegetables', type: 'income', amount: 12000, category: 'Sales' },
        { id: 5, date: '2023-07-01', description: 'Hired labor for harvesting', type: 'expense', amount: 5000, category: 'Labor' }
    ];
    
    // Populate tasks table
    function populateTasksTable(tasksData) {
        const tasksTableBody = document.getElementById('tasks-table-body');
        if (!tasksTableBody) return;
        
        tasksTableBody.innerHTML = '';
        
        tasksData.forEach(task => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-green-50 transition duration-200';
            
            // Set priority class
            let priorityClass = '';
            if (task.priority === 'high') {
                priorityClass = 'bg-red-100 text-red-800';
            } else if (task.priority === 'medium') {
                priorityClass = 'bg-yellow-100 text-yellow-800';
            } else {
                priorityClass = 'bg-blue-100 text-blue-800';
            }
            
            // Set status class
            let statusClass = '';
            if (task.status === 'completed') {
                statusClass = 'bg-green-100 text-green-800';
            } else {
                statusClass = 'bg-gray-100 text-gray-800';
            }
            
            row.innerHTML = `
                <td class="py-3 px-4">
                    <div class="flex items-center">
                        <input type="checkbox" class="task-checkbox mr-2" data-id="${task.id}" ${task.status === 'completed' ? 'checked' : ''}>
                        <span class="${task.status === 'completed' ? 'line-through text-gray-500' : ''}">${task.title}</span>
                    </div>
                </td>
                <td class="py-3 px-4">${formatDate(task.dueDate)}</td>
                <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${priorityClass}">
                        ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                </td>
                <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${statusClass}">
                        ${task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                </td>
                <td class="py-3 px-4">
                    <div class="flex space-x-2">
                        <button class="edit-task-btn text-blue-600 hover:text-blue-800" data-id="${task.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-task-btn text-red-600 hover:text-red-800" data-id="${task.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            `;
            
            tasksTableBody.appendChild(row);
        });
        
        // Add event listeners to task checkboxes
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const taskId = parseInt(this.getAttribute('data-id'));
                const task = tasks.find(t => t.id === taskId);
                
                if (task) {
                    task.status = this.checked ? 'completed' : 'pending';
                    
                    // Update the UI
                    const taskText = this.nextElementSibling;
                    if (this.checked) {
                        taskText.classList.add('line-through', 'text-gray-500');
                    } else {
                        taskText.classList.remove('line-through', 'text-gray-500');
                    }
                    
                    // In a real app, we would update the database
                }
            });
        });
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-task-btn').forEach(button => {
            button.addEventListener('click', function() {
                const taskId = parseInt(this.getAttribute('data-id'));
                const task = tasks.find(t => t.id === taskId);
                
                if (task) {
                    openEditTaskModal(task);
                }
            });
        });
        
        document.querySelectorAll('.delete-task-btn').forEach(button => {
            button.addEventListener('click', function() {
                const taskId = parseInt(this.getAttribute('data-id'));
                
                if (confirm('Are you sure you want to delete this task?')) {
                    // In a real app, we would delete from the database
                    // For now, just remove from the array and refresh the table
                    const taskIndex = tasks.findIndex(t => t.id === taskId);
                    if (taskIndex !== -1) {
                        tasks.splice(taskIndex, 1);
                        populateTasksTable(tasks);
                    }
                }
            });
        });
    }
    
    // Populate inventory table
    function populateInventoryTable(inventoryData) {
        const inventoryTableBody = document.getElementById('inventory-table-body');
        if (!inventoryTableBody) return;
        
        inventoryTableBody.innerHTML = '';
        
        inventoryData.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-green-50 transition duration-200';
            
            row.innerHTML = `
                <td class="py-3 px-4">${item.name}</td>
                <td class="py-3 px-4">${item.category}</td>
                <td class="py-3 px-4">${item.quantity} ${item.unit}</td>
                <td class="py-3 px-4">${formatDate(item.lastUpdated)}</td>
                <td class="py-3 px-4">
                    <div class="flex space-x-2">
                        <button class="edit-inventory-btn text-blue-600 hover:text-blue-800" data-id="${item.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-inventory-btn text-red-600 hover:text-red-800" data-id="${item.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            `;
            
            inventoryTableBody.appendChild(row);
        });
    }
    
    // Populate financial transactions table
    function populateFinancialTable(transactionsData) {
        const financialTableBody = document.getElementById('financial-table-body');
        if (!financialTableBody) return;
        
        financialTableBody.innerHTML = '';
        
        transactionsData.forEach(transaction => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-green-50 transition duration-200';
            
            // Set transaction type class
            const typeClass = transaction.type === 'income' ? 'text-green-600' : 'text-red-600';
            const amountPrefix = transaction.type === 'income' ? '+' : '-';
            
            row.innerHTML = `
                <td class="py-3 px-4">${formatDate(transaction.date)}</td>
                <td class="py-3 px-4">${transaction.description}</td>
                <td class="py-3 px-4">${transaction.category}</td>
                <td class="py-3 px-4 ${typeClass} font-semibold">${amountPrefix}₹${transaction.amount.toLocaleString()}</td>
                <td class="py-3 px-4">
                    <div class="flex space-x-2">
                        <button class="edit-transaction-btn text-blue-600 hover:text-blue-800" data-id="${transaction.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-transaction-btn text-red-600 hover:text-red-800" data-id="${transaction.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            `;
            
            financialTableBody.appendChild(row);
        });
    }
    
    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    }
    
    // Initialize financial summary
    function initializeFinancialSummary() {
        const totalIncome = financialTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
            
        const totalExpenses = financialTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
            
        const netProfit = totalIncome - totalExpenses;
        
        const incomeSummary = document.getElementById('income-summary');
        const expensesSummary = document.getElementById('expenses-summary');
        const profitSummary = document.getElementById('profit-summary');
        
        if (incomeSummary) incomeSummary.textContent = `₹${totalIncome.toLocaleString()}`;
        if (expensesSummary) expensesSummary.textContent = `₹${totalExpenses.toLocaleString()}`;
        if (profitSummary) profitSummary.textContent = `₹${netProfit.toLocaleString()}`;
        
        // Set profit color based on value
        if (profitSummary) {
            if (netProfit > 0) {
                profitSummary.classList.add('text-green-600');
            } else if (netProfit < 0) {
                profitSummary.classList.add('text-red-600');
            }
        }
    }
    
    // Initialize weather widget
    function initializeWeatherWidget() {
        // In a real app, this would fetch data from a weather API
        // For now, we'll just simulate weather data
        const weatherData = {
            location: 'Punjab, India',
            temperature: 32,
            condition: 'Partly Cloudy',
            humidity: 65,
            windSpeed: 12,
            forecast: [
                { day: 'Today', high: 32, low: 24, condition: 'Partly Cloudy' },
                { day: 'Tomorrow', high: 33, low: 25, condition: 'Sunny' },
                { day: 'Wed', high: 30, low: 23, condition: 'Rain' },
                { day: 'Thu', high: 29, low: 22, condition: 'Rain' },
                { day: 'Fri', high: 31, low: 23, condition: 'Partly Cloudy' }
            ]
        };
        
        const weatherLocation = document.getElementById('weather-location');
        const weatherTemp = document.getElementById('weather-temp');
        const weatherCondition = document.getElementById('weather-condition');
        const weatherHumidity = document.getElementById('weather-humidity');
        const weatherWind = document.getElementById('weather-wind');
        const forecastContainer = document.getElementById('forecast-container');
        
        if (weatherLocation) weatherLocation.textContent = weatherData.location;
        if (weatherTemp) weatherTemp.textContent = `${weatherData.temperature}°C`;
        if (weatherCondition) weatherCondition.textContent = weatherData.condition;
        if (weatherHumidity) weatherHumidity.textContent = `${weatherData.humidity}%`;
        if (weatherWind) weatherWind.textContent = `${weatherData.windSpeed} km/h`;
        
        if (forecastContainer) {
            forecastContainer.innerHTML = '';
            
            weatherData.forecast.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.className = 'text-center';
                
                // Choose icon based on condition
                let weatherIcon = 'fa-sun';
                if (day.condition.includes('Cloud')) {
                    weatherIcon = 'fa-cloud-sun';
                } else if (day.condition.includes('Rain')) {
                    weatherIcon = 'fa-cloud-rain';
                }
                
                dayElement.innerHTML = `
                    <div class="text-sm font-semibold">${day.day}</div>
                    <div class="text-xl my-1"><i class="fas ${weatherIcon}"></i></div>
                    <div class="text-sm">${day.high}° / ${day.low}°</div>
                `;
                
                forecastContainer.appendChild(dayElement);
            });
        }
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
    
    // Add Task Modal
    const addTaskBtn = document.getElementById('add-task-btn');
    const addTaskModal = document.getElementById('add-task-modal');
    const closeAddTaskModal = document.querySelectorAll('.close-add-task-modal');
    
    if (addTaskBtn && addTaskModal) {
        addTaskBtn.addEventListener('click', function() {
            addTaskModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeAddTaskModal.length > 0 && addTaskModal) {
        closeAddTaskModal.forEach(button => {
            button.addEventListener('click', function() {
                addTaskModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Close modal when clicking outside
    if (addTaskModal) {
        addTaskModal.addEventListener('click', function(e) {
            if (e.target === addTaskModal) {
                addTaskModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Add Task Form Submission
    const addTaskForm = document.getElementById('add-task-form');
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const taskTitle = document.getElementById('task-title').value;
            const taskDueDate = document.getElementById('task-due-date').value;
            const taskPriority = document.getElementById('task-priority').value;
            const taskCategory = document.getElementById('task-category').value;
            
            // Validate form
            if (!taskTitle || !taskDueDate || !taskPriority || !taskCategory) {
                alert('Please fill in all fields');
                return;
            }
            
            // Create new task
            const newTask = {
                id: tasks.length + 1,
                title: taskTitle,
                dueDate: taskDueDate,
                priority: taskPriority,
                status: 'pending',
                category: taskCategory
            };
            
            // Add to tasks array
            tasks.push(newTask);
            
            // Update the UI
            populateTasksTable(tasks);
            
            // Close the modal
            addTaskModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            addTaskForm.reset();
        });
    }
    
    // Edit Task Modal
    function openEditTaskModal(task) {
        const editTaskModal = document.getElementById('edit-task-modal');
        if (!editTaskModal) return;
        
        // Populate form with task details
        const editTaskTitle = document.getElementById('edit-task-title');
        const editTaskDueDate = document.getElementById('edit-task-due-date');
        const editTaskPriority = document.getElementById('edit-task-priority');
        const editTaskCategory = document.getElementById('edit-task-category');
        const editTaskStatus = document.getElementById('edit-task-status');
        const editTaskId = document.getElementById('edit-task-id');
        
        if (editTaskTitle) editTaskTitle.value = task.title;
        if (editTaskDueDate) editTaskDueDate.value = task.dueDate;
        if (editTaskPriority) editTaskPriority.value = task.priority;
        if (editTaskCategory) editTaskCategory.value = task.category;
        if (editTaskStatus) editTaskStatus.value = task.status;
        if (editTaskId) editTaskId.value = task.id;
        
        // Show the modal
        editTaskModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    // Close Edit Task Modal
    const closeEditTaskModal = document.querySelectorAll('.close-edit-task-modal');
    const editTaskModal = document.getElementById('edit-task-modal');
    
    if (closeEditTaskModal.length > 0 && editTaskModal) {
        closeEditTaskModal.forEach(button => {
            button.addEventListener('click', function() {
                editTaskModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Close modal when clicking outside
    if (editTaskModal) {
        editTaskModal.addEventListener('click', function(e) {
            if (e.target === editTaskModal) {
                editTaskModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Edit Task Form Submission
    const editTaskForm = document.getElementById('edit-task-form');
    if (editTaskForm) {
        editTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const taskId = parseInt(document.getElementById('edit-task-id').value);
            const taskTitle = document.getElementById('edit-task-title').value;
            const taskDueDate = document.getElementById('edit-task-due-date').value;
            const taskPriority = document.getElementById('edit-task-priority').value;
            const taskCategory = document.getElementById('edit-task-category').value;
            const taskStatus = document.getElementById('edit-task-status').value;
            
            // Validate form
            if (!taskTitle || !taskDueDate || !taskPriority || !taskCategory) {
                alert('Please fill in all fields');
                return;
            }
            
            // Find and update the task
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex] = {
                    ...tasks[taskIndex],
                    title: taskTitle,
                    dueDate: taskDueDate,
                    priority: taskPriority,
                    category: taskCategory,
                    status: taskStatus
                };
                
                // Update the UI
                populateTasksTable(tasks);
            }
            
            // Close the modal
            editTaskModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Initialize the page
    populateTasksTable(tasks);
    populateInventoryTable(inventory);
    populateFinancialTable(financialTransactions);
    initializeFinancialSummary();
    initializeWeatherWidget();
});