import React, { Component } from 'react';


export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            genre:[],
            movies:[],
            itemStart: 0,
            itemEnd:5

    }
}
    render() {
        return (
            <div style={{justifyContent: 'center', alignItems: 'center', display:'flex' }}>
               <img src='MoviesRusH.png' height={"380px"} width={'400px'} alt="Movie Poster"/>
            </div>
        )
    }
}
