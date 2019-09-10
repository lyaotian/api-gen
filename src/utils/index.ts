
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

    static getNumberType(format: string = '', language: Languages): string {
        if (!format){
            console.warn('missing number format!!');
            return '';
        }

        if (format == 'int32' || format == 'int' || format == 'integer'){
            switch (language) {
                case "objc": {
                    return 'NSInteger'
                }
                case "kotlin":
                case "swift": {
                    return 'Int'
                }
                default:{
                    return 'int'
                }
            }
        }else if(format == 'int64' || format == 'long'){
            switch (language) {
                case "objc": {
                    return 'NSInteger'
                }
                case "kotlin":
                case "swift": {
                    return 'Int64'
                }
                default:{
                    return 'long'
                }
            }
        }else if(format == 'float'){
            switch (language) {
                case "objc": {
                    return 'CGFloat'
                }
                case "kotlin":
                case "swift": {
                    return 'Float'
                }
                default:{
                    return 'float'
                }
            }
        }else if(format == 'double'){
            switch (language) {
                case "objc": {
                    return 'double'
                }
                case "kotlin":
                case "swift": {
                    return 'Double'
                }
                default:{
                    return 'double'
                }
            }
        }else if(format == 'decimal'){
            switch (language) {
                case "objc": {
                    return 'double'
                }
                case "kotlin": {
                    return 'BigDecimal'
                }
                case "swift": {
                    return 'Double'
                }
                default:{
                    return 'double'
                }
            }
        }else {
            console.warn('unsupport number format: ' + format);
            return format;
        }
    }

    static getRefType(refType: string | undefined | null): string{
        if (!!refType) {
            let lIndex = refType.lastIndexOf('/');
            if (lIndex > 0){
                return refType.substring(lIndex + 1);
            }
            if (refType.toLowerCase() == 'string') {
                return 'string'
            }
        }
        return "BaseModel";
    }

    /**转换成首字母小写的驼峰式命名 */
    static toCamelName(input = '', divide = '/'): string{
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
