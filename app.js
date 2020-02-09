// Listen for submit form event
document.querySelector('#loan-form').addEventListener('submit', function(e) {
    // Hide results
    document.getElementById('results').style.display = 'none';
    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResult, 3000);
    e.preventDefault();
});

// Calculate Result
function calculateResult() {

    // User interface variables
    const loanAmount = document.getElementById('amount');
    const interestRate = document.getElementById('interest');
    const yearsOfPayment = document.getElementById('years');

    const monthlyPayment = document.getElementById('montly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // Calculating part
    const principal = parseFloat(loanAmount.value);
    const calculatedInterest = parseFloat(interestRate.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearsOfPayment.value) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    const totalPaymentResult = monthly * calculatedPayments;

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = totalPaymentResult.toFixed(2);
        totalInterest.value = (totalPaymentResult - principal).toFixed(2);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
    }
    else {
        showError('Please check your numbers and that you entered all values');
    }
}

// Error function
function showError(message) {
    // Create a div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class for error
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(message));

    document.getElementById('loading').style.display = 'none';

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 5 seconds
    setTimeout(clearError, 5000);
}

// Clear error
function clearError() {
    document.querySelector('.alert').remove();
}