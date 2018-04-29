import FA from "../FA/FA";
import PA from "../PA/PA";
import {OverloadException} from "../exceptions";

/**
 * Zpracovává options a na jejich základe volá přetečení funkce
 * @param {{parameters: [{value: Object, type: FA}, {value: Object, type: PA}], func: function}} options
 * @return {*|void}
 */
export function overload(options) {
    optionEach:
    for (let option of options) {
        let paramsToUse = [];
        for (let param of option.parameters) {
            if(param.value.constructor !== param.type) {
                continue optionEach;
            }
            let val  = param.value;

            val = (val: param.type);
            paramsToUse.push(val);
        }
        return option.func(...paramsToUse);
    }
    throw new OverloadException();
}
