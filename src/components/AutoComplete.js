import React from 'react';
import { searchService } from '../utils/searchService'

class AutoComplete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            list: [],
            cursor: 0
        }
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.checkActive = this.checkActive.bind(this)
    }

    handleKeyDown(event) {
        let cursor = this.state.cursor

        if (event.keyCode === 38) {
            cursor--
            this.setState({cursor})
        } else if (event.keyCode === 40) {
            cursor++
            this.setState({cursor})
        } else if (event.keyCode === 9) {
            event.preventDefault()
            cursor++
            this.setState({cursor})
        } else if (event.keyCode === 13) {
            event.preventDefault()
            event.target.value += this.state.list[cursor].email
        }
    }

    removeEmail(email) {
        // Remove email, was going to use if creating email tags
    }

    validateCustomEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(email + " " + re.test(email))
        return re.test(email);
    }

    handleKeyUp(event) {
        if (event.target.value.length > 0 && this.props.fieldName === "To:") {
            searchService(event.target.value)
            .then(res => {
                this.setState({list: res.users})
            })
        } else if (event.target.value.length > 0) {
            let ccArray = event.target.value.split(",")
            let newItem = ccArray[ccArray.length-1].trim()
            ccArray.forEach((item) => this.validateCustomEmail(item.trim()))
            if (newItem) {
                searchService(newItem)
                .then(res => {
                    this.setState({list: res.users})
                })
            }
        }
    }

    checkActive(index) {
        return (this.state.cursor === index) ? 'list_selected' : ''
    }

    render() { 
        return (
            <div className="autocomplete">
                <input type="text" placeholder={this.props.fieldName} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} />
                <div className="autocomplete__list">
                    <ul>
                        {this.state.list.map((item, index) => <li key={index} className={this.checkActive(index)}>{item.firstName}</li>)}
                    </ul>
                </div>
            </div>
        )
    }

}

export default AutoComplete