var Montage = require("montage").Montage,
    RssArticle = require("./rss-article").RssArticle;

require("samples/kids.json");
require("samples/podd.json");
require("samples/space.json");

exports.RssController = Montage.create(Montage, {

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
            "name": "Photo of the Day",
            "feed": "podd"
        }, {
            "name": "Space",
            "feed": "space"
        }, {
            "name": "Amazing Animals",
            "feed": "kids"
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

    _samples: {
        value: null
    },

    sample: {
        set: function(value) {
            if (value in this._samples) {
                this.title = this._samples[value].title;
                this._articles = this._samples[value].articles;
            } else {
                this._sample = value;

                var rssData = require("samples/" + value);
                var articles = [];

                this.title = rssData.title;
                for (var i = 0; i < rssData.articles.length; i++) {
                    articles.push(
                        RssArticle.create().init(rssData.articles[i], this.feed)
                    );
                }
                this._articles = articles;

                this._samples[value] = {
                    title: rssData.title,
                    articles: articles
                };
            }
        },
        get: function() {
            return this._sample;
        }
    },

    didCreate: {
        value: function () {
            this._samples = Object.create(null);

//            this.defineBinding("articles", {"<-":
//                "$_articles.filter{" +
//                    "description.indexOf($filterTerm ?? '') >= 0" +
//                "}"
//            });

            this.addOwnPropertyChangeListener("_articles", this, false);
            this.addOwnPropertyChangeListener("filterTerm", this, false);

            if (!this.feed) {
                this.feed = "podd";
            }
        }
    },

    handlePropertyChange: {
        value: function(value, key) {
            var self = this;

            if (key === "_articles" || key === "filterTerm") {
                if (this._articles) {
                    this.articles = this._articles.filter(function(article) {
                        return !self.filterTerm ||
                            article.title.toLowerCase()
                                .indexOf(self.filterTerm.toLowerCase()) >= 0;
                    });
                } else {
                    this.articles = [];
                }
            }
        }
    }
});
