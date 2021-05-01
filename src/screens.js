const plugin = require('tailwindcss/plugin')
const _ = require('lodash')

const utils = require('./util')

const topic = function({addUtilities, theme,variants,e}) {

    const root = {
        ':root' : {
            '--f-rem-px': '16px',
            '--f-rem': '16',
            '--f-scale': '0px',
        }
    }
    addUtilities(root);

    const generators = [
        (size, modifier) => ({
            [`.fluid-from-screen-${modifier}`]:{
                '--f-from-screen-px': size,
                '--f-from-screen': utils.unitless(size),

            },
        }),
        (size, modifier) => ({
            [`.fluid-to-screen-${modifier}`]:{
                '--f-to-screen-px': size,
                '--f-to-screen': utils.unitless(size),
                '--f-scale': 'calc( (100vw - var(--f-from-screen-px)) / ( var(--f-to-screen) - var(--f-from-screen) ) )'
            },
        })
    ];

    const screens = theme('screens');
    const min_w_screens = _.pickBy(screens, (value, key) =>{
        return _.isString(value)
    })

    const utilities = _.flatMap(generators, (generator) => {
       return _.flatMap(min_w_screens, generator);
    });

    addUtilities(utilities, ['responsive']);



};

module.exports = topic;