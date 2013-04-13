/**
    @module "ui/rss-view.reel"
    @requires montage
    @requires montage/ui/component
*/
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component;

/**
    Description TODO
    @class module:"ui/rss-view.reel".RssView
    @extends module:montage/ui/component.Component
*/
exports.RssView = Montage.create(Component, /** @lends module:"ui/rss-view.reel".RssView# */ {
    _article: {value: null},

    article: {
        set: function(value) {
            if (value) {
                this._article = value;
                value.isRead = true;
            }
        },
        get: function() {
            return this._article;
        }
    }
});
