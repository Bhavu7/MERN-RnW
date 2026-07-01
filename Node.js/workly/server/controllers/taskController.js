import Task from '../models/Task.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getTasks = asyncHandler(async (req, res) => {
  const query = req.user.role === 'admin' && req.query.scope === 'all'
    ? {}
    : { assignedTo: req.user._id };

  const tasks = await Task.find(query)
    .populate('category', 'name description')
    .populate('assignedTo', 'username email role')
    .populate('createdBy', 'username role')
    .sort({ createdAt: -1 });

  res.json({ success: true, tasks });
});

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate, category, assignedTo } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Task title is required');
  }

  const ownerId = req.user.role === 'admin' && assignedTo ? assignedTo : req.user._id;

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    category: category || null,
    assignedTo: ownerId,
    createdBy: req.user._id,
  });

  await User.findByIdAndUpdate(ownerId, { $addToSet: { tasks: task._id } });

  const populatedTask = await Task.findById(task._id)
    .populate('category', 'name')
    .populate('assignedTo', 'username email role')
    .populate('createdBy', 'username role');

  res.status(201).json({ success: true, message: 'Task created', task: populatedTask });
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const isOwner = task.assignedTo.toString() === req.user._id.toString();
  if (req.user.role !== 'admin' && !isOwner) {
    res.status(403);
    throw new Error('You can update only your own tasks');
  }

  const previousAssignedTo = task.assignedTo.toString();
  const nextAssignedTo = req.user.role === 'admin' && req.body.assignedTo ? req.body.assignedTo : previousAssignedTo;

  Object.assign(task, {
    title: req.body.title ?? task.title,
    description: req.body.description ?? task.description,
    status: req.body.status ?? task.status,
    priority: req.body.priority ?? task.priority,
    dueDate: req.body.dueDate ?? task.dueDate,
    category: req.body.category ?? task.category,
    assignedTo: nextAssignedTo,
  });

  await task.save();

  if (previousAssignedTo !== String(nextAssignedTo)) {
    await User.findByIdAndUpdate(previousAssignedTo, { $pull: { tasks: task._id } });
    await User.findByIdAndUpdate(nextAssignedTo, { $addToSet: { tasks: task._id } });
  }

  const updatedTask = await Task.findById(task._id)
    .populate('category', 'name')
    .populate('assignedTo', 'username email role')
    .populate('createdBy', 'username role');

  res.json({ success: true, message: 'Task updated', task: updatedTask });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const isOwner = task.assignedTo.toString() === req.user._id.toString();
  if (req.user.role !== 'admin' && !isOwner) {
    res.status(403);
    throw new Error('You can delete only your own tasks');
  }

  await User.findByIdAndUpdate(task.assignedTo, { $pull: { tasks: task._id } });
  await task.deleteOne();

  res.json({ success: true, message: 'Task deleted successfully' });
});

export const getUsersForAssignment = asyncHandler(async (req, res) => {
  const users = await User.find().select('username email role').sort({ username: 1 });
  res.json({ success: true, users });
});
