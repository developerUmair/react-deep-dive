import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase/firebase';

const TodoForm = () => {
  const initialData = {
    task: '',
    dueDate: '',
    dueTime: ''
  };
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        task: formData.task,
        timestamp: serverTimestamp(),
        dueDate: new Date(`${formData.dueDate}T${formData.dueTime}`),
        userId: auth.currentUser.uid // Ensure to add userId to the todo
      });
      console.log("Document written with ID: ", docRef.id);
      setFormData(initialData);
    } catch (error) {
      console.error("Error adding document: ", error);
      setError('Failed to add todo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="task" 
        value={formData.task} 
        placeholder='Enter Todo' 
        onChange={handleChange} 
        required 
      />
      <input 
        type="date" 
        name="dueDate" 
        value={formData.dueDate} 
        placeholder='Due Date' 
        onChange={handleChange} 
        required 
      />
      <input 
        type="time" 
        name="dueTime" 
        value={formData.dueTime} 
        placeholder='Due Time' 
        onChange={handleChange} 
        required 
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default TodoForm;
