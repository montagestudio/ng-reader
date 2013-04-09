var Montage = require("montage").Montage;

exports.RssArticle = Montage.create(Montage, {
    didCreate: {
        value: function() {
            //this.defineBinding("previewText", {"<-":
            //    "$description.substr(0, $previewTextSize) + " +
            //    "($description.length > $previewTextSize ? '...' : '')"
            //});
            this.addOwnPropertyChangeListener("description", this, false);
            this.addOwnPropertyChangeListener("previewTextSize", this, false);
        }
    },

    previewTextSize: {
        value: 10
    },

    title: {
        value: null
    },

    description: {
        value: null
    },

    previewText: {
        value: null
    },

    link: {
        value: null
    },

    media: {
        value: null
    },

    author: {
        value: null
    },

    date: {
        value: null
    },

    isRead: {
        value: null
    },

    init: {
        value: function(rssData) {
            this.title = rssData.title;
            this.description = rssData.description;
            this.link = rssData.link;
            this.media = rssData.enclosure;
            this.author = rssData.author;
            this.date = new Date(rssData.pubDate);
            this.isRead = false;

            return this;
        }
    },

    handlePropertyChange: {
        value: function(value, key) {
            if (key === "description" || key === "previewTextSize") {
                this.previewText = this.description.substr(0, this.previewTextSize);
                if (this.description.length > this.previewTextSize) {
                    this.previewText += "...";
                }
            }
        }
    }
});
