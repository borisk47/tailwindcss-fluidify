const _ = require('lodash')
const utils = require('./util')



const topic = function({addUtilities, theme, config, variants,e}) {

    const root = {
        ':root' : {
            '--f-text-min': '1',
        }
    }
    addUtilities(root);


    const remFontSizes = _.assign({},
        ..._.chain(theme('fontSize'))
            .pickBy((size) => size[0].endsWith('rem'))
            .flatMap( (size, modifier) => ({[`${modifier}`]: size[0]} ))
            .value()
    );

    const prefixes = ['text'];
    const utilities =  _.flatMap(remFontSizes, (size, modifier) => {
        return _.map(prefixes, prefix => {
            return {
                [`.${e(`${prefix}-${modifier}`)}`]:{
                    [`--f-${prefix}-min`]:utils.unitless(size),
                },
            }
        })
    });
    addUtilities(utilities, variants('fontSize'));


    const toUtilities =  _.flatMap(remFontSizes, (size, modifier) => {
        return _.map(prefixes, prefix => {
            return {
                [`.${e(`to-${prefix}-${modifier}`)}`]:{
                    [`--f-${prefix}-max`]:utils.unitless(size),
                },
            }
        })
    });
    addUtilities(toUtilities, variants('fontSize'));


    const setters = {
        text: {
            'fontSize' : utils.clampifyProp('text'),
            'min-height': '0vw' // fix safari scaling bug
        }
    }

    const setterUtilities = _.flatMap(setters, (value, key) => {
        const classes = _.chain(remFontSizes)
            .map( (_, modifier) => `.${e(`to-${key}-${modifier}`)}`)
            .join(',')
            .value();

        return {[`${classes}`]: value};
    });

    addUtilities(setterUtilities, variants('fontSize'));


};

module.exports = topic;