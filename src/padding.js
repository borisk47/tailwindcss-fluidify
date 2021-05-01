const _ = require('lodash')
const utils = require('./util')

const topic = function({addUtilities, theme, config, variants,e}) {

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
    addUtilities(root);


    const remPositivePadding = _.assign({'0':'0rem'},
        ..._.chain(theme('padding'))
            .pickBy((size) => size.endsWith('rem'))
            .pickBy((size) => !size.startsWith('-'))
            .flatMap( (size, modifier) => ({[`${modifier}`]: size} ))
            .value()
    );


    const prefixes = ['p', 'pl', 'pt', 'pr', 'pb', 'px', 'py'];

    const utilities =  _.flatMap(remPositivePadding, (size, modifier) => {
        return _.map(prefixes, prefix => {
            return {
                [`.${e(`${prefix}-${modifier}`)}`]:{
                    [`--f-${prefix}-min`]:utils.unitless(size),
                },
            }
        })
    });
    addUtilities(utilities, variants('padding'));


    const toUtilities =  _.flatMap(remPositivePadding, (size, modifier) => {
        return _.map(prefixes, prefix => {
            return {
                [`.${e(`to-${prefix}-${modifier}`)}`]:{
                    [`--f-${prefix}-max`]:utils.unitless(size),
                },
            }
        })
    });
    addUtilities(toUtilities, variants('padding'));


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

    const setterUtilities = _.flatMap(setters, (value, key) => {
        const classes = _.chain(remPositivePadding)
            .map( (_, modifier) => `.${e(`to-${key}-${modifier}`)}`)
            .join(',')
            .value();

        return {[`${classes}`]: value};
    });

    addUtilities(setterUtilities, variants('padding'));
};

module.exports = topic;