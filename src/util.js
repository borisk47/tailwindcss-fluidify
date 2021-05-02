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



module.exports = {unitless, clampifyProp};