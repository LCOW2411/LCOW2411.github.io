document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('products');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const taxAmountElement = document.getElementById('tax-amount');
    const clearCartButton = document.getElementById('clear-cart-button');
    const checkoutButton = document.getElementById('checkout-button');
    const thankYouPopup = document.getElementById('thank-you-popup');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                
                const img = document.createElement('img');
                img.src = product.image;
                img.dataset.hoverImage = product.hoverImage;
                img.alt = product.name;
                
                img.addEventListener('mouseover', () => {
                    img.src = img.dataset.hoverImage;
                });
                img.addEventListener('mouseout', () => {
                    img.src = product.image;
                });
                
                const name = document.createElement('h3');
                name.textContent = product.name;
                
                const price = document.createElement('p');
                price.textContent = `$${product.price.toFixed(2)}`;
                
                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Add to Cart';
                addToCartButton.addEventListener('click', () => addToCart(product));
                
                productDiv.appendChild(img);
                productDiv.appendChild(name);
                productDiv.appendChild(price);
                productDiv.appendChild(addToCartButton);
                
                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            if (item && item.name && item.price && item.quantity) {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                
                const name = document.createElement('p');
                name.textContent = `${item.name} x ${item.quantity}`;
                
                const price = document.createElement('p');
                price.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
                
                cartItem.appendChild(name);
                cartItem.appendChild(price);
                
                cartItems.appendChild(cartItem);
                
                total += item.price * item.quantity;
            }
        });

        const taxRate = 0.13; // 13% tax
        const tax = total * taxRate;
        const totalWithTax = total + tax;

        totalPriceElement.innerHTML = `Subtotal: $${total.toFixed(2)}<br>Tax (13%): $${tax.toFixed(2)}<br>Total: $${totalWithTax.toFixed(2)}`;
        taxAmountElement.innerText = `Tax: $${tax.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    clearCartButton.addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            thankYouPopup.style.display = 'flex'; // Show the popup
            setTimeout(() => {
                thankYouPopup.style.display = 'none'; // Hide the popup
                localStorage.removeItem('cart');
                cart = [];
                updateCart();
            }, 3000); // 3 seconds delay
        }
    });

    updateCart();
});
