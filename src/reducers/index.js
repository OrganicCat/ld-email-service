import { combineReducers } from 'redux'
import emails from './emailReducer'

const ldEmailApp = combineReducers({
    emails
})

export default ldEmailApp