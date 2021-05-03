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
        _.pickBy(tw.theme(themeKey), utils.isPositiveRem)
    );
    utils.createClampedUtilities(tw,
        {themeKey, modifiers, setters,
            setterClassTransformer: cls => `${cls} > :not([hidden]) ~ :not([hidden])`});

};

module.exports = topic;