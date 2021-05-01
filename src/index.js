const plugin = require('tailwindcss/plugin')

const topics = [
    require("./screens"),
    require("./fontSize"),
    require("./margin"),
    require("./padding"),
    require("./spacing"),
    require("./gap"),
]

const this_plugin = plugin(function({addUtilities, theme,variants,e}) {
    topics.forEach( topic => topic({addUtilities, theme,variants,e}));
});

module.exports = this_plugin;
