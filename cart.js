document.getElementById('infoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form input values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const currentYear = new Date().getFullYear();
    const birthYear = dob.split('/')[2];
    const age = currentYear - birthYear;

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

function toggleMenu() {
    var menuList = document.getElementById("menuList");
    if (menuList.style.display === "none" || menuList.style.display === "") {
        menuList.style.display = "block";
    } else {
        menuList.style.display = "none";
    }
}
