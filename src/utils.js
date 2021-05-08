const _ = require('lodash')

function unitless(size) {
    return size.replace(/rem|em|px|vw|ch|%/g, '');
}


function clampifyProp(propName) {
    const minProp = `--f-${propName}-min`;
    const maxProp = `--f-${propName}-max`;
    const deltaY = `( var(${maxProp}) - var(${minProp}) )`;
    const scale = 'var(--f-scale)';

    return `clamp(
        calc(var(${minProp}) * var(--f-rem-px)),
        calc((var(${minProp}) * var(--f-rem-px)) + var(--f-rem) * ${deltaY} * ${scale} ),
        calc(var(${maxProp}) * var(--f-rem-px))
    )`;
}


function isPositiveRem (size) {
    return !size.startsWith('-') && size.endsWith('rem');
}

function createClampedUtilities({addUtilities, variants, e},
                                {themeKey, modifiers, setters, classTransformer = cls=>cls} ) {

    const utilities =  _.transform(modifiers, (result, size, modifier) => {
        _.mapKeys(_.keys(setters), prefix => {
            result[classTransformer(`.${e(`${prefix}-${modifier}`)}`)] = {[`--f-${prefix}-min`]:unitless(size)}
        });
    });
    addUtilities(utilities, variants(themeKey));


    const toUtilities =  _.transform(modifiers, (result, size, modifier) => {
        _.mapKeys(_.keys(setters), prefix => {
            result[classTransformer(`.${e(`to-${prefix}-${modifier}`)}`)] = {[`--f-${prefix}-max`]:unitless(size)}
        });
    });
    addUtilities(toUtilities, variants(themeKey));

    const setterUtilities = _.flatMap(setters, (value, key) => {
        const classes = _.chain(modifiers)
            .map( (_, modifier) => classTransformer(`.${e(`to-${key}-${modifier}`)}`) )
            .join(',')
            .value();

        return {[`${classes}`]: value};
    });
    addUtilities(setterUtilities, variants(themeKey));
}



module.exports = {unitless, clampifyProp, createClampedUtilities, isPositiveRem};