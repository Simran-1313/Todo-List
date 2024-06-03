'use client'
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import TodoForm from '@/app/Componenets/TodoForm';
import TodoList from '@/app/Componenets/TodoList';
import SearchBox from '@/app/Componenets/SearchBox';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Flag for initial load

  // Effect hook to load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    setIsInitialLoad(false);
  }, []);

  // Effect hook to save tasks to local storage when tasks change (excluding initial load)
  useEffect(() => {
    if (!isInitialLoad) { // Prevent saving during initial load
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isInitialLoad]);

  // Function to add a new task
  const addTask = (task) => {
    // Assign a unique ID to the new task using Date.now()
    setTasks([...tasks, { ...task, id: Date.now() }]);
    toast.success('New Task Added Successfully');
  };

  // Function to edit an existing task
  const editTask = (updatedTask) => {
    // Update the task with the matching ID
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    toast.success('Task Saved Successfully');
  };

   // Function to delete an existing task
  const deleteTask = (taskToDelete) => {
    // Filter out the task with the matching ID
    setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
    toast.success('Task Deleted Successfully');
  };

  // Filtering tasks based on search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="max-w-lg mx-auto mt-16">
      <Toaster />
      <div className="space-y-12">
        <h1 className="text-gray-600 font-bold text-5xl text-center">Todo List</h1>
        <SearchBox className='max-w-xs mx-auto' searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <TodoForm addTask={addTask} />
        {filteredTasks.length > 0 ? (
          <TodoList tasks={filteredTasks} editTask={editTask} deleteTask={deleteTask} />
        ) : (
          <p className="text-center text-gray-500">No tasks available</p>
        )}
      </div>
    </main>
  );
}
