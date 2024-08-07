import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import NotificationManager from './components/NotificationManager';
import { auth, db } from '../utils/firebase/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const todosRef = collection(db, 'todos');
          const q = query(todosRef, where('userId', '==', user.uid), orderBy('timestamp', 'desc'));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const todosList = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            }));
            setTodos(todosList);
          } else {
            setTodos([]);
          }
        } catch (error) {
          console.error("Error fetching todos: ", error);
        }
      };
      fetchData();
    } else {
      setTodos([]);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={
          <>
            <TodoForm />
            <TodoList todos={todos} />
            <NotificationManager todos={todos} />
          </>
        } />
      </Route>
    </Routes>
  );
};

export default App;
