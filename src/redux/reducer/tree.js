const initialState = {
    id: 0,
    name:'Organizacion'
}

const HierarchyTreeReducer = (state = initialState, action) => {
  switch (action.type){
    case 'getData':
      return {...state, childrenCollection: action.data}
    default:
      return state
  }
}

export default HierarchyTreeReducer