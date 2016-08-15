
export class Utils {

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