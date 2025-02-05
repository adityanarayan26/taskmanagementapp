import express from 'express';
import { DeleteTodo, GetTodo, todo, UpdateTodo } from '../controllers/todo.controller.js';

const router = express.Router();
router.post('/todo', todo)
router.get('/getTask', GetTodo)
router.delete('/delete/:id', DeleteTodo)
router.put('/update/:id', UpdateTodo)

export default router;