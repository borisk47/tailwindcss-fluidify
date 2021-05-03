const _ = require('lodash')
const utils = require('./utils')

const topic = function(tw) {

    const root = {
        ':root' : {
            '--f-p-min': '0',
            '--f-pl-min': '0',
            '--f-pt-min': '0',
            '--f-pr-min': '0',
            '--f-pb-min': '0',
            '--f-px-min': '0',
            '--f-py-min': '0',
        }
    }
    tw.addUtilities(root);

    const setters = {
        p: {
            'padding' : utils.clampifyProp('p'),
        },
        pl: {
            'padding-left' : utils.clampifyProp('pl'),
        },
        pt: {
            'padding-top' : utils.clampifyProp('pt'),
        },
        pr: {
            'padding-right' : utils.clampifyProp('pr'),
        },
        pb: {
            'padding-bottom' : utils.clampifyProp('pb'),
        },
        px: {
            'padding-left' : utils.clampifyProp('px'),
            'padding-right' : utils.clampifyProp('px')
        },
        py: {
            'padding-top' : utils.clampifyProp('py'),
            'padding-bottom' : utils.clampifyProp('py')
        },
    }

    const themeKey = 'padding';
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