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
            ccField: [],
            callbackMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        
        let messageObj = {
            "to": this.props.emails.tofield,
            "cc": this.props.emails.ccfield,
            "subject": this.subject.value,
            "body": this.message.value
        }

        messageObj = JSON.stringify(messageObj)

        fetch(`https://trunkclub-ui-takehome.now.sh/submit`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: messageObj
        }).then((response) => {
            console.log("Good stuff", response)
            if (response.status === 400) {
                this.setState({callbackMessage: <div>400 Error: You entered bad data. BAD, <a href='http://imgur.com/7pTw5YK'>BAD DATA.</a></div>})
            } else if (response.status === 500) {
                this.setState({callbackMessage: <div>500 Error: <a href='http://imgur.com/yHq0CWZ'>Something</a> went wrong. It's probably fine, <a href='http://imgur.com/9f8x6MF'>try again if you still have all your appendages.</a>"</div>})
            } else if (response.status === 200) {
                this.setState({callbackMessage: <div>Success sending <a href='https://s-media-cache-ak0.pinimg.com/736x/3a/b4/30/3ab430f17c86c76b36532e19226c0e8c.jpg'>email!</a></div>})
                this.props.resetFields()
                document.getElementById("myForm").reset()
            }
        }).catch((err) => {
            this.setState({callbackMessage: <div>I don't know <a href='http://imgur.com/HEkVKO5'>what</a> just happened. Try refreshing the page.</div>})
        });
    }

    render() { 
        //let toField = this.props.emails.tofield ? this.props.emails.tofield : ''
        //let ccField = this.props.emails.ccfield ? this.props.emails.ccfield : ''

        return (
            <form onSubmit={this.handleSubmit} id="myForm">
                <AutoComplete fieldName="To:" />
                <AutoComplete fieldName="CC:" />
                <div className="autocomplete">
                    <input type="text" ref={(input) => { this.subject = input; }} placeholder="Subject:" />
                </div>
                <div className="autocomplete">
                    <textarea ref={(input) => { this.message = input; }} placeholder="Enter your message here..." />
                </div>
                <div className="autocomplete">{this.state.callbackMessage}</div>
                <div className="autocomplete">
                    <input type="submit" value="Send Email" />
                </div>
            </form>
        )
    }

}

const mapStateToProps = (store) => {
  return {
    emails: store.emails
  }
}

let mapDispatchToProps = (dispatch, state) => {
        return {
            resetFields: () => {
                dispatch({
                    type: 'RESET_FIELDS'
                })
            }
        }
    }

EmailForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(EmailForm)

export { EmailForm }