import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import NotificationManager from "./components/NotificationManager";
import { auth, db } from "../utils/firebase/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import "./index.css";
import { pizzaData } from "./data/data";

const App = () => {
  // const [todos, setTodos] = useState([]);
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     setUser(user);
  //     setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     const fetchData = async () => {
  //       try {
  //         const todosRef = collection(db, 'todos');
  //         const q = query(todosRef, where('userId', '==', user.uid), orderBy('timestamp', 'desc'));
  //         const querySnapshot = await getDocs(q);
  //         if (!querySnapshot.empty) {
  //           const todosList = querySnapshot.docs.map(doc => ({
  //             ...doc.data(),
  //             id: doc.id
  //           }));
  //           setTodos(todosList);
  //         } else {
  //           setTodos([]);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching todos: ", error);
  //       }
  //     };
  //     fetchData();
  //   } else {
  //     setTodos([]);
  //   }
  // }, [user]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
    // <Routes>
    //   <Route path='/signup' element={<Signup />} />
    //   <Route path='/login' element={<Login />} />
    //   <Route element={<ProtectedRoute />}>
    //     <Route path='/' element={
    //       <>
    //         <TodoForm />
    //         <TodoList todos={todos} />
    //         <NotificationManager todos={todos} />
    //       </>
    //     } />
    //   </Route>
    // </Routes>
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
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
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

export default App;
