import React, { Component } from "react";
import Card from "./../../Partials/Card";
import { Link } from "react-router-dom";

// import the cards from a json list with image links
import cards from "./../../cards";

class Main extends Component {
  
    // Setting this.state.friends to the friends json array
    state = {
        highScore: 0,
        currentScore: 0,
        selected: [],
        hovered: "",
        cards
    }

    shuffleCards = () => {
        this.setState({
            cards: this.state.cards.sort(() => Math.random() - .5)
        })
    }

    resetGame = () => {
        this.setState({
            selected: [],
            highScore: 0,
            currentScore: 0
        })
        alert("Game reset! Everyone deserves a second chance.")
    }

    componentWillMount() {
        this.shuffleCards()
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
    } 

    handleItemClick = data => {
        // Returns Clicked ID

        if(this.state.selected.includes(data)) {
            alert("You Lose!")
            if(this.state.currentScore > this.state.highScore) {
                this.setState({
                    highScore: this.state.currentScore
                })
            }
            this.setState({
                selected: [],
                currentScore: 0
            })
        }else{
            var selected = this.state.selected
            selected.push(data)
            // this.setState({
            //     selected,
            //     currentScore: this.state.currentScore + 1
            // })
            this.setState(prevState => {
                this.setState({
                    selected,
                    currentScore: this.state.currentScore + 1
                }) 
                console.log(prevState)
                if(this.state.currentScore === 11) {
                    console.log("hit")
                    alert("You Win!")
                    this.setState({ 
                        highScore: 12, 
                        selected: [],
                        currentScore: 0 
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
                <nav className="navbar navbar-info bg-info border-bottom border-secondary" style={{"position": "sticky", "top": "0"}}>
                    <div className="container">
                        <Link
                            to="/"
                            // onMouseOver={props.logoHover(blackText)} 
                        >
                            <p 
                            className={"d-inline-block align-top navbar-brand text-white m-0 "}>
                            <img 
                                src="http://logok.org/wp-content/uploads/2016/04/CCTV-6-logo-2016.png"  
                                width="30" 
                                height="30" 
                                className="d-inline-block align-top" 
                                alt="logo"/>
                            Memory Game
                            </p>
                        </Link>
                    <button className={"btn btn-warning text-dark"} type="button" onClick={this.resetGame}>Reset Game</button>
                    

                    </div>
                </nav>
                <div className="container">
                    <br/>
                    <div className="row pb-4">
                        <div className="col-sm-6 col-xs-12 d-flex justify-content-around">
                            <div class="card" style={{"height": "65px"}}>
                                <div class="card-body">
                                    <h5 className="card-title text-center">Current Score: {this.state.currentScore} </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xs-12 d-flex justify-content-around">
                            <div class="card" style={{"height": "65px"}}>
                                <div class="card-body">
                                    <h5 className="title text-center">Top Score: {this.state.highScore}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div 
                    className="container d-flex justify-content-center"
                    style={{"display": "flex", "flexDirection": "row", "flexWrap": "wrap"}}
                >
                    {this.state.cards.map((each, index)=> {
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
            </>
        )
    }
}

export default Main;