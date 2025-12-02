# Frontend Payment Flow

A multi-step checkout flow built with HTML, CSS, and JavaScript.

## Features
- Multi-step checkout flow: Summary → Personal Info → Address → Payment → Review → Success
- Form validation (required fields, email, card number, CVV)
- Card masking (only last 4 digits visible in review)
- Inline error messages
- Loading state during payment submission
- Responsive design (desktop, tablet, mobile)

## Project Structure
├── assets
  ├── css
    ├── style.css
  ├── js
    ├── main.js
├── index.html
├── README.md

## How to Run Locally
1. Clone the repository:
```bash
git clone <repository-url>
```
2. Open index.html in your browser.

Usage

Fill in personal info, address, and payment details.

Review your info and click "Pay Now".

Success message will appear.

Future Improvements

Integrate with a real payment API

Add ARIA accessibility features

Add animations for step transitions
