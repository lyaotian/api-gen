export default class Property {
    name = "id"
    type = "int"
    genericType: string|null = null
    refType: string|null = null
    isArray = false
    doc = "描述"
    format?: 'long'|'int'|'int32'|'int64'|'float'|'double'
    last?: boolean = false
}