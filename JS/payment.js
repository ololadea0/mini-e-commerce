document.addEventListener('DOMContentLoaded', function() {
    const checkoutPara = document.getElementById('checkout-message');
    const paymentButton = document.getElementById('payment-btn');

    function calculateTotal() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart.reduce((total, item) => total + item.price * item.quantity, 0) * 100;
    }
    const amount = calculateTotal();
    const amountInNaira = (amount / 100);




    checkoutPara.innerHTML =
        `<p class="text-center text mb-4">Please provide your details to finalize your order of ₦${amountInNaira}. </p> 
    `;
    paymentButton.innerHTML = `<button type="submit" class="btn btn-dark mt-3" style="float: right;">Pay ₦${amountInNaira} Now</button>`


    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('customer-email').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const phone = document.getElementById('phone').value;




        if (!email || amount < 100) {
            displayError("Invalid Checkout Details")
            return;
        }


        localStorage.setItem('customerInfo', JSON.stringify({ firstName, lastName, email, phone }));
        localStorage.setItem('lastPaidAmount', JSON.stringify(amount));


        let fullName = `${firstName} ${lastName}`




        const popup = new PaystackPop();
        popup.newTransaction({

            key: 'pk_test_609fae4110c16493c366f38824ece2e1308ed360',
            email: email,
            amount: amount,
            currency: 'NGN',
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            ref: '' + Math.floor(Math.random() * 1000000000 + 1),
            metadata: {
                custom_fields: [{
                        display_name: "Customer Name",
                        variable_name: "customer_name",
                        value: fullName
                    },
                    {
                        display_name: "Phone Number",
                        variable_name: "phone_number",
                        value: phone
                    }
                ]
            },
            onSuccess: (transaction) => {
                console.log(transaction);
                displaySuccess("Payment successful! Transaction ref: " + transaction.reference)
                window.location.href = 'final-page.html'
            },
            onLoad: (response) => {
                console.log("onLoad: ", response);
            },
            onCancel: () => {
                console.log("onCancel");
                displayError("Transaction cancelled");
            },
            onError: (error) => {
                console.log("Error: ", error.message);
                displayError(error.message);
            }
        });




    });



    function displayError(errorMessage) {

        const errorContainer = document.getElementById('error-container');

        errorContainer.style.display = 'block';



        errorContainer.innerHTML = errorMessage;

        setTimeout(function() {
            errorContainer.style.display = 'none';
        }, 2500);
    }

    function displaySuccess(successMessage) {

        const successContainer = document.getElementById('success-container');

        successContainer.style.display = 'block';


        successContainer.innerHTML = successMessage;

        setTimeout(function() {
            errorContainer.style.display = 'none';
        }, 4000);
    }
});