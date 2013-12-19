/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Location Schema
 */
var LocationSchema = new Schema({
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */

LocationSchema.path('latitude').validate(function(latitude) {
    // TODO
    return true;
}, 'Title cannot be blank');

LocationSchema.path('longitude').validate(function(latitude) {
    // TODO
    return true;
}, 'Title cannot be blank');

/**
 * Statics
 */

LocationSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Location', LocationSchema);
