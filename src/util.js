function unitless(size) {
    return size.replace(/rem|em|px|vw|ch|%/g, '');
}


function clampifyProp(propName) {
    const minProp = `--f-${propName}-min`;
    const maxProp = `--f-${propName}-max`;
    const deltaY = `( var(${maxProp}) - var(${minProp}) )`;
    const scale = '(100vw - var(--f-from-screen-px)) / ( var(--f-to-screen) - var(--f-from-screen) )';

    return `clamp(
        calc(var(${minProp}) * var(--f-rem-px)),
        calc((var(${minProp}) * var(--f-rem-px)) + var(--f-rem) * ${deltaY} * ${scale} ),
        calc(var(${maxProp}) * var(--f-rem-px))
    )`;
}



module.exports = {unitless, clampifyProp};