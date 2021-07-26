//!!! Специальная ошибка в CharacterPage - this.foo.bar = 0 - 
//показывает как отдельный компонент не работает в отличие от других

import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import {BookPage, BookItem} from '../bookPage';
import HousePage from '../housePage';
import gotService from '../services/gotService';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./app.css";


// import PersonDetails from '../personDetails';

export default class App extends Component {

    state = {
        showRandomChar: true,
        error: false,
    }

    gotService = new gotService;

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
       this.setState((state) => {
           return {
            showRandomChar: !this.state.showRandomChar
           }
       });
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const char = this.state.showRandomChar ? <RandomChar /> : null;

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}  
                                <button 
                                    className="toggle-btn"
                                    onClick={this.toggleRandomChar}>Toggle Random Char</button>              
                            </Col>
                        </Row>

                        <Route path="/characters" component={CharacterPage}/>
                        <Route path="/houses" component={HousePage}/>
                        <Route path="/books" exact component={BookPage}/>
                        <Route path="/books/:id" render={
                            ({match}) => {
                                console.log(match);
                                const {id} = match.params;
                            return <BookItem bookId={id}/>}
                        }/>
                    </Container>
                </div>
            </Router>
        )
    }
};


