import axios from 'axios';
console.log('stripe script loaded');
// Create a Stripe client.
var stripe = Stripe('pk_test_tc2ZIjM9l97cZEYO1oiyfXWP');

// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style, hidePostalCode: true});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

console.log('card element', card);

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      //stripeTokenHandler(result.token);
      var donationAmount = document.getElementById('donationAmount').value
      axios.post('http://localhost:8000/commit', {
        "balance": donationAmount
      })
        .then(function (response) {
          window.localStorage.setItem('farmerToken', response.data)
          document.getElementById('donationButton').innerHTML = "Thank you for donating, your games will begin shortly..";
          setTimeout(() => {
            initSession();
          }, 2000)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
});
