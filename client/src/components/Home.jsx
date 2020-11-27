import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  useParams,
} from "react-router-dom";

// external components
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// styles
import logo from "../assets/logo.svg";
import "./css/home.css";
// context
import { GlobalContext } from "../GlobalContext";
// util
import { getProducts } from "./api";
import getSymbolFromCurrency from "currency-symbol-map";

function Home() {
  const history = useHistory();
  const { user } = useContext(GlobalContext);
  return (
    <>
      <div className="home">
        <header>
          <div className="left">
            <Typography color="primary" variant="h4">
              Kisaan
            </Typography>
          </div>
          <div className="right">
            {!user ? (
              <>
                <Button onClick={() => history.push("/login")} color="primary">
                  Log in
                </Button>
                <Button
                  onClick={() => history.push("/signup")}
                  variant="outlined"
                  color="primary"
                >
                  Sign up
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </header>
        <Products />
      </div>
      <div className="quick-actions">
        <Fab variant="extended" color="primary" style={{ color: "white" }}>
          <ShoppingCartIcon />
          <span style={{ marginLeft: "8px" }}>Cart</span>
        </Fab>
        <Fab variant="extended" color="primary" style={{ color: "white" }}>
          <AddShoppingCartIcon />
          <span style={{ marginLeft: "8px" }}>sell</span>
        </Fab>
      </div>
    </>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  return (
    <div className="products">
      {products.map((p, i) => (
        <Product key={i} product={p} />
      ))}
    </div>
  );
}

function Product({ product }) {
  console.log(product);

  return (
    <div className="product">
      <div className="details">
        <Typography className="product-display-title" variant="h4">
          {product.name}
        </Typography>
        <div className="about">
          <Typography variant="h6">
            {product.cost.value +
              " " +
              getSymbolFromCurrency(product.cost.currency) +
              "/kg"}
          </Typography>
          <Typography variant="subtitle2">
            available amount: {product.amount} kg
          </Typography>
        </div>
      </div>
      <div className="main-product-image">
        <img src={product.images[0]} alt="" />
      </div>
    </div>
  );
}

export default Home;
