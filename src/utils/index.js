
export class Utils {

    // static getBaseType(inputType, isObjc = false){
    //     if (inputType == 'int' || inputType == 'integer' || inputType == 'number'){
    //         return isObjc ? 'NSInteger' : int;
    //     }else if (inputType == 'long'){
    //         return isObjc ? 'NSInteger' : 'long';
    //     }else if (inputType == 'float'){
    //         return isObjc ? 'CGFloat' : 'float';
    //     }else if (inputType == 'double'){
    //         return isObjc ? 'CGFloat' : 'doublt';
    //     }else if (inputType == 'string'){
    //         return isObjc ? 'NSString *' : 'String';
    //     }else {
    //         return '';
    //     }
    // }

    static getNumberType(format, isObjc = false) {
        if (!format){
            console.warn('missing number format!!');
            return;
        }

        if (format == 'int32' || format == 'int' || format == 'integer'){
            return isObjc ? 'NSInteger' : 'int';
        }else if(format == 'int64' || format == 'long'){
            return isObjc ? 'NSInteger' : 'long';
        }else if(format == 'float'){
            return isObjc ? 'CGFloat' : 'float';
        }else if(format == 'double'){
            return isObjc ? 'CGFloat' : 'double';
        }else {
            console.warn('unsupport number format: ' + format);
            return format;
        }
    }

    static getRefType(refType = "#/definitions/BaseModel"){
        let lIndex = refType.lastIndexOf('/');
        if (lIndex > 0){
            return refType.substring(lIndex + 1);
        }
        return "BaseModel";
    }

    /**转换成首字母小写的驼峰式命名 */
    static toCamelName(input = '', divide = '/'){
        let result = input;
        let divideIndex = input.indexOf(divide);
        if (divideIndex == 0){
            return this.toCamelName(input.substring(1), divide);
        }
        if (divideIndex >= 0){
            result = '';
            let items = input.split(divide);
            let count = items.length;
            for (let i = 0; i < count; i++){
                let item = items[i];
                if (item.length > 0){
                    let firstChar = item.substr(0, 1);
                    result += ((i == 0 ? firstChar.toLowerCase() : firstChar.toUpperCase()) + item.substring(1));
                }else{
                    result += item;
                }
            }
        }
        return result;
    }
}
