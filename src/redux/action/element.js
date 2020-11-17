const getHierarchyElement = element => ({ type: 'getHierarchyElement', data: element })

const setHierarchyElement = element => dispatch => dispatch(getHierarchyElement( element ))

export default { setHierarchyElement }