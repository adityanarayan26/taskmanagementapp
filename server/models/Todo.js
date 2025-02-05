import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

todoSchema.query.sortByCreatedAtDesc = function () {
    return this.sort({ created_at: -1 });
};
const Todo = mongoose.model('Todo', todoSchema);
export default Todo;