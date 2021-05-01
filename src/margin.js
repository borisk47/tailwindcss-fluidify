const _ = require('lodash')
const utils = require('./util')

const topic = function({addUtilities, theme, config, variants,e}) {

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
    addUtilities(root);


    const remPositiveMargins = _.assign({'0':'0rem'},
        ..._.chain(theme('margin'))
            .pickBy((size) => size.endsWith('rem'))
            .pickBy((size) => !size.startsWith('-'))
            .flatMap( (size, modifier) => ({[`${modifier}`]: size} ))
            .value()
    );


    const prefixes = ['m', 'ml', 'mt', 'mr', 'mb', 'mx', 'my'];

    const utilities =  _.flatMap(remPositiveMargins, (size, modifier) => {
            return _.map(prefixes, prefix => {
                return {
                    [`.${e(`${prefix}-${modifier}`)}`]:{
                        [`--f-${prefix}-min`]:utils.unitless(size),
                    },
                }
            })
    });
    addUtilities(utilities, variants('margin'));


    const toUtilities =  _.flatMap(remPositiveMargins, (size, modifier) => {
        return _.map(prefixes, prefix => {
            return {
                [`.${e(`to-${prefix}-${modifier}`)}`]:{
                    [`--f-${prefix}-max`]:utils.unitless(size),
                },
            }
        })
    });
    addUtilities(toUtilities, variants('margin'));


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

    const setterUtilities = _.flatMap(setters, (value, key) => {
            const classes = _.chain(remPositiveMargins)
                .map( (_, modifier) => `.${e(`to-${key}-${modifier}`)}`)
                .join(',')
                .value();

            return {[`${classes}`]: value};
        });

    addUtilities(setterUtilities, variants('margin'));
};

module.exports = topic;