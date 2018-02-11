let cartNameSpace = (function() {
  let octopus = {
    cartProducts: [],
    init: function() {
      this.getCartProductsFromStorage();
      cartView.init();
    },
    getCartProductsFromStorage: function() {
      this.cartProducts = [];
      Object.keys(localStorage).forEach(function(key) {
        let product = JSON.parse(localStorage[key]);
        octopus.cartProducts.push(product);
      });
    },
    getAllCartProducts: function() {
      return this.cartProducts;
    },
    calculateProductTotal: function(product, quantity) {
      product.total = parseInt(product.price.split(" ")[0]) * quantity;
      return product.total;
    },
    checkAndCorrectInput: function(cartProductElement) {
      let quantityElement = cartProductElement.getElementsByClassName('qty')[0];
      let quantity = parseInt(quantityElement.value);
      if (isNaN(quantity) || quantity <= 0) {
        cartView.renderProductQuantity(quantityElement, 1);
      } else if (quantity > 10) {
        cartView.renderProductQuantity(quantityElement, 10);
      }
    },
    calculateGrandTotal: function() {
      let total = 0;
      this.cartProducts.forEach(function(product) {
        total += product.total;
      });
      return total;
    },
    calculateTax: function(total) {
      return total * 0.05;
    },
    onQuantityChange: function(product, cartProductElement) {
      octopus.checkAndCorrectInput(cartProductElement);
      let quantityInput = cartProductElement.getElementsByClassName('qty')[0];
      let productTotal = octopus.calculateProductTotal(product, quantityInput.value);
      let grandTotal = octopus.calculateGrandTotal();
      let tax = octopus.calculateTax(grandTotal);
      cartView.renderProductTotal(cartProductElement, productTotal);
      cartView.renderBillingAmount(grandTotal, tax);
    },
    onRemove: function(product, productElement) {
      localStorage.removeItem(product.id);
      octopus.remove(product);
      cartView.removeProduct(productElement);
      let grandTotal = octopus.calculateGrandTotal();
      cartView.renderBillingAmount(grandTotal, octopus.calculateTax(grandTotal));
    },
    remove: function(element) {
      const index = this.cartProducts.indexOf(element);
      this.cartProducts.splice(index, 1);
    },
  };
  let cartView = {
    cartDisplayElem: '',
    init: function() {
      this.cartDisplayElem = document.getElementById('cart-body');
      this.renderAllCartProducts();
    },
    renderAllCartProducts: function() {
      let addElement = '';
      let cartProductElement;
      let inputElement;
      let grandTotal;
      let productTotal;
      this.cartDisplayElem.innerHTML = '';
      cartProducts = octopus.getAllCartProducts();
      cartProducts.forEach(function(product) {
        cartProductElement = document.createElement('tr');
        cartProductElement.className = "product";
        addElement = '<td><img src="' + product.image + '"></td><td><a href="#">' + product.name + '</a></td><td class="text-right product-price">' + product.price + '</td><td class="text-center product-quantity"><input type="number" class="qty" value="1" min="1"></td><td class="product-removal"><button class="remove-product">Remove</button></td><td class="text-right product-line-price"></td>';
        cartProductElement.insertAdjacentHTML('beforeend', addElement);
        cartView.cartDisplayElem.appendChild(cartProductElement);
        productTotal = octopus.calculateProductTotal(product, 1);
        cartView.renderProductTotal(cartProductElement, productTotal);
        cartProductElement.getElementsByClassName('qty')[0].addEventListener('change',
          octopus.onQuantityChange.bind(octopus, product, cartProductElement), false);
        cartProductElement.getElementsByClassName('remove-product')[0].addEventListener('click',
          octopus.onRemove.bind(octopus, product, cartProductElement), false);
      });
      grandTotal = octopus.calculateGrandTotal();
      cartView.renderBillingAmount(grandTotal, octopus.calculateTax(grandTotal));
    },
    renderProductQuantity: function(quantityElement, quantity) {
      quantityElement.value = quantity.toString();
    },
    renderProductTotal: function(productElement, productTotal) {
      productElement.getElementsByClassName('product-line-price')[0].textContent = productTotal + " Rs";
    },
    renderBillingAmount: function(grandTotal, tax) {
      let cartSubTotalElement = document.getElementById('cart-subtotal');
      let cartTaxElement = document.getElementById('cart-tax');
      let cartGrandTotalElement = document.getElementById('cart-grandtotal');
      cartTaxElement.textContent = tax.toFixed(2) + ' Rs';
      cartSubTotalElement.textContent = grandTotal.toFixed(2) + ' Rs';
      cartGrandTotalElement.textContent = (grandTotal + tax + 50).toFixed(2) + ' Rs';
    },
    removeProduct: function(productElement) {
      productElement.parentNode.removeChild(productElement);
    }
  };
  octopus.init();
})();
