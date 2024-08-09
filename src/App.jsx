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
    return (
      <main className="menu">
        <h2>Our Menu</h2>
        <Pizza
          name="Pizza Margherita"
          ingredients="Tomato and mozarella"
          price={10}
          photoUrl="assets/margherita.jpg"
          soldOut={false}
        />
        <Pizza />
        <Pizza />
      </main>
    );
  }

  function Pizza(props) {
    console.log(props);
    return (
      <div className="pizza">
        <img src={props.photoUrl} alt={props.name} />
        <div>
          <h3>{props.name}</h3>
          <p>{props.ingredients}</p>
          <span>{props.price}</span>
        </div>
      </div>
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
        {currentTime.toLocaleTimeString()} We are currently{" "}
        {isOpen ? "open" : "close"}!
      </footer>
    );
  }
};

export default App;
