var Montage = require("montage").Montage,
    RssArticle = require("./rss-article").RssArticle;

exports.RssController = Montage.create(Montage, {

    articleCount: {
        value: 10
    },

    filterTerm: {
        value: null
    },

    title: {
        value: null
    },

    _articles: {
        value: null
    },

    _sample: {
        value: null
    },

    feeds: {
        value: [{
            "name": "Apple Trailers",
            "feed": "trailers"
        }, {
            "name": "Photo of the Day",
            "feed": "ng-podd"
        }]
    },

    _feed: {
        value: null
    },

    feed: {
        set: function(value) {
            if (value) {
                this._feed = value;
                this.sample = value + ".json";
            }
        },

        get: function() {
            return this._feed;
        }
    },

    sample: {
        set: function(value) {
            var self = this;

            this._sample = value;

            value = "samples/" + value;
            require.async(value).then(function(rssData) {
                var articles = [];

                self.title = rssData.title;
                for (var i = 0; i < rssData.articles.length; i++) {
                    articles.push(
                        RssArticle.create().init(rssData.articles[i])
                    );
                }
                self._articles = articles;
            }).done();
        },
        get: function() {
            return this._sample;
        }
    },

    didCreate: {
        value: function () {
            this.defineBinding("articles", {"<-":
                "$_articles.filter{" +
                    "description.indexOf($filterTerm ?? '') >= 0" +
                "}"
            });
        }
    }
});
