const _ = require('lodash')
const utils = require('./utils')

const topic = function(tw) {

    const root = {
        ':root' : {
            '--f-gap-x-min': '0',
            '--f-gap-y-min': '0',
            '--f-gap-min': '0',
        }
    }
    tw.addUtilities(root);


    const setters = {
        gap: {
            'gap' : utils.clampifyProp('gap'),
            'min-height': '0.00001vw', // fix safari scaling bug
        },
        'gap-x': {
            'column-gap' : utils.clampifyProp('gap-x'),
            'min-height': '0.00001vw', // fix safari scaling bug
        },
        'gap-y': {
            'row-gap' : utils.clampifyProp('gap-y'),
            'min-height': '0.00001vw', // fix safari scaling bug
        }
    }

    const themeKey = 'gap';
    const modifiers = _.assign({'0':'0rem'},
        _.pickBy(tw.theme(themeKey), utils.isPositiveRem)
    );
    utils.createClampedUtilities(tw,{themeKey, modifiers, setters});};

module.exports = topic;