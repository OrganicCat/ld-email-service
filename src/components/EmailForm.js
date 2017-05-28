import React from 'react';
import { searchService } from '../utils/searchService'
import AutoComplete from './AutoComplete'

class EmailForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            list: [],
            cursor: 0,
            toField: [],
            ccField: []
        }

    }

    componentDidMount() {
        searchService('Ada').then(res => {
            this.setState({list:res.users})
            }
        )
    }

    render() { 
        return (
            <form>
                <AutoComplete fieldName="To:" fieldType={this.state.toField} />
                <AutoComplete fieldName="CC:" fieldType={this.state.ccField} />
                <div className="autocomplete">
                    <input type="text" placeholder="Subject:" />
                </div>
                <div className="autocomplete">
                    <textarea placeholder="Enter your message here..." />
                </div>
                <div className="autocomplete">
                    <input type="submit" value="Send Email" />
                </div>
            </form>
        )
    }
    

}

export { EmailForm }