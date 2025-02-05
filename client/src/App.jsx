import React, { useEffect, useRef, useState } from 'react';
import useStore from './store/useStore';
import { Toaster } from 'react-hot-toast';
import { formatTime } from './utils/formatTime';
import { gsap } from 'gsap';
import { CirclePlus, Loader, CircleCheck, Trash2, Pencil, SendHorizontal, CircleX, SquareCheck } from 'lucide-react';

import SplitType from 'split-type';
const App = () => {
  const { todo, setTodo, AddTask, GetTask, Alltask, DeleteTask, UpdateTask, DisplayUpdate, setDisplayUpdate } = useStore();
  const { isLoading } = useStore((state) => state);
  const { isComplete } = useStore((state) => state);
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    GetTask();
  }, []);


  const handleAddTask = () => {
    if (!todo.trim()) return;

    AddTask(todo);
    setTodo('');
  };
  const handleEdit = (e) => {
    setTodo(e.title)
  }
  const handleComplete = (e) => {
    setDisplayUpdate({ completed: true, ...DisplayUpdate })
    UpdateTask(e)
  }
  const handleEditTitle = (e) => {
    setDisplayUpdate({ name: todo, ...DisplayUpdate })
    UpdateTask(e)
    setEdit(false)
  }
  //animations
  const containerRefs = useRef([]);
  const headingRef = useRef([]);

  useEffect(() => {

    if (Alltask.length > 0) {
      const lastIndex = Alltask.length - 1;
      gsap.fromTo(
        containerRefs.current[lastIndex],
        { scale: 0.3 , opacity:0 },
        { scale: 1,opacity:1, ease: "power3.out", duration: .5 }
      );

    }
  }, [Alltask]);

  useEffect(() => {
    const text = new SplitType(headingRef.current, { types: 'words, chars' });
    gsap.from(text.chars, {
      opacity: 0,
      y: 10,
      scale:0,
      stagger: 0.02,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, [])

  return (
    <div className='min-h-screen w-full bg-gradient-to-tl from-indigo-800 to-indigo-900 flex flex-col items-center'>
      <h1 ref={headingRef} className='text-xl font-semibold text-white  pt-5'>Task Management App</h1>
      <div className='w-1/2 h-22 rounded-xl bg-zinc-400 mt-20 pl-5 flex'>
        <input
          type="text"
          placeholder='Enter task...'
          className='size-full rounded-xl outline-none border-none'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button disabled={isLoading}
          className={` ${edit ? "bg-transparent" : " bg-zinc-900"} text-white cursor-pointer px-5 py-1 rounded-r-xl`}

        >
          {isLoading ? <Loader className='animate-spin' /> : edit ? <CircleX className='text-rose-500' onClick={() => { setTodo(''), setEdit(!edit) }} /> : <CirclePlus onClick={handleAddTask} />}
        </button>
      </div>
      <div className='h-fit w-full flex flex-wrap  justify-start gap-5 pl-32 mt-20' >


        {Alltask && Alltask.map((item, id) => (
          <div className='h-fit border  bg-zinc-400 p-5  rounded-xl flex flex-col justify-center items-start' key={id} id='ContainerRef' ref={(el) => (containerRefs.current[id] = el)}>
            <h1 className='text-emerald-700 font-semibold text-xl '>Task {1 + id} : <span className='text-blue-800'>{edit ? todo : item.title}</span></h1>
            <p className='text-xs text-black font-medium'>{formatTime(item.created_at)}</p>
            <p className='text-white'>{item.completed || isComplete ? 'Completed' : 'Not Completed'}</p>
            <div className='flex gap-2'>


              {item.completed || isComplete ? '' : <button onClick={() => handleComplete(item)} className='bg-zinc-600 p-1 rounded-lg cursor-pointer mt-4' ><CircleCheck className='text-green-400' /> </button>}
              <button className='bg-zinc-600 p-1 rounded-lg cursor-pointer mt-4' onClick={() => DeleteTask(item)}><Trash2 className='text-rose-500' /></button>
              <button className='bg-zinc-600 p-1 rounded-lg cursor-pointer mt-4'>{edit ? <SquareCheck className='text-white' onClick={() => handleEditTitle(item)} /> : <Pencil className='text-emerald-200' onClick={() => { handleEdit(item), setEdit(true) }} />}</button>
            </div>
          </div>
        ))}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
