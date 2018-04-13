// $FlowFixMe
export function objectTypedValues (object, oType:(typeof Object)) {
    // $FlowFixMe
    return (Object.values(object): oType[])
}