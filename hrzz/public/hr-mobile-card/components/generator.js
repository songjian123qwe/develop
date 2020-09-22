import { createItem } from './inputItem'
/**
 * Item
 * @param {*} FieldContext 
 */
export const Item = (FieldContext) => {
    return (
        <FieldContext.Consumer>
            {
                ({ fieldMeta, onFieldChange, meta, ...other }) => {
                    return (
                        <React.Fragment>
                            {
                                meta.map(props => createItem({ ...props, fieldMeta: fieldMeta[other.cardName], onChange: onFieldChange, meta, other }))
                            }
                        </React.Fragment>
                    )
                }
            }
        </FieldContext.Consumer>
    )
}