const mongoose = require('mongoose')

const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING)
    console.log(`Connected to database: ${conn.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = connectDB