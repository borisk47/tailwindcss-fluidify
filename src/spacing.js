const _ = require('lodash')
const utils = require('./utils')

/*
    LIMITATIONS:
     - only positive space values
     - space-(x)-reverse is ignored for fluid spacing

 */

const topic = function(tw) {

    const root = {
        ':root' : {
            '--f-space-x-min': '0',
            '--f-space-y-min': '0',
        }
    }
    tw.addUtilities(root);

    const setters = {
        'space-x': {
            'margin-left' : utils.clampifyProp('space-x'),
        },
        'space-y': {
            'margin-top' : utils.clampifyProp('space-y'),
        },
    }

    const themeKey = 'space';
    const modifiers = _.assign({'0':'0rem'},
        ..._.chain(tw.theme(themeKey))
            .pickBy((size) => !size.startsWith('-'))
            .pickBy((size) => size.endsWith('rem'))
            .flatMap( (size, modifier) => ({[`${modifier}`]: size} ))
            .value()
    );

    utils.createClampedUtilities(tw,{themeKey, modifiers, setters});

};

module.exports = topic;