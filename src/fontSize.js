const _ = require('lodash')
const utils = require('./utils')



const topic = function(tw) {

    const root = {
        ':root' : {
            '--f-text-min': '1',
        }
    }
    tw.addUtilities(root);

    const setters = {
        text: {
            'fontSize' : utils.clampifyProp('text'),
            'min-height': '0.00001vw', // fix safari scaling bug
        }
    }

    const themeKey = 'fontSize';
    const modifiers = _.chain( tw.theme(themeKey) )
            .mapValues( size => size[0] )
            .pickBy((size) => size.endsWith('rem'))
            .value()
            ;

    utils.createClampedUtilities(tw,{themeKey, modifiers, setters});
};

module.exports = topic;