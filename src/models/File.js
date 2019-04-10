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
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('File', File);