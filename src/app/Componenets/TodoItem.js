'use client'
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const TodoItem = ({ task, editTask, deleteTask }) => {
  const { id, title, description } = task;
  const [isEditing, setIsEditing] = useState(false); // State to track if the task is being edited
  const [newTitle, setNewTitle] = useState(title); // State for the edited title
  const [newDescription, setNewDescription] = useState(description); // State for the edited description
  const [isExpanded, setIsExpanded] = useState(false); // State to track if the description is expanded

  // Effect to reset the title and description when editing starts
  useEffect(() => {
    if (isEditing) {
      setNewTitle(title);
      setNewDescription(description);
    }
  }, [isEditing, title, description]);

  // Handler function for saving the edited task
  const handleEdit = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      toast.error('Title and description cannot be empty');
      return;
    }
    editTask({ id, title: newTitle, description: newDescription }); // Call the editTask function with updated values
    setIsEditing(false); // Exit editing mode
    toast.success('Task Saved Successfully');
  };

  // Function to get the truncated description or full description if expanded
  const getDescription = (description) => {
    const maxLength = 95; // Set the maximum length for the truncated description
    if (description.length <= maxLength || isExpanded) {
      return description;
    }
    return description.slice(0, maxLength) + '...'; // Truncate and add ellipsis
  };

  // Function to toggle the expanded state of the description
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div>
      {isEditing ? (
        <div className='max-w-md mx-auto min-h-[8rem] p-4 mb-8 border-gray-400 border-[2px] rounded-xl'>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          ></textarea>
          <button
            className='w-[4rem] text-center h-[2.5rem] hover:bg-[#008080]/90 hover:text-white'
            onClick={handleEdit}
          >
            Save
          </button>
        </div>
      ) : (
        <div className='flex max-w-md min-h-[8rem] mx-auto mb-6 p-4 border-gray-400 border-[2px] rounded-xl'>
          <div>
            <h3 className='text-xl font-semibold text-teal-600 mb-2'>{title}</h3>
            <p className='w-[10rem] text-gray-700 text-sm break-words'>
              {getDescription(description)}
              {description.length > 95 && (
                <div
                  onClick={toggleExpand}
                  className="text-blue-500 ml-2 cursor-pointer"
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </div>
              )}
            </p>
          </div>
          <div className='flex w-full justify-end'>
            <button
              className='w-[4rem] text-center h-[2.5rem]'
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className='w-[5rem] text-center h-[2.5rem] hover:bg-[#ff0116] transition-all ease-out duration-300 hover:text-white'
              onClick={() => deleteTask(task)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
