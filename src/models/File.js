const mongoose = require('mongoose');

const File = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    path: {
        type: String,
        require: true,
    }
},
    {
        timestamps: true,
        toObjetct: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

File.virtual('url').get(function () {
    const url = process.env.URL || 'http://localhost:3333';

    return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('File', File);