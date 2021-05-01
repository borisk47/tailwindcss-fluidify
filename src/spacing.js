const _ = require('lodash')
const utils = require('./util')

/*
    LIMITATIONS:
     - only positive space values
     - space-(x)-reverse is ignored for fluid spacing

 */

const topic = function({addUtilities, theme, config, variants,e}) {

    const root = {
        ':root' : {
            '--f-space-x-min': '0',
            '--f-space-y-min': '0',
        }
    }
    addUtilities(root);


    const remPositiveSpace = _.assign({'0':'0rem'},
        ..._.chain(theme('space'))
            .pickBy((size) => size.endsWith('rem'))
            .pickBy((size) => !size.startsWith('-'))
            .flatMap( (size, modifier) => ({[`${modifier}`]: size} ))
            .value()
    );


    const prefixes = ['space-x', 'space-y'];

    const utilities =  _.flatMap(remPositiveSpace, (size, modifier) => {
        return _.map(prefixes, prefix => {
            return {
                [`.${e(`${prefix}-${modifier}`)}`]:{
                    [`--f-${prefix}-min`]:utils.unitless(size),
                },
            }
        })
    });
    addUtilities(utilities, variants('space'));


    const toUtilities =  _.flatMap(remPositiveSpace, (size, modifier) => {
        return _.map(prefixes, prefix => {
            return {
                [`.${e(`to-${prefix}-${modifier}`)}`]:{
                    [`--f-${prefix}-max`]:utils.unitless(size),
                },
            }
        })
    });
    addUtilities(toUtilities, variants('space'));


    const setters = {
        'space-x': {
            'margin-left' : utils.clampifyProp('space-x'),
        },
        'space-y': {
            'margin-top' : utils.clampifyProp('space-y'),
        },
    }

    const setterUtilities = _.flatMap(setters, (value, key) => {
        const classes = _.chain(remPositiveSpace)
            .map( (_, modifier) => `.${e(`to-${key}-${modifier}`)} > :not([hidden]) ~ :not([hidden])`)
            .join(',')
            .value();

        return {[`${classes}`]: value};
    });

    addUtilities(setterUtilities, variants('space'));
};

module.exports = topic;