const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, enum: ['En attente', 'Accepté', 'Rejeté'], default: 'En attente' },
    interviewHistory: [{
        interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview' },
        feedback: String
    }]
});

module.exports = mongoose.model('Candidate', candidateSchema);
