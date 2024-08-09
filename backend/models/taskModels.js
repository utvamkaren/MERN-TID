const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        text: {
            type: String, 
            required: [true, 'por favor agrega un texto']},

            user:{type: mongoose.Schema.Types.ObjectId,required:true,ref:'Usuario'}
        },
     
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Tarea', taskSchema);  
