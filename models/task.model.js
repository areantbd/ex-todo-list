const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    default: "Prueba",
    required: "Title is required",
    minLength: [3, "Title too short, needs mat least 3 chars"],
  },
  image: {
    type: String,
    //default: "https://loremflickr.com/320/240/kitten",
    default: function() {
      if (!this.image) {
        return 'https://i.imgflip.com/1wqw81.jpg';
      }
      return this.image;
    },
    validate: {
      validator: function (image) {
        try {
          new URL(image);
          return true;
        } catch (error) {
          return false;
        }
      },
      message: (image) => "Invalid URL",
    },
  },
  description: {
    type: String,
    default: "Tarjeta de prueba",
    minLength: 10,
  },
});


taskSchema.pre('validate', function (next) {
  this.image = this.image || undefined;
  this.description = this.description || undefined;
  next();
});


const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
