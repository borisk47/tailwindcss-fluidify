const plugin = require('tailwindcss/plugin')

const topics = [
    require("./screens"),
    require("./fontSize"),
    require("./margin"),
    require("./padding"),
    require("./spacing"),
    require("./gap"),
]

const this_plugin = plugin(function(tw) {
    topics.forEach( topic => topic(tw));
});

module.exports = this_plugin;
