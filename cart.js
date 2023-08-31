// Initialize the cartItems array to store the cart items
let cartItems = [];

// Function to add items to the cart
function addToCart(itemName, itemPrice) {
    const item = {
        name: itemName,
        price: itemPrice,
    };
    cartItems.push(item);
    updateCartCount();
    displayCartItems();
    alert(`${itemName} added to cart.`);
}

// Function to update the cart count on the cart icon
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.dataset.count = cartItems.length;
}

// Function to display the cart items on the page
// ... (your existing code)

// Function to display the cart items on the page
function displayCartItems() {
    const cartItemsSection = document.getElementById("cartItems");
    cartItemsSection.innerHTML = ''; // Clear the existing content

    if (cartItems.length === 0) {
        cartItemsSection.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        const table = document.createElement('table');
        table.className = 'cart-table';
        const tableHeader = table.createTHead();
        const headerRow = tableHeader.insertRow();
        const headers = ['Item', 'Price', 'Quantity', 'Actions'];
        headers.forEach(headerText => {
            const headerCell = document.createElement('th');
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        });

        const tableBody = table.createTBody();
        cartItems.forEach((item, index) => {
            const row = tableBody.insertRow();
            const itemNameCell = row.insertCell();
            itemNameCell.textContent = item.name;

            const itemPriceCell = row.insertCell();
            itemPriceCell.textContent = `$${item.price}`;

            const quantityCell = row.insertCell();
            quantityCell.textContent = 1; // Set the initial quantity (you can modify this based on your requirements)

            const actionsCell = row.insertCell();
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                deleteItem(index);
            };
            actionsCell.appendChild(deleteButton);
        });

        cartItemsSection.appendChild(table);
    }
}


// Function to delete an item from the cart
function deleteItem(index) {
    if (index >= 0 && index < cartItems.length) {
        cartItems.splice(index, 1);
        updateCartCount();
        displayCartItems();
    }
}


document.getElementById('infoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form input values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Calculate age based on Date of Birth
    const currentYear = new Date().getFullYear();
    const birthYear = dob.split('/')[2];
    const age = currentYear - birthYear;

    // Apply string methods and build the confirmation message
    let confirmationMessage = '';
    const methods = [
        'toUpperCase',
        'toLowerCase',
        'substring',
        'trim',
        'trimStart'
    ];

    const numberMethods = [
        'toFixed',
        'toPrecision',
        'valueOf',
        'toString',
        'toExponential'
    ];


    methods.forEach(method => {
        switch (method) {
            case 'toUpperCase':
                confirmationMessage += `First Name: ${firstName.toUpperCase()}\n`;
                break;
            case 'toLowerCase':
                confirmationMessage += `Last Name: ${lastName.toLowerCase()}\n`;
                break;
            case 'substring':
                // Display last three digits of phone number
                const lastThreeDigits = phoneNumber.substring(phoneNumber.length - 3);
                confirmationMessage += `Number ending with : ${lastThreeDigits}\n`;
                break;
            case 'trim':
                confirmationMessage += email.trim() + '\n';
                break;
            case 'trimStart':
                confirmationMessage += message.trimStart() + '\n';
                break;
        }
    });

    numberMethods.forEach(method => {
        switch (method) {
            case 'toFixed':
                if (!isNaN(age)) {
                    confirmationMessage += `Age (Fixed Decimal): ${age.toFixed(2)}\n`;
                } else {
                    confirmationMessage += `Age calculation failed\n`;
                }    
            break;
            case 'toPrecision':
                confirmationMessage += `Age (Precision 3): ${age.toPrecision(3)}\n`;
                break;
            case 'valueOf':
                confirmationMessage += `Value Of Age: ${age.valueOf()}\n`;
                break;
            case 'toString':
                confirmationMessage += `Age (String): ${age.toString()}\n`;
                break;
            case 'toExponential':
                confirmationMessage += `Age (Exponential): ${age.toExponential()}\n`;
                break;
        }
    });

    

    // Ask for user confirmation 
    const isConfirmed = window.confirm(`Please review the following information:\n\n${confirmationMessage}\nIs this correct?`);
 
    if (isConfirmed) {
        // Display greeting
        const greetingMessage = "Hello ".concat(firstName, " " + lastName, "! Thank you for your message. We will contact you at ",email, ".");
        document.getElementById('greetingMessage').textContent = greetingMessage;

        // Show the greeting div
        const greetingDiv = document.querySelector('.greeting-container');
        greetingDiv.style.display = 'block';
    }
});