import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import gotService from '../services/gotService';
import {withRouter} from "react-router-dom";


class BookPage extends Component {

    state = {
        selectedBook: "",
        error: false
    }

    gotService = new gotService();

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <ItemList 
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => `${name}`}
            />
        ) 
    }
}

export default withRouter(BookPage);