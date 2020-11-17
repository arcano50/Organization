const initialState = {
  element:{}
}

const HierarchyElementReducer = (state = initialState, action) => {
  switch(action.type){
    case 'getHierarchyElement':
      return {element: action.data}
    default:
      return state
  }
}

export default HierarchyElementReducer