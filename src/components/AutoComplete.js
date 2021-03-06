import React from 'react'
import { searchService } from '../utils/searchService'
import { connect } from 'react-redux'

class AutoComplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      list: [],
      cursor: 0,
      loading: false,
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.checkActive = this.checkActive.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleLoseFocus = this.handleLoseFocus.bind(this)
  }

  handleKeyDown(event) {
    let cursor = this.state.cursor

    if (event.keyCode === 38) {
      cursor--
      this.setState({ cursor })
    } else if (event.keyCode === 40) {
      cursor++
      this.setState({ cursor })
    } else if (event.keyCode === 9) {
      if (this.state.list.length > 0) {
        event.preventDefault()
        cursor++
        this.setState({ cursor })
      }
    } else if (event.keyCode === 13) {
      event.preventDefault()
      if (!this.state.list[cursor]) {
        return
      }
      if (this.props.fieldName === 'To:') {
        event.target.value = this.state.list[cursor].email
        this.props.setToField(event.target.value)
      } else {
        let ccArray = event.target.value.trim().split(',')
        ccArray = ccArray.map((element, index) => {
          if (index === ccArray.length - 1) {
            return this.state.list[cursor].email.trim()
          } else {
            return element.trim()
          }
        })
        this.props.setCCField(ccArray)
        event.target.value = ccArray.join(', ')
      }

      this.setState({ list: [] })
    }
  }

  removeEmail(email) {
    // Remove email, was going to use if creating email tags
  }

  validateCustomEmail(email) {
    // Did not write this regex
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  handleKeyUp(event) {
    if (event.target.value.length > 2 && this.props.fieldName === 'To:') {
      this.setState({ loading: true })
      searchService(event.target.value).then(res => {
        this.setState({ list: res.users, loading: false })
      })
    } else if (
      event.target.value.length > 2 &&
      this.props.fieldName === 'CC:'
    ) {
      let ccArray = event.target.value.split(',')
      let newItem = ccArray[ccArray.length - 1].trim()
      ccArray.forEach(item => this.validateCustomEmail(item.trim()))
      if (newItem) {
        this.setState({ loading: true })
        searchService(newItem).then(res => {
          this.setState({ list: res.users, loading: false })
        })
      }
    }
  }

  handleLoseFocus(event) {
    this.setState({ list: [] })
  }

  handleClick(item) {
    if (this.props.fieldName === 'To:') {
      this.textInput.value = item.email
      this.setState({ list: [] })
      this.props.setToField(this.textInput.value)
    } else {
      let ccArray = this.textInput.value.trim().split(',')
      ccArray = ccArray.map((element, index) => {
        if (index === ccArray.length - 1) {
          return item.email.trim()
        } else {
          return element.trim()
        }
      })
      this.props.setCCField(ccArray)
      this.textInput.value = ccArray.join(', ')

      this.setState({ list: [] })
    }
  }

  checkActive(index) {
    return this.state.cursor === index ? 'list_selected' : ''
  }

  render() {
    return (
      <div className="autocomplete">
        <input
          type="text"
          ref={input => {
            this.textInput = input
          }}
          placeholder={this.props.fieldName}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onBlur={this.handleLoseFocus}
        />
        {this.state.loading &&
          <div className="autocomplete__loading">Loading...</div>}
        <div className="autocomplete__list">
          <ul>
            {this.state.list.map((item, index) => (
              <li
                key={index}
                className={this.checkActive(index)}
                onClick={this.handleClick.bind(this, item)}
              >
                {item.firstName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

let mapStateToProps = store => {
  return {
    pets: store.pets,
  }
}

let mapDispatchToProps = (dispatch, state) => {
  return {
    setToField: field => {
      dispatch({
        type: 'SET_TO_FIELD',
        tofield: field,
      })
    },
    setCCField: field => {
      dispatch({
        type: 'SET_CC_FIELD',
        ccfield: field,
      })
    },
  }
}

AutoComplete = connect(mapStateToProps, mapDispatchToProps)(AutoComplete)

export default AutoComplete
