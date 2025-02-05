import { create } from 'zustand';
import { axiosInstance } from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const useStore = create((set, get) => ({
  todo: '',
  setTodo: (todo) => set({ todo }),
  isLoading: false,
  DisplayUpdate: [],
  setDisplayUpdate: (DisplayUpdate) => set({ DisplayUpdate }),
  Alltask: [],
  AddTask: async (task) => {
    set({ isLoading: true });
    try {

      const newTask = { title: task, created_at: Date.now(), completed: false };
      set((state) => ({
        Alltask: [newTask, ...state.Alltask],
      }));


      const resp = await axiosInstance.post('/todo', { title: task });

      if (resp) {
        toast.success('Task Added Successfully');

        set((state) => ({
          Alltask: state.Alltask.map((item) =>
            item._id === newTask._id ? { ...item, _id: resp.data._id } : item
          ),
        }));
      }
    } catch (error) {
      toast.error('Error Occurred');

      set((state) => ({
        Alltask: state.Alltask.filter((item) => item._id !== newTask._id),
      }));
    } finally {
      set({ isLoading: false });
    }
  },
  GetTask: async () => {

    try {
      const resp = await axiosInstance.get('/getTask');
      set({ Alltask: resp.data });
    } catch (error) {
      console.log(error);
    }
  },
  DeleteTask: async (todo) => {
    try {
      const resp = await axiosInstance.delete(`/delete/${todo._id}`);
      if (resp.status === 200) {
        set((state) => ({
          Alltask: state.Alltask.filter((item) => item._id !== todo._id),
        }));
      } else {
        console.error('Failed to delete the task');
      }
    } catch (error) {
      console.log(error);
    }
  },
  UpdateTask: async (todo) => {
    const { DisplayUpdate } = get();
    try {
      const resp = await axiosInstance.put(`/update/${todo._id}`, {
        title: DisplayUpdate.name || todo.title,
        completed: DisplayUpdate.completed || false,
      });
      if (resp.status === 200) {
        set((state) => ({
          Alltask: state.Alltask.map((item) =>
            item._id === todo._id ? resp.data : item
          ),
        }));
        set({ isComplete: true });
        toast.success('updated successfully');
      }
      set({ isComplete: false });
    } catch (error) {
      console.log(error);
      toast.error('Error Occurred');
      set({ isComplete: false });
    }
    finally{
      set({isComplete:false})
    }
  },
}));

export default useStore;
