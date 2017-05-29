const emails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TO_FIELD':
            return Object.assign({}, state, {tofield:action.tofield})
        case 'SET_CC_FIELD':
            return Object.assign({}, state, {ccfield:action.ccfield})
        case 'RESET_FIELDS':
            return Object.assign({}, state, {tofield:'', ccfield:[]})
        default:
            return state
    }
}

export default emails