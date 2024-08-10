import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../index.css";
import { pizzaData } from "../data/data";

const PizzaApp = () => {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );

  function Header() {
    return (
      <header className="header">
        <h1>Fast Pizza and Pepperoni co.</h1>
      </header>
    );
  }
  function Menu() {
    // let pizza = pizzaData;
    return (
      <main className="menu">
        <h2>Our Menu</h2>
        {pizzaData.length > 0 ? (
          <>
          <p>Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic and delicious.</p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
          </>
        ): <p>We're still working on our menu. Please come back later :)</p>}
      </main>
    );
  }

  function Pizza({pizzaObj}) {
    return (
      <li className={`pizza ${pizzaObj.soldOut && "sold-out"}`}>
        <img src={pizzaObj.photoUrl} alt={pizzaObj.name} />
        <div>
          <h3>{pizzaObj.name}</h3>
          <p>{pizzaObj.ingredients}</p>
          <span>
            {pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}
          </span>
        </div>
      </li>
    );
  }

  function Footer() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    const openHour = 12;
    const closeHour = 22;

    if (currentTime >= openHour && currentTime < closeHour) {
      setIsOpen(true);
    }
    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date();
        setCurrentTime(now);

        const currentHour = now.getHours();

        if (currentHour >= openHour && currentHour < closeHour) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }, 1000);

      return () => clearInterval(timer);
    }, []);
    return (
      <footer className="footer">
      <Order isOpen={isOpen} currentTime={currentTime} closeHour={closeHour} openHour={openHour} />
      </footer>
    );
  }

  function Order({currentTime, isOpen, closeHour, openHour}){
    return(
      <div className="order">
      {currentTime.toLocaleTimeString()} We are currently{" "}
      {isOpen
        ? `open till ${closeHour}:00. Come visit us or order online.`
        : `closed till ${openHour}:00`}
      !<button className="btn">order</button>
    </div>
    )
  }
};

export default PizzaApp;
