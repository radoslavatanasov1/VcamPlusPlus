// Scroll-in animation using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const options = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
  });
});

// Button hover effect
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.1)';
    button.style.transition = 'transform 0.3s ease';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("buyNowModal");
  const openButtons = document.querySelectorAll(".buy-now-button"); // Buy Now buttons
  const closeButton = document.querySelector(".modal .delete");
  const cancelButton = document.querySelector(".modal-card-foot .button.is-light");
  const confirmButton = document.getElementById("confirmPurchase");

  let selectedPaymentLink = ""; // To store the payment link based on the option

  // Open modal and set payment link
  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const option = event.target.dataset.option; // Get the option from data-attribute
      if (option === "rootfull") {
        selectedPaymentLink = "https://nowpayments.io/payment/?iid=4824170674"; // RootFull link
      } else if (option === "rootless") {
        selectedPaymentLink = "https://nowpayments.io/payment/?iid=6363949662"; // RootLess link
      }
      modal.classList.add("is-active");
    });
  });

  // Close modal
  const closeModal = () => modal.classList.remove("is-active");
  closeButton.addEventListener("click", closeModal);
  cancelButton.addEventListener("click", closeModal);

  // Confirm purchase
  confirmButton.addEventListener("click", () => {
    const name = document.querySelector('#purchaseForm input[type="text"]').value;
    const email = document.querySelector('#purchaseForm input[type="email"]').value;

    if (!name || !email) {
      alert("Please fill in all required fields.");
      return;
    }

    // Redirect to the selected payment link
    window.location.href = selectedPaymentLink;
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const confirmButton = document.getElementById('confirmPurchase');

  confirmButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#purchaseForm input[type="text"]').value;
    const email = document.querySelector('#purchaseForm input[type="email"]').value;
    const selectedCategory = document.querySelector('.buy-now-button.is-active')?.dataset.option;

    if (!name || !email || !selectedCategory) {
      alert('Please fill in all required fields and select a category.');
      return;
    }

    try {
      const response = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, category: selectedCategory }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('NICE!');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    }
  });

  // Add event listeners to mark selected category
  const buyButtons = document.querySelectorAll('.buy-now-button');
  buyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      buyButtons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
    });
  });
});
