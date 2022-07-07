const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* const isImgLink = (url) => {
    if (typeof url !== 'string') {
      return false;
    }
    return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null);
  } */

const taskSchema = new Schema({
  title: {
    type: String,
    required: "Title is required",
    minLength: [3, "Title too short, needs mat least 3 chars"],
    },
  image: {
    type: String,
    default: "https://as1.ftcdn.net/v2/jpg/01/27/74/92/1000_F_127749225_5zmvPoKOZrpC1YBHLzlhglRTsAo6QINL.jpg",
    validate: {
        validator: function(image) {
            try {
                new URL(image);
                return true;
            } catch (error) {
                return false;
            }
        },
        message: image => "Invalid URL"
    }
    
    /* validate: [isImgLink, 'Insert a valid Url'] */
    },
  description: {
    type: String,
    minLength: 20
    },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
