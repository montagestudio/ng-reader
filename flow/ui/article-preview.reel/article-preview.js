/**
    @module "ui/article-preview.reel"
    @requires montage
    @requires montage/ui/component
*/
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component;

/**
    Description TODO
    @class module:"ui/article-preview.reel".ArticlePreview
    @extends module:montage/ui/component.Component
*/
exports.ArticlePreview = Montage.create(Component, /** @lends module:"ui/article-preview.reel".ArticlePreview# */ {

    _article: {
        value: null
    },

    article: {
        get: function () {
            return this._article;
        },
        set: function (value) {
            this._article = value;
            this.image = value.media.thumbnailUrl;
        }
    },

    _image: {
        value: null
    },

    image: {
        get: function () {
            return this._image;
        },
        set: function (value) {
            this._image = value;
            this.needsDraw = true;
        }
    },

    draw: {
        value: function () {
            if (this._image) {
                this.imageElement.style.backgroundImage = "url(" + this._image  + ")";
            }
        }
    }
});
