WikiRequester = {
    /*
     * Represents all the result from a wikipedia search.
     * @constructor
     * @param {string} langue - The language of the wikipedia page.
     * @param {string} text - The text of the searched value.
     * @param {WikiRequester~requestCallback} cb - The callback that handles the response.
     */
    search: function (langue, text, cb) {
        "use strict";
        if (langue && text && cb) {
            var url = "https://" + langue + ".wikipedia.org/w/api.php?&action=opensearch&format=json&callback=?&search=" + text;

            $.get(url, function(data){
                cb(data[1]);
            }, "jsonp");
        }
    },
    /*
     * Represents the id of a wikipedia page.
     * @constructor
     * @param {string} langue - The language of the wikipedia page.
     * @param {string} text - The text of the searched value.
     * @param {WikiRequester~requestCallback} cb - The callback that handles the response.
     */
    id: function (langue, text, cb) {
        "use strict";
        if (langue && text && cb) {
            if (text) {
                var id;
                var url = "https://" + langue + ".wikipedia.org/w/api.php?&prop=info&action=query&format=json&generator=search&gsrlimit=1&callback=?&gsrsearch=" + text;

                $.get(url, function(data){
                    $.each(data.query.pages, function (i, field) {
                        id = field.pageid;
                    });
                    cb(id);
                }, "jsonp");
            }
        }
    },
    /*
     * Represents the title of a wikipedia page.
     * @constructor
     * @param {string} langue - The language of the wikipedia page.
     * @param {string} text - The text of the searched value.
     * @param {WikiRequester~requestCallback} cb - The callback that handles the response.
     */
    title: function (langue, text, cb) {
        "use strict";
        if (langue && text && cb) {
            if (text) {
                var title;
                var url = "https://" + langue + ".wikipedia.org/w/api.php?&prop=info&action=query&format=json&generator=search&gsrlimit=1&callback=?&gsrsearch=" + text;

                $.get(url, function(data){
                    $.each(data.query.pages, function (i, field) {
                        title = field.title;
                    });
                    cb(title);
                }, "jsonp");
            }
        }
    },
    /*
     * Represents the image profile of a wikipedia page.
     * @constructor
     * @param {string} langue - The language of the wikipedia page.
     * @param {string} text - The text of the searched value.
     * @param {WikiRequester~requestCallback} cb - The callback that handles the response.
     */
    image: function (langue, text, cb) {
        "use strict";
        if (langue && text && cb) {
            if (text) {
                var image;
                var url = "https://" + langue + ".wikipedia.org/w/api.php?&prop=pageimages&action=query&format=json&generator=search&gsrlimit=1&callback=?&gsrsearch=" + text;

                $.get(url, function(data){
                    $.each(data.query.pages, function (i, field) {
                        image = field.thumbnail.source;
                    });
                    cb(image);
                }, "jsonp");
            }
        }
    },
    /*
     * Represents the date and hours of the latest modification of a wikipedia page.
     * @constructor
     * @param {string} langue - The language of the wikipedia page.
     * @param {string} text - The text of the searched value.
     * @param {WikiRequester~requestCallback} cb - The callback that handles the response.
     */
    lastmodified: function (langue, text, cb) {
        "use strict";
        if (langue && text && cb) {
            if (text) {
                var dateFacto;

                text = text.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });

                var url = "https://" + langue + ".wikipedia.org/w/api.php?&prop=lastmodified&action=mobileview&forma=json&callback=?&page=" + text;

                $.get(url, function(data){
                    $.each(data, function (i, field) {
                        dateFacto = field.lastmodified;
                        dateFacto = dateFacto.replace(/[TZ\.]+/g, " ");
                    });
                    cb(dateFacto);
                }, "jsonp");
            }
        }
    },
    /*
     * Represents all the categories of a wikipedia page.
     * @constructor
     * @param {string} langue - The language of the wikipedia page.
     * @param {string} text - The text of the searched value.
     * @param {integer} limit - The limit of the number of category.
     * @param {WikiRequester~requestCallback} cb - The callback that handles the response.
     */
    categories: function (langue, text, limit, cb) {
        "use strict";
        if (langue && text && limit && cb) {
            if (text) {
                var categories = [];
                var url = "https://" + langue + ".wikipedia.org/w/api.php?&action=query&callback=?&prop=categories&clshow=!hidden&cllimit=" + limit + "&format=json&generator=search&gsrlimit=1&gsrsearch=" + text;

                $.get(url, function(data){
                    $.each(data.query.pages, function (i, field) {
                        $.each(field.categories, function (i, cat) {
                            categories.push(cat.title);
                        });
                    });
                    cb(categories);
                }, "jsonp");
            }
        }
    },
    /*
     * Represents all the content of a wikipedia page.
     * @constructor
     * @param {string} langue - The language of the wikipedia page.
     * @param {string} text - The text of the searched value.
     * @param {WikiRequester~requestCallback} cb - The callback that handles the response.
     */
    content: function (langue, text, cb) {
        "use strict";
        if (langue && text && cb) {
            if (text) {
                var content = [];

                text = text.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });

                var url = "https://" + langue + ".wikipedia.org/w/api.php?&action=mobileview&prop=text&format=json&sections=all&callback=?&page=" + text;

                $.get(url, function(data){
                    $.each(data, function (i, field) {
                        $.each(field.sections, function (i, cat) {
                            content.push(cat.text);
                        });
                    });
                    cb(content);
                }, "jsonp");
            }
        }
    },
    /*
     * Represents the summary of a wikipedia page.
     * @constructor
     * @param {string} langue - The language of the wikipedia page.
     * @param {string} text - The text of the searched value.
     * @param {WikiRequester~requestCallback} cb - The callback that handles the response.
     */
    summary: function (langue, text, cb) {
        "use strict";
        if (langue && text && cb) {
            if (text) {
                var nb = [];
                var title = [];
                var result = [];

                text = text.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });

                var url = "https://" + langue + ".wikipedia.org/w/api.php?&action=parse&prop=sections&format=json&callback=?&page=" + text;

                $.get(url, function(data){
                    $.each(data, function (i, field) {
                        $.each(field.sections, function (i, cat) {
                            nb.push(cat.number);
                            title.push(cat.line);
                            result.push(nb[i] + " " + title[i]);
                        });
                    });
                    cb(result);
                }, "jsonp");
            }
        }
    }
};