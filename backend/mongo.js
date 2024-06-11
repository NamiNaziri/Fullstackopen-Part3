const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const personName = process.argv[3]
const personNumber = process.argv[4]

let persons = [
    { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
    },
    { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
    },
    { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
    },
    { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
    }
]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.cw0ezao.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url).then(() => {

    const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
    })

    const Person = mongoose.model('Person', phonebookSchema)

    if(personName && personNumber) {
        const person = new Person({
            name: personName,
            number: personNumber,
            })
        person.save().then(result => {
            console.log('person saved!')
            mongoose.connection.close()
        })

    }
    else
    {
        console.log('phonebook:')
        Person.find({}).then(result => {
            result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    }


})