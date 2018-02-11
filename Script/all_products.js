let allProductNameSpace = (function() {
  function modelObj() {
    this.categories = [
      "All",
      "Switches",
      "Switchboxes",
      "Appliances",
      "Fans",
      "Lights",
      "Flexible cables",
      "Water Heater",
      "Cable",
      "Motor"
    ];
    this.allProducts = [{
        id: "product1",
        name: "Animated dysfunctional lampAnimated dysfunctional lampAnimated dysfunctional lampAnimated dysfunctional lampAnimated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[2]
      },
      {
        id: "product2",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      },
      {
        id: "product3",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[1]
      },
      {
        id: "product4",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      },
      {
        id: "product5",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[1]
      },
      {
        id: "product6",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      },
      {
        id: "product7",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[1]
      },
      {
        id: "product8",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      },
      {
        id: "product9",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[1]
      },
      {
        id: "product10",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      },
      {
        id: "product11",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[1]
      },
      {
        id: "product12",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      },
      {
        id: "product13",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[1]
      },
      {
        id: "product14",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      },
      {
        id: "product15",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[3]
      },
      {
        id: "product16",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[1]
      },
    ]

  }
  let model = new modelObj();

  let octopus = {

    init: function() {
      productDisplayView.init();
      filterDisplayView.init();
      mapDisplay.init();
    },
    addToCart: function(addToCartElem,product) {
      window.localStorage.setItem(product.id, JSON.stringify(product));
      productDisplayView.addToCartTextCange(addToCartElem);
      productDisplayView.renderCartItemNumber();
    },
    getAllProducts: function() {
      return model.allProducts;
    },
    getAllCategories: function() {
      return model.categories;
    },
    onCategorising: function(categoryElem,allCheckMark) {
      let productsToShow = [];
      categoryElem.querySelector("input")==allCheckMark? allCheckMark.checked=true:allCheckMark.checked=false;
      let checkedCategories = filterDisplayView.allCategoriesElem.filter(function(x) {
        return x.querySelector("input").checked;
      });
      if(checkedCategories.length==0) {
        allCheckMark.checked = true;
      }
      checkedCategories = filterDisplayView.allCategoriesElem.filter(function(x) {
        return x.querySelector("input").checked;
      });
      let checkedNames = checkedCategories.map(function(x) {return x.querySelector("label").innerText;});
      if (checkedNames.includes("All")) {
        filterDisplayView.uncheckCategories(checkedCategories);
        allCheckMark.checked = true;
        checkedNames = ["All"];
        productsToShow = octopus.getAllProducts();
      } else {
        model.allProducts.forEach(function(product) {
          if (checkedNames.includes(product.category)) {
            productsToShow.push(product);
          };
        });
      }
      productDisplayView.renderProducts(productsToShow);
    },
  };
  let productDisplayView = {
    viewPortElem: "",
    init: function() {
      this.viewPortElem = document.getElementById('display');
      this.renderProducts(octopus.getAllProducts());
      this.renderCartItemNumber();
    },
    renderProducts: function(allProducts) {
      let addElement = '';
      let productCard;
      let addToCartButton;
      this.viewPortElem.innerHTML = '';
      for (product in allProducts) {
        productCard = document.createElement('figure');
        productCard.className = "card";
        addElement = '<div class="image"><img class="product-image" src="' + allProducts[product].image + '" alt="sq-sample4" /><a href="javascript:void(0)" class="addToCart">Add to Cart</a></div><figcaption><h2><a class="product-title" href="Product.html">' + allProducts[product].name + '</a></h2><p>' + allProducts[product].description + '</p><div class="price">' + allProducts[product].price + '</div></figcaption>'
        productCard.insertAdjacentHTML('beforeend', addElement);
        this.viewPortElem.appendChild(productCard);
        addToCartButton = productCard.getElementsByClassName('addToCart')[0];
        addToCartButton.addEventListener('click',octopus.addToCart.bind(null,addToCartButton,allProducts[product]), false);
      };
    },
    renderCartItemNumber: function(){
      const element = document.getElementById("cartItemNumber");
      element.innerText = localStorage.length;
    },
    addToCartTextCange: function(addToCart) {
      addToCart.innerText = "Added To Cart";
    },
  };
  let filterDisplayView = {
    filterElem: "",
    allColor: "",
    allCategories: "",
    allCategoriesElem: [],
    init: function() {
      this.filterElem = document.getElementById('sidebar');
      this.renderCategoryFilter();
    },
    renderCategoryFilter: function() {
      let addElement = '';
      const categoriesViewElem = this.filterElem.getElementsByClassName('categories')[0].querySelector("ul");
      let categoryElem;
      let checkMark;
      let allCheckMark;
      allCategories = octopus.getAllCategories();
      allCategories.forEach(function(category) {
        categoryElem = document.createElement('li');
        addElement = '<label class="listContainer">' + category + '<input type="checkbox"><span class="checkmark"></span></label>';
        categoryElem.insertAdjacentHTML('beforeend', addElement);
        if (category == "All") {
          allCheckMark = categoryElem.querySelector("input");
          allCheckMark.checked = true;
        }
        categoriesViewElem.appendChild(categoryElem);
        filterDisplayView.allCategoriesElem.push(categoryElem);
        checkMark = categoryElem.getElementsByClassName("checkmark")[0];
        categoryElem.addEventListener('click', octopus.onCategorising.bind(null,categoryElem,allCheckMark), false);
      });
    },
    uncheckCategories: function(checkedCategories) {
      checkedCategories.forEach(function(checkedCategory) {
        checkedCategory.querySelector("input").checked = false;
      });
    }
  };
  let mapDisplay = {
    init: function() {
      this.render();
    },
    render: function() {
      let mapOptions = {
        center: new google.maps.LatLng(23.026090, 72.566324),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      let map = new google.maps.Map(document.getElementById("map"), mapOptions);
      let marker = new google.maps.Marker({
        position: {
          lat: 23.025961,
          lng: 72.566322
        },
        map: map
      });
    }
  }
  window.onload = octopus.init();
})();
