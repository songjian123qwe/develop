import { Item } from './generator'
/**
 * @param  {} {FieldContext}
 */
export default ({ FieldContext }) => {

    return (
        <React.Fragment>
            <form>
                {
                    Item(FieldContext)
                }
            </form>
        </React.Fragment>
    )
}