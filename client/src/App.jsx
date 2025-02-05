import React, { useEffect } from 'react';
import useStore from './store/useStore';
import { Toaster } from 'react-hot-toast';
import { formatTime } from './utils/formatTime';
import { CirclePlus, Loader, CircleCheck, Trash2 } from 'lucide-react';
const App = () => {
  const { todo, setTodo, AddTask, GetTask, Alltask, DeleteTask ,UpdateTask,isComplete} = useStore();
  const { isLoading } = useStore((state) => state);


  useEffect(() => {
    GetTask();
  }, []);

  const handleAddTask = () => {
    if (!todo.trim()) return;

    AddTask(todo);
    setTodo('');
  };

  return (
    <div className='min-h-screen w-full bg-gradient-to-tl from-indigo-800 to-indigo-900 flex flex-col items-center'>
      <div className='w-1/2 h-22 rounded-xl bg-zinc-400 mt-20 pl-5 flex'>
        <input
          type="text"
          placeholder='Enter task...'
          className='size-full rounded-xl outline-none border-none'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button disabled={isLoading}
          className='bg-zinc-900 text-white cursor-pointer px-5 py-1 rounded-r-xl'
          onClick={handleAddTask} 
        >
          {isLoading ? <Loader /> : <CirclePlus />}
        </button>
      </div>
      <div className='h-fit w-full flex flex-wrap  justify-start gap-5 pl-32 mt-20'>


        {Alltask && Alltask.map((item, id) => (
          <div className='h-fit border bg-zinc-400 p-5  rounded-xl flex flex-col justify-center items-start' key={item._id}>
            <h1 className='text-emerald-700 font-semibold text-xl '>Task {1 + id} : <span className='text-blue-800'>{item.title}</span></h1>
            <p className='text-xs text-black font-medium'>{formatTime(item.created_at)}</p>
            <p className='text-white'>{item.completed ? 'Completed' : 'Not Completed'}</p>
            <div className='flex gap-2'>


              <button className='bg-zinc-600 p-1 rounded-lg cursor-pointer mt-4' onClick={() => UpdateTask(item)}><CircleCheck className='text-green-400' /></button>
              <button className='bg-zinc-600 p-1 rounded-lg cursor-pointer mt-4' onClick={() => DeleteTask(item)}><Trash2 className='text-rose-500' /></button>
            </div>
          </div>
        ))}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
