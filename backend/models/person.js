
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
  name: String,
  number: String,
  })

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports = mongoose.model('Person', phonebookSchema)