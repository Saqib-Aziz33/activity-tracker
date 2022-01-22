const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    title: String,
    desc: String,
    category: {
        type: String,
        enum: ['long term', 'short term', 'common']
    }
})

module.exports = mongoose.model('Activity', activitySchema)