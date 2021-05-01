const _ = require('lodash')
const utils = require('./util')

const topic = function({addUtilities, theme, config, variants,e}) {

    const root = {
        ':root' : {
            '--f-gap-x-min': '0',
            '--f-gap-y-min': '0',
            '--f-gap-min': '0',
        }
    }
    addUtilities(root);


    const remPositiveGap = _.assign({'0':'0rem'},
        ..._.chain(theme('gap'))
            .pickBy((size) => size.endsWith('rem'))
            .pickBy((size) => !size.startsWith('-'))
            .flatMap( (size, modifier) => ({[`${modifier}`]: size} ))
            .value()
    );


    const prefixes = ['gap', 'gap-x', 'gap-y'];

    const utilities =  _.flatMap(remPositiveGap, (size, modifier) => {
        return _.map(prefixes, prefix => {
            return {
                [`.${e(`${prefix}-${modifier}`)}`]:{
                    [`--f-${prefix}-min`]:utils.unitless(size),
                },
            }
        })
    });
    addUtilities(utilities, variants('gap'));


    const toUtilities =  _.flatMap(remPositiveGap, (size, modifier) => {
        return _.map(prefixes, prefix => {
            return {
                [`.${e(`to-${prefix}-${modifier}`)}`]:{
                    [`--f-${prefix}-max`]:utils.unitless(size),
                },
            }
        })
    });
    addUtilities(toUtilities, variants('gap'));


    const setters = {
        gap: {
            'gap' : utils.clampifyProp('gap'),
        },
        'gap-x': {
            'column-gap' : utils.clampifyProp('gap-x'),
        },
        'gap-y': {
            'row-gap' : utils.clampifyProp('gap-y'),
        }
    }

    const setterUtilities = _.flatMap(setters, (value, key) => {
        const classes = _.chain(remPositiveGap)
            .map( (_, modifier) => `.${e(`to-${key}-${modifier}`)}`)
            .join(',')
            .value();

        return {[`${classes}`]: value};
    });

    addUtilities(setterUtilities, variants('gap'));
};

module.exports = topic;