"use strict";
var User = (function () {
    function User(userId, portfolioWeight) {
        this.userId = userId;
        this.portfolioWeight = portfolioWeight;
    }
    return User;
}());
exports.User = User;
;
var Model = (function () {
    function Model(id, userId, entries) {
        this.id = id;
        this.userId = userId;
        this.entries = entries;
    }
    return Model;
}());
exports.Model = Model;
;
