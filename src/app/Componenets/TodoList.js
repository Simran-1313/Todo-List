import TodoItem from '@/app/Componenets/TodoItem';

const TodoList = ({ tasks, editTask, deleteTask }) => {
  return (
    <div className='max-w-md  mx-auto' >
      <h2 className='text-2xl mb-5 text-center font-medium text-gray-500' >All Tasks</h2>
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TodoList;
