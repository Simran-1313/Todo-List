'use client'
import { useState } from 'react';
import toast from 'react-hot-toast';
const TodoForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
     // Check if title or description is empty
    if (!title.trim() || !description.trim()) {
      toast.error('Title and description cannot be empty');
      return;
    }
    
     // Call addTask function with title and description as arguments
    addTask({ title, description });
      // Clear title and description fields after adding task
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit" className='w-full h-[3rem] text-xl font-semibold bg-[#008080]/90 text-white' >Add Task</button>
    </form>
  );
};

export default TodoForm;
