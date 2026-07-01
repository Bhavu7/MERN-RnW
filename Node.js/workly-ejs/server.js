require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const flashMiddleware = require('./middleware/flashMiddleware');
const { attachUser } = require('./middleware/authMiddleware');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flashMiddleware);
app.use(attachUser);

app.get('/', (req, res) => {
  if (req.user) return res.redirect('/tasks');
  res.redirect('/login');
});

app.use('/', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/categories', categoryRoutes);

app.use((req, res) => {
  res.status(404).render('partials/errorState', {
    title: 'Page not found',
    message: 'The page you are looking for does not exist.'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
