WikiRequester = {
    /*
     * WikiRequester.search([langue], [text], [Callback]);
     *
     * Exemple :
     * WikiRequester.search("fr", text, function(result){
     * console.log('WikiRequester.search : ', result);
     * });
     *
     * Dans un autocomplete (JQUERY-UI)
     * $('.search-box').autocomplete({
     * source: function (req, result) {
     * WikiRequester.search("fr", req.term, function(field){
     * result(field);
     * });
     * }
     * });
     */
    search: function (langue, text, cb) {
        if (langue && text && cb) {
            var url = "https://" + langue + ".wikipedia.org/w/api.php?&action=opensearch&format=json&callback=?&search=" + text;

            $.get(url, function(data){
                cb(data[1]);
            }, "jsonp");
        }
    },
    /*
     * WikiRequester.id([langue], [text], [Callback]);
     *
     * Exemple :
     * WikiRequester.id("fr", text, function(result){
     * console.log('WikiRequester.id : ', result);
     * });
     */
    id: function (langue, text, cb) {
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
     * WikiRequester.title([langue], [text], [Callback]);
     *
     * Exemple :
     * WikiRequester.title("fr", text, function(result){
     * console.log('WikiRequester.title : ', result);
     * });
     */
    title: function (langue, text, cb) {
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
     * WikiRequester.image([langue], [text], [Callback]);
     *
     * Exemple :
     * WikiRequester.image("fr", text, function(result){
     * console.log('WikiRequester.image : ', result);
     * });
     */
    image: function (langue, text, cb) {
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
     * WikiRequester.lastmodified([langue], [text], [Callback]);
     *
     * Exemple :
     * WikiRequester.lastmodified("fr", text, function(result){
     * console.log('WikiRequester.lastmodif : ', result);
     * });
     */
    lastmodified: function (langue, text, cb) {
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
     * WikiRequester.lastmodified([langue], [text], [limit(nb of category shown)], [Callback]);
     *
     * Exemple :
     * WikiRequester.categories("fr", text, 4, function(result){
     * console.log('WikiRequester.categories : ', result);
     * });
     */
    categories: function (langue, text, limit, cb) {
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
     * WikiRequester.content([langue], [text], [Callback]);
     *
     * Exemple :
     * WikiRequester.content("fr", text, function(result) {
     * console.log('WikiRequester.content : ', result);
     * });
     */
    content: function (langue, text, cb) {
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
     * WikiRequester.summary([langue], [text], [Callback]);
     *
     * Exemple :
     * WikiRequester.summary("fr", text , function(result){
     * console.log('WikiRequester.summary : ', result);
     * });
     */
    summary: function (langue, text, cb) {
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