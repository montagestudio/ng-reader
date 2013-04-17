var Montage = require("montage").Montage;

var ASSETS_ROOT = require.location;
//var ASSETS_ROOT = "http://everholt.local:8081/rss-demo/packages/ng-rss/";


exports.RssArticle = Montage.create(Montage, {
    feed: {
        value: null
    },

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
        value: function(rssData, feed) {
            this.feed = feed;
            this.title = rssData.title;
            this.description = rssData.description;
            this.link = rssData.link;
            this.media = rssData.enclosure;
            // Kind of sucks to solve urls like this but we don't have a better
            // solution at the moment.
            if (this.media && this.media.url &&
                !this.media.url.match(/^https?:\/\//i)) {
                this.media.url = ASSETS_ROOT + this.media.url;
                if (this.media.thumbnailUrl) {
                    this.media.thumbnailUrl = ASSETS_ROOT + this.media.thumbnailUrl;
                }
            }
            this.author = rssData.author;
            this.date = new Date(rssData.pubDate);
            this.isRead = false;

            return this;
        }
    }
});
