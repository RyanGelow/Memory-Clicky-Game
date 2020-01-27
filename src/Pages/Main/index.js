import React, { Component } from "react";
import Card from "./../../Partials/Card";
import Results from "./../../Partials/Results";
import Footer from "./../../Partials/Footer";
import { Link } from "react-router-dom";

// import the cards from a json list with image links
import cards from "./../../cards";
import bgimage from "./../../img/cat.jpg";


const backgroundStyle = {
    height: "100%",
    paddingBottom: "75px",
    backgroundImage: `url(${bgimage})`
};


class Main extends Component {
  
    // Setting this.state.cards to the cards json array
    state = {
        highScore: 0,
        currentScore: 0,
        selected: [],
        hovered: "",
        status: "",
        gameCards: [],
        gameType: "crowd"
    }

    shuffleCards = () => {
        this.setState({
            gameCards: this.state.gameCards.sort(() => Math.random() - .5)
        })
    }

    resetGame = () => {
        this.setState({
            selected: [],
            highScore: 0,
            currentScore: 0,
            status: "reset"
        })
        this.shuffleCards();
    }

    changeGame = () => {
        this.setState({
            status: "player"
        })
        if(this.state.currentScore > 0) {
            this.setState({
                selected: [],
                currentScore: 0,
                status: "reset"
            })
        }
        if(this.state.gameType == "crowd"){
            this.setState({
                gameType: "art",
                gameCards: cards.art.sort(() => Math.random() - .5)
            })
        }else {
            this.setState({
                gameType: "crowd",
                gameCards: cards.crowds.sort(() => Math.random() - .5)
            }) 
        }
    }

    componentWillMount() {
        if(this.state.gameType == "crowd") {
            this.setState({
                gameCards: cards.crowds.sort(() => Math.random() - .5)
            })
        }else {
            this.setState({
                gameCards: cards.art.sort(() => Math.random() - .5)
            })
        }
    }

    handleItemHover = data => {
        this.setState({
            hovered: data
        })
    }
    
    handleItemLeave = () => {
        this.setState({
            hovered: ""
        })
        
    }
    
    componentDidUpdate() {
        const hover = this.state.hovered;
        const image = document.getElementById(hover)
        const unhover = document.getElementsByClassName('gameCards')
        if(image) {
            image.classList.add('hovered')
        }else{
            for(let i = 0; i < unhover.length; i++) {
                unhover[i].classList.remove('hovered')
            }            
        }
        console.log(this.state.status)
    }
    
    

    handleItemClick = data => {
        // Returns Clicked ID
        
        if(this.state.selected.includes(data)) {
            if(this.state.currentScore > this.state.highScore) {
                this.setState({
                    highScore: this.state.currentScore
                })
            }
            this.setState({
                selected: [],
                currentScore: 0,
                status: "loser"
            })
        }else{
            var selected = this.state.selected
            selected.push(data)
            this.setState(prevState => {
                this.setState({
                    selected,
                    currentScore: this.state.currentScore + 1,
                    status: "player"
                }) 
                // console.log(prevState)
                if(this.state.currentScore === 11) {
                    this.setState({ 
                        highScore: 12, 
                        selected: [],
                        currentScore: 0,
                        status: "winner" 
                    })
                }
            })
        }
        this.shuffleCards()         
    };
    
    // Map over this.state.cards and render a FriendCard component for each friend object
    render() {
        // console.log(cards);
        return (
            <>
                <nav className="navbar navbar-info bg-dark border-bottom border-secondary" style={{"position": "sticky", "top": "0"}}>
                    <div className="container">
                        <Link to="/">
                            <p 
                            className={"d-inline-block align-top navbar-brand text-white m-0 "}>
                            <img 
                                src="./images/concert.png"  
                                width="30" 
                                height="30" 
                                className="d-inline-block align-top" 
                                alt="logo"/>
                            &nbsp;Disco Mosh Pit
                            </p>
                        </Link>
                        <button className="btn btn-outline-light" type="button" onClick={this.changeGame}>Change Style</button>
                    </div>
                </nav>
                <div style= {backgroundStyle}>
                    <div className="container">
                        <br/>
                        <div className="row pb-4">
                            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 mb-3 container">
                                <div className="row card score-card d-flex flex-row bg-light">
                                    <div className="col-xs-6 col-sm-6 col-md-12 col-lg-12 d-flex justify-content-center card-body p-2">
                                        <p className="card-title text-center m-0">Current Score: {this.state.currentScore} </p>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-12 col-lg-12 d-flex justify-content-center card-body p-2">
                                        <p className="title text-center m-0">Top Score: {this.state.highScore}</p>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center mb-2">
                                        <button className="btn btn-warning border-dark" type="button" onClick={this.resetGame}>Reset Game</button>
                                    </div>

                                    <hr/>
                                    <Results gameStatus={this.state.status} />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-10 col-lg-10">
                                <div 
                                    className="container d-flex justify-content-center"
                                    style={{"display": "flex", "flexDirection": "row", "flexWrap": "wrap"}}
                                    >
                                    {this.state.gameCards.map((each, index)=> {
                                        // console.log(each)
                                        return(
                                            <Card 
                                            key={index} 
                                            name={each.name} 
                                            image={each.image} 
                                            id={each.id}
                                            handleClick={this.handleItemClick}
                                            handleHover={this.handleItemHover}
                                            handleLeave={this.handleItemLeave}
                                            />
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
};

export default Main;