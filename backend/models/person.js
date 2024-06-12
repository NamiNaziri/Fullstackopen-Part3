
const mongoose = require('mongoose')

const password = process.argv[2]

const url =process.env.MONGODB_URI
//`mongodb+srv://fullstack:${password}@cluster0.cw0ezao.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
console.log('connecting to', url)

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {    type: String,
    minLength: 3,
    required: true},
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        if (v.length < 8) {
          return false;
        }
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! It should be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers`
    },
    required: [true, 'User phone number required']
  },
  })

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports = mongoose.model('Person', phonebookSchema)