const mongoose = require('mongoose');
 
mongoose
.connect('mongodb://localhost/todolist')
.then(() => console.info("Connected to DB"))
.catch(() => console.error("Error DB", error))