let cartNameSpace = (function() {
  let octopus = {
    cartProducts: [],
    init: function() {
      this.getCartProductsFromStorage();
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
      product.total = parseInt(product.price.split(" ")[0]) * parseInt(quantity);
      return product.total;
    },
    calculateGrandTotal: function() {
      let total = 0;
      this.cartProducts.forEach(function(product) {
        total += parseInt(product.total);
      });
      return total;
    },
    calculateTax: function(total) {
      return total * 0.05;
    },
    onRemove: function(product) {
      localStorage.removeItem(product.id);
      octopus.remove(product);
      return this.cartProducts;
    },
    remove: function(element) {
      const index = this.cartProducts.indexOf(element);
      this.cartProducts.splice(index, 1);
    }
  };

  class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          qty: 1,
          productTotal: octopus.calculateProductTotal(this.props.product,1),
        };
        this.onQuantityChange=this.onQuantityChange.bind(this);
    }

    onQuantityChange(event) {
      let quantity = parseInt(event.target.value);
      if (isNaN(quantity) || quantity <= 0) {
        quantity=1;
      } else if (quantity > 10) {
        quantity=10;
      }

      this.setState({
        qty: quantity,
        productTotal: octopus.calculateProductTotal(this.props.product, quantity),
      });
    }

    render() {
      return (<tr className="product" id={this.props.product.id} >
        <td>
          <img src={this.props.product.image}/>
        </td>
        <td>
          <a href="#">{this.props.product.name}</a>
        </td>
        <td className="text-right product-price">
          {this.props.product.price}
        </td>
        <td className="text-center product-quantity">
          <input
            type="number"
            className="qty"
            value={this.state.qty}
            onChange={
              (e)=>{
                this.onQuantityChange(e);
                this.props.onChange();
              }
            } min="1"/>
        </td>
        <td className="product-removal">
          <button onClick={this.props.onClick} className="remove-product">{"Remove"}</button>
        </td>
        <td className="text-right product-line-price">
          {this.state.productTotal+' Rs'}
        </td>
      </tr>);
    }
  }

  function CartBody(props) {
    return (<tbody id="cart-body">
      {props.cartProducts.map((product) => <Product onChange={props.onChange} onClick={()=>props.onClick(product)} key={product.id} product={product}/>)}
    </tbody>);
  }
  function CartHead(props) {
    return (<thead>
      <tr>
        <th></th>
        <th>Product</th>
        <th className="text-right">Price</th>
        <th>Quantity</th>
        <th></th>
        <th className="text-right">Total</th>
      </tr>
    </thead>);
  }
  function Table(props) {
    return (<table className="cart">
      <CartHead/>
      <CartBody onChange={props.onChange} onClick={(product)=>props.onClick(product)} cartProducts={props.cartProducts}/>
    </table>);
  }
  function TotalTable(props) {
    return (<div className="totals-value">
      <table className="totaler">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td id="cart-subtotal">{props.grandTotal.toFixed(2)+' Rs'}</td>
          </tr>
          <tr>
            <td>Tax</td>
            <td id="cart-tax">{props.tax.toFixed(2)+' Rs'}</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td id="cart-shipping">50.00 Rs</td>
          </tr>
          <tr>
            <td>Estimated Total</td>
            <td id="cart-grandtotal">{(props.grandTotal+props.tax+50).toFixed(2)+' Rs'}</td>
          </tr>
        </tbody>
      </table>
      <div className="button add fright">Checkout</div>
    </div>);
  }

  class CartMain extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cartProducts: octopus.getAllCartProducts(),
        grandTotal: 0,
        tax: 0,
      }
      this.onRemove=this.onRemove.bind(this);
      this.onQuantityChange=this.onQuantityChange.bind(this);
    }

    onRemove(product) {
      const cartProducts = octopus.onRemove(product);
      const total=octopus.calculateGrandTotal();
      this.setState({
        cartProducts: cartProducts,
        grandTotal: total,
        tax: octopus.calculateTax(total),
      });

    }

    onQuantityChange() {
      const total=octopus.calculateGrandTotal();
      this.setState({
        grandTotal: total,
        tax: octopus.calculateTax(total),
      })
    }

    render() {
      return (<div className="main">
        <div className="folderTab clearFix">
          <h3>Shopping Cart</h3>
        </div>
        <div className="botBorder clearFix">
          <Table onChange={this.onQuantityChange} onClick={this.onRemove} cartProducts={this.state.cartProducts}/>
          <TotalTable tax={this.state.tax} grandTotal={this.state.grandTotal} />
        </div>
      </div>);
    }
    componentDidMount() {
      const total=octopus.calculateGrandTotal()
      this.setState({
        grandTotal: total,
        tax: octopus.calculateTax(total),
      })
    }
  }
  octopus.init();
  ReactDOM.render(<CartMain/>, document.getElementById("root"));
})();
