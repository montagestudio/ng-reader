var Montage = require("montage").Montage;

exports.RssArticle = Montage.create(Montage, {
    title: {
        value: null
    },

    description: {
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
    }
});
