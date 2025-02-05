import Todo from "../models/Todo.js";


export const todo = async (req, res) => {
    try {
        const { title } = req.body;
        const todo = new Todo({
            title,
        })
        await todo.save()
        res.status(201).json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const GetTodo = async (req, res) => {
    try {
        const resp = await Todo.find().sortByCreatedAtDesc()
        res.status(201).json(resp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const DeleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await Todo.findByIdAndDelete(id);
        if (!resp) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const UpdateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const todo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};