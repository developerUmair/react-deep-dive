import React, { useEffect, useState } from 'react'

const TodoList = ({ todos }) => {
    // const [todos, setTodos] = useState([]);

    // useEffect(() => {

    // }, [])

    return (
        <ul>
            {todos?.map((todo) => (
                <li key={todo.id}>
                    {todo.task} - Added on: {new Date(todo.timestamp.seconds * 1000).toLocaleString()}
                    - Due by: {new Date(todo.dueDate.seconds * 1000).toLocaleString()}
                </li>
            ))}
        </ul>
    )
}

export default TodoList