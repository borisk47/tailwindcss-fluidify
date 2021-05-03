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
    const extractFontSize = size => _.isArray(size) ? size[0] : size;
    const modifiers = _.chain(tw.theme(themeKey))
        .mapValues(extractFontSize)
        .pickBy(utils.isPositiveRem)
        .value()
        ;
    utils.createClampedUtilities(tw,{themeKey, modifiers, setters});
};

module.exports = topic;