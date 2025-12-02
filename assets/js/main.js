const steps = document.querySelectorAll('.step');
let currentStep = 0;

function showStep(step) {
    steps.forEach((s, i) => {
        s.classList.toggle('active', i === step);
    });
}

function validateForm(form) {
    let valid = true;
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        const errorSpan = input.nextElementSibling;
        if (!input.value.trim()) {
            valid = false;
            errorSpan.textContent = 'This field is required';
            input.classList.add('error-input');
        } else {
            errorSpan.textContent = '';
            input.classList.remove('error-input');
        }
        if (input.type === 'email' && input.value) {
            const re = /\S+@\S+\.\S+/;
            if (!re.test(input.value)) {
                valid = false;
                errorSpan.textContent = 'Enter a valid email';
                input.classList.add('error-input');
            }
        }
        if (input.name === 'card' && input.value) {
            const digits = input.value.replace(/\s+/g, '');
            if (!/^\d{16}$/.test(digits)) {
                valid = false;
                errorSpan.textContent = 'Enter a valid 16-digit card number';
                input.classList.add('error-input');
            }
        }
        if (input.name === 'cvv' && input.value) {
            if (!/^\d{3}$/.test(input.value)) {
                valid = false;
                errorSpan.textContent = 'Enter a valid 3-digit CVV';
                input.classList.add('error-input');
            }
        }
    });
    return valid;
}

// Mask card input
document.querySelector('input[name="card"]').addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    val = val.match(/.{1,4}/g)?.join(' ') || '';
    e.target.value = val;
});

document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const form = steps[currentStep].querySelector('form');
        if (form && !validateForm(form)) return;
        currentStep++;
        if (currentStep === steps.length - 2) fillReview();
        showStep(currentStep);
    });
});

document.querySelectorAll('.prev-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentStep--;
        showStep(currentStep);
    });
});

function fillReview() {
    const reviewDiv = document.getElementById('review-info');
    const personal = Object.fromEntries(new FormData(document.getElementById('personal-form')));
    const address = Object.fromEntries(new FormData(document.getElementById('address-form')));
    const payment = Object.fromEntries(new FormData(document.getElementById('payment-form')));
    const maskedCard = '**** **** **** ' + payment.card.slice(-4);
    reviewDiv.innerHTML = `
        <h3>Personal Info:</h3>
        <p>${personal.name} | ${personal.email}</p>
        <h3>Address:</h3>
        <p>${address.street}, ${address.city}, ${address.zip}, ${address.country}</p>
        <h3>Payment:</h3>
        <p>Card: ${maskedCard}</p>
    `;
}

document.querySelector('.confirm-btn').addEventListener('click', () => {
    const btn = document.querySelector('.confirm-btn');
    btn.textContent = 'Processing...';
    btn.disabled = true;
    setTimeout(() => {
        currentStep++;
        showStep(currentStep);
        document.getElementById('payment-result').innerHTML = '<p style="color:green;font-weight:bold;">Payment Successful! Thank you.</p>';
    }, 2000);
});

showStep(currentStep);
