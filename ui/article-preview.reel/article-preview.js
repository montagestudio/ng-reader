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
    article: {
        value: null
    },

    previewLength: {
        value: 30
    },

    preview: {
        value: ""
    },

    didCreate: {
        value: function() {
            this.addPathChangeListener("article.description", this);
            this.addPathChangeListener("previewLength", this);
        }
    },

    handlePathChange: {
        value: function(value, key) {
            if (key === "article.description" || key === "previewLength") {
                if (this.article) {
                    this.preview = this.article.description.substr(0, this.previewLength);
                } else {
                    this.preview = "";
                }
            }
        }
    }
});
