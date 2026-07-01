const Task = require('../models/Task');
const User = require('../models/User');
const Category = require('../models/Category');

exports.getMyTasks = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id })
    .populate('category')
    .populate('assignedTo', 'username email role')
    .populate('createdBy', 'username role')
    .sort({ createdAt: -1 });

  res.render('tasks/taskList', {
    title: 'My Tasks',
    tasks,
    pageType: 'my'
  });
};

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate('category')
    .populate('assignedTo', 'username email role')
    .populate('createdBy', 'username role')
    .sort({ createdAt: -1 });

  res.render('tasks/taskList', {
    title: 'All User Tasks',
    tasks,
    pageType: 'all'
  });
};

exports.showCreateForm = async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  const users = req.user.role === 'admin' ? await User.find().select('username email role') : [req.user];

  res.render('tasks/taskForm', {
    title: 'Create Task',
    task: null,
    categories,
    users,
    action: '/tasks/create',
    submitText: 'Add Task'
  });
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, category, assignedTo } = req.body;
    const finalAssignedTo = req.user.role === 'admin' && assignedTo ? assignedTo : req.user._id;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
      category: category || null,
      assignedTo: finalAssignedTo,
      createdBy: req.user._id
    });

    await User.findByIdAndUpdate(finalAssignedTo, { $addToSet: { tasks: task._id } });
    res.flash('success', 'Task created successfully.');
    res.redirect('/tasks');
  } catch (error) {
    res.flash('error', 'Failed to create task.');
    res.redirect('/tasks/create');
  }
};

exports.showEditForm = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.flash('error', 'Task not found.');
    return res.redirect('/tasks');
  }

  if (req.user.role !== 'admin' && String(task.assignedTo) !== String(req.user._id)) {
    res.flash('error', 'You can edit only your own tasks.');
    return res.redirect('/tasks');
  }

  const categories = await Category.find().sort({ name: 1 });
  const users = req.user.role === 'admin' ? await User.find().select('username email role') : [req.user];

  res.render('tasks/taskForm', {
    title: 'Edit Task',
    task,
    categories,
    users,
    action: `/tasks/${task._id}/edit`,
    submitText: 'Update Task'
  });
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.flash('error', 'Task not found.');
      return res.redirect('/tasks');
    }

    if (req.user.role !== 'admin' && String(task.assignedTo) !== String(req.user._id)) {
      res.flash('error', 'You can update only your own tasks.');
      return res.redirect('/tasks');
    }

    const previousAssignedTo = String(task.assignedTo);
    const nextAssignedTo = req.user.role === 'admin' && req.body.assignedTo ? req.body.assignedTo : req.user._id;

    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;
    task.priority = req.body.priority;
    task.dueDate = req.body.dueDate || null;
    task.category = req.body.category || null;
    task.assignedTo = nextAssignedTo;

    await task.save();

    if (previousAssignedTo !== String(nextAssignedTo)) {
      await User.findByIdAndUpdate(previousAssignedTo, { $pull: { tasks: task._id } });
      await User.findByIdAndUpdate(nextAssignedTo, { $addToSet: { tasks: task._id } });
    }

    res.flash('success', 'Task updated successfully.');
    res.redirect(req.user.role === 'admin' ? '/tasks/all' : '/tasks');
  } catch (error) {
    res.flash('error', 'Failed to update task.');
    res.redirect('/tasks');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.flash('error', 'Task not found.');
      return res.redirect('/tasks');
    }

    if (req.user.role !== 'admin' && String(task.assignedTo) !== String(req.user._id)) {
      res.flash('error', 'You can delete only your own tasks.');
      return res.redirect('/tasks');
    }

    await User.findByIdAndUpdate(task.assignedTo, { $pull: { tasks: task._id } });
    await task.deleteOne();
    res.flash('success', 'Task deleted successfully.');
    res.redirect('back');
  } catch (error) {
    res.flash('error', 'Failed to delete task.');
    res.redirect('/tasks');
  }
};
