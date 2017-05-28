import React from 'react';

class EmailForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            list: [],
            cursor: 0,
            value1: ''
        }
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
    }

    handleKeyDown(event) {
        let cursor = this.state.cursor

        if (event.keyCode === 38) {
            cursor--
            this.setState({cursor})
            console.log(this.state.cursor)
        } else if (event.keyCode === 40) {
            cursor++
            this.setState({cursor})
            console.log(this.state.cursor)
        } else if (event.keyCode === 9) {
            event.preventDefault()
            cursor++
            this.setState({cursor})
            console.log(this.state.cursor)
        } else {
            
            
        }
    }

    handleKeyUp(event) {
        if (event.target.value.length > 0) {
            this.fetchNames(event.target.value)
            .then(res => {
                this.setState({list: res.users})
            })
        }
        
    }

    fetchNames(name) {
        return fetch(`https://trunkclub-ui-takehome.now.sh/search/${name}`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(res => res.json())
    }

    componentDidMount() {
        this.fetchNames('Ada').then(res => {
            this.setState({list:res.users})
            }
        )
    }

    render() { 
        return (
            <div>
                <div>
                    <input type="text" placeholder="To:" onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} />
                    <div>
                        <ul>
                            {this.state.list.map((item, index) => <li key={index}>{item.firstName}</li>)}
                        </ul>
                    </div>
                </div>
                <div>
                    <input type="text" placeholder="CC:" />
                </div>
                <div>
                    <input type="text" placeholder="Subject:" />
                </div>
                <div>
                    <textarea placeholder="Enter your message here..." />
                </div>
                <div>
                    <input type="submit" value="Send Email" />
                </div>
            </div>
        )
    }
    

}

export { EmailForm }