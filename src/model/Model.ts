import Property from './Property'
import ModelRef from './ModelRef'
export default class Model {
    doc = "User"
    name = "User"
    refs: ModelRef[] = [
        
    ]/**引用其它类 */
    properties: Property[] = []
    extends?: string
}