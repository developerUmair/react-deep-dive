import { useEffect, useState } from "react";

const NotificationManager = ({ todos }) => {
    const [notifiedTodos, setNotifiedTodos] = useState([]);

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        const checkNotifications = () => {
            const now = new Date();
            todos.forEach(todo => {
                const dueDate = new Date(todo.dueDate.seconds * 1000);
                if (dueDate <= now && !notifiedTodos.includes(todo.id)) {
                    new Notification(`Reminder`, { body: `It's time to: ${todo.task}` });
                    setNotifiedTodos(prevNotified => [...prevNotified, todo.id]);
                }
            });
        };

        const intervalId = setInterval(checkNotifications, 60000);
        return () => clearInterval(intervalId);
    }, [todos, notifiedTodos]);

    return null;
};

export default NotificationManager;
