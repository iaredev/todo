const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
content: {
type: String,
required: true
},
done: {
    type : Boolean,
    default : false
}
})
module.exports = mongoose.model('TodoTask',todoTaskSchema);