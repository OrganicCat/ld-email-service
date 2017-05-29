import React from 'react';
import AutoComplete from './AutoComplete'
import { connect } from 'react-redux'

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
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
    }

    render() { 
        let toField = this.props.emails.tofield ? this.props.emails.tofield : ''
        let ccField = this.props.emails.ccfield ? this.props.emails.ccfield : ''

        return (
            <form onSubmit={this.handleSubmit}>
                <AutoComplete fieldName="To:" fieldType={this.state.toField} />
                <AutoComplete fieldName="CC:" fieldType={this.state.ccField} />
                <div className="autocomplete">
                    <input type="text" placeholder="Subject:" />
                </div>
                <div className="autocomplete">
                    <textarea placeholder="Enter your message here..." />
                </div>
                <div>to: {toField}</div>
                <div>cc: {ccField}</div>
                <div className="autocomplete">
                    <input type="submit" value="Send Email" />
                </div>
            </form>
        )
    }

}

const mapStateToProps = (store) => {
    console.log(store)
  return {
    emails: store.emails
  }
}

EmailForm = connect(
    mapStateToProps,
    null
)(EmailForm)

export { EmailForm }