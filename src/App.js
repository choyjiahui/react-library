import "./App.css";
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { books } from "./data";
import Bookinfo from "./pages/BookInfo";
import Cart from "./pages/Cart";
import { counter } from "@fortawesome/fontawesome-svg-core";
// import { isContentEditable } from "@testing-library/user-event/dist/utils";

function App() {
  const [cart, setCart] = useState([]);

  // function addToCart(book) {
  //   const dupeItem = cart.find((item) => +item.id === +book.id);
  //   if (dupeItem) {
  //     setCart(
  //       cart.map((item) => {
  //         if (item.id === dupeItem.id) {
  //           return {
  //             ...item,
  //             quantity: item.quantity + 1,
  //           };
  //         } else {
  //           return item;
  //         }
  //       })
  //     );
  //   } else {
  //     setCart([...cart, { ...book, quantity: 1 }]);
  //   }
  //   // console.log(cart) //log empty array
  // }

  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        //loop every single item in the array, if the one passing in has the quantity changing. change the quantity
        item.id === book.id //quantity get from event.target.value
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
      )
    );
  }

  function removeItem(item) {
    setCart(cart.filter(book => book.id !== item.id)) //keep in the array if id dont match
   // console.log("removeItem", item)
  }

  function numberOfItems() {
    let counter = 0
    cart.forEach(item => {
      counter += item.quantity
    }) 
    return counter
  }
 

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <Router>
      <div className="App">
        {<Nav numberOfItems={numberOfItems()}/> /* pass in return () instead of function */ }
        <Routes>
          <Route path="/" element={<Home />} />
          {/* books does not render home component */}
          {/* <Home /> */}
          <Route path="/books" element={<Books books={books} cart={cart} />} />
          {/* send prop to route of actual component */}
          <Route
            path="/books/:id"
            element={
              <Bookinfo books={books} addToCart={addToCart} cart={cart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
