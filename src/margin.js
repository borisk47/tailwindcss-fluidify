const _ = require('lodash')
const utils = require('./utils')


const topic = function(tw) {

    const root = {
        ':root' : {
            '--f-m-min': '0',
            '--f-ml-min': '0',
            '--f-mt-min': '0',
            '--f-mr-min': '0',
            '--f-mb-min': '0',
            '--f-mx-min': '0',
            '--f-my-min': '0',
        }
    }
    tw.addUtilities(root);

    const themeKey = 'margin';

    const modifiers = _.assign({'0':'0rem'},
        _.chain(tw.theme(themeKey))
            .pickBy((size) => size.endsWith('rem'))
            .pickBy((size) => !size.startsWith('-'))
            .value()
    );


    const setters = {
        m: {
            'margin' : utils.clampifyProp('m'),
        },
        ml: {
            'margin-left' : utils.clampifyProp('ml'),
        },
        mt: {
            'margin-top' : utils.clampifyProp('mt'),
        },
        mr: {
            'margin-right' : utils.clampifyProp('mr'),
        },
        mb: {
            'margin-bottom' : utils.clampifyProp('mb'),
        },
        mx: {
            'margin-left' : utils.clampifyProp('mx'),
            'margin-right' : utils.clampifyProp('mx')
        },
        my: {
            'margin-top' : utils.clampifyProp('my'),
            'margin-bottom' : utils.clampifyProp('my')
        },
    }

    utils.createClampedUtilities(tw,{themeKey, modifiers, setters});
};

module.exports = topic;