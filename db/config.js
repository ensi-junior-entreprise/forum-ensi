const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://forum:ensijuni@cluster0.t4jeb.mongodb.net/Forum?retryWrites=true&w=majority"


const MONGODB_OPTIONS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}

mongoose.connect(MONGODB_URI, MONGODB_OPTIONS)

module.exports = mongoose