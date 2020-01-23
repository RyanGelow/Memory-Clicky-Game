import React from "react";

const win = <div className="col-12 d-flex justify-content-center card-body p-2 border-top border-secondary bg-success"><small className="card-title m-0">You Win!</small></div>;
const lose = <div className="col-12 d-flex justify-content-center card-body p-2 border-top border-secondary bg-danger"><small className="card-title m-0">You Lose! Try Again!</small></div>;
const play = <div className="col-12 d-flex justify-content-center card-body p-2 border-top border-secondary"><small className="card-title m-0">Try to select each tile only once without repeating any selections.</small></div>;
const reset = <div className="col-12 d-flex justify-content-center card-body p-2 border-top border-secondary bg-warning"><small className="card-title m-0">Scores reset to -0-.</small></div>;

function Winner(props) {
    return win;
}
function Loser(props) {
    return lose;
}
function Player(props) {
    return play;
}
function Resetter(props) {
    return reset;
}

const Results = props => {

    const gameStatus = props.gameStatus;
    if(gameStatus == "player") {
        // return (<Player />);
        return null;
    }
    if(gameStatus == "winner") {
        return <Winner />;
    }
    if(gameStatus == "loser") {
        return <Loser />;
    }
    if(gameStatus == "reset") {
        return <Resetter />;
    }
    else {
        return <Player />;
    }
}

export default Results;