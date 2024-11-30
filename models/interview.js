const mongoose = require('mongoose')

const interviewSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
    feedback: [String]
});

module.exports = mongoose.model('Interview', interviewSchema);
