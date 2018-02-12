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
    this.allProducts = [
      {
        id: "product1",
        name: "Animated dysfunctional lampAnimated dysfunctional lampAnimated dysfunctional lampAnimated dysfunctional lampAnimated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[2]
      }, {
        id: "product2",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      }, {
        id: "product3",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[1]
      }, {
        id: "product4",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      }, {
        id: "product5",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[1]
      }, {
        id: "product6",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      }, {
        id: "product7",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[1]
      }, {
        id: "product8",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      }, {
        id: "product9",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[1]
      }, {
        id: "product10",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      }, {
        id: "product11",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[1]
      }, {
        id: "product12",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      }, {
        id: "product13",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[1]
      }, {
        id: "product14",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[2]
      }, {
        id: "product15",
        name: "Animated dysfunctional lamp",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "1560 Rs",
        image: "Images/lamp1.jpg",
        category: this.categories[3]
      }, {
        id: "product16",
        name: "Antique Fan",
        description: "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized.",
        price: "800 Rs",
        image: "Images/fan1.jpg",
        category: this.categories[1]
      }
    ]
  }
  let model = new modelObj();

  let octopus = {

    init: function() {
      view.init();
      mapDisplay.init();
    },
    addToCart: function(product) {
      window.localStorage.setItem(product.id, JSON.stringify(product));
      view.renderCartItemNumber();
    },
    getAllProducts: function() {
      return model.allProducts;
    },
    getAllCategories: function() {
      return model.categories;
    },
    onCategorising: function(allCheckMark) {
      let productsToShow = [];
      if (allCheckMark[0] == "All") {
        productsToShow = octopus.getAllProducts();
      } else {
        productsToShow = model.allProducts.filter((product) => allCheckMark.includes(product.category));
      }
      return productsToShow;
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

  function FigImage(props) {
    return (<div className="image">
      <img className="product-image" src={props.image} alt="sq-sample4"/>
      <a href="javascript:void(0)" class="addToCart" onClick={props.onClick}>
        {
          !props.inCart
            ? "Add To Cart"
            : "Added To Cart"
        }
      </a>
    </div>);
  }

  function FigCaption(props) {
    return (<figcaption>
      <h2>
        <a className="product-title" href="Product.html">{props.name}</a>
      </h2>
      <p>{props.description}</p>
      <div className="price">{props.price}</div>
    </figcaption>);
  }

  class Figure extends React.Component {

    constructor(props) {
      super(props);
      this.addToCart = this.addToCart.bind(this);
      this.state = {
        inCart: false
      };
    }

    addToCart() {
      this.setState({inCart: true});
      octopus.addToCart(this.props.product);
    }

    render() {
      const product = this.props.product;
      return (<figure className="card">
        <FigImage image={product.image} onClick={this.addToCart} inCart={this.state.inCart}/>
        <FigCaption name={product.name} price={product.price} description={product.description}/>
      </figure>);
    }

  }

  function ProductView(props) {
    const allProducts = props.allProducts;
    const allProductsElem = allProducts.map((product) => <Figure key={product.id} product={product}/>);
    return (<div className="container col-10" id="display">
      {allProductsElem}
    </div>);
  }

  function Category(props) {
    return (<li >
      <label className="listContainer">
        {props.name}
        <input type="checkbox" onClick={props.onClick} checked={props.isOn}/>
        <span className="checkmark"></span>
      </label>
    </li>);
  }

  function FilterView(props) {
    return (<div id="sidebar" className="col-2">
      <h3>CATEGORIES</h3>
      <div className="categories checklist">
        <ul>
          {props.allCategories.map((category) => <Category onClick={() => props.onClick(category)} name={category} key={category} isOn={props.selectedCategories.includes(category)}/>)}
        </ul>
      </div>
    </div>);
  }

  class Display extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        products: octopus.getAllProducts(),
        selectedCategories: ["All"],
        allCategories: octopus.getAllCategories()
      };
      this.categorySelected = this.categorySelected.bind(this);
    }

    categorySelected(category) {
      let categories = this.state.selectedCategories;
      let index = categories.indexOf(category)
      if (index == -1) {
        if (category != "All") {
          categories.push(category);
          categories = categories.filter((cat) => cat != "All");
        } else {
          categories = ["All"];
        }
      } else {
        categories = categories.filter((cat) => cat != category);
        if (categories.length == 0)
          categories.push("All");
        }
      this.setState({selectedCategories: categories, products: octopus.onCategorising(categories)});

    }

    render() {
      return (<React.Fragment>
        <FilterView onClick={this.categorySelected} selectedCategories={this.state.selectedCategories} allCategories={this.state.allCategories}/>
        <ProductView allProducts={this.state.products}/>
      </React.Fragment>);
    }

  }
  let view = {
    init: function() {
      ReactDOM.render(<Display/>, document.getElementById('display'));
      view.renderCartItemNumber();
    },
    renderCartItemNumber: function(){
      const element = document.getElementById("cartItemNumber");
      element.innerText = localStorage.length;
    }
  }

  window.onload = octopus.init();
})();
