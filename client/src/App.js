import React, { Component } from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from './views/Register';
import Login from './views/Login';
import Logout from './views/Logout';
import EditProfile from './views/EditProfile'
import List from './views/List';
import Movies from './views/Movies';
import TopMovies from './views/TopMovies';
import Popular from './views/Popular';
import Search from './views/Search';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


export default class App extends Component {
  constructor(){
    super();
    this.state={
      token:'',
      collection:[]
    }
  }

  setToken = (token)=>{
    this.setState({token})
    localStorage.setItem('token',token)
  }

  static getDerivedStateFromProps = (props,state)=>{
    return {"token":localStorage.getItem('token'),  "collection":JSON.parse(localStorage.getItem('collection')||"[]") }
  }
  
  
  addToCollection=(movie)=>{
    let collection = this.state.collection
    console.log(this.state.collection)
    console.log(typeof this.state.collection)
    collection.push(movie)
    localStorage.setItem("collection",JSON.stringify(collection))
    this.setState({collection})
    alert(`You added ${movie.title} to your collection`)
  }

  removeFromCollection = (movie)=>{
    let collection=this.state.collection;
    // forindex
    collection.slice()
    this.setState({collection})
    localStorage.setItem("collection",JSON.stringify(collection))
    alert(`You remove ${movie.title} from your collection`)
  }

  render() {
    return (
      <div>
        <NavBar token={this.state.token}/>
        <Routes>

          <Route exact path = '/' element={
            <ProtectedRoute token={this.state.token}>
              <Movies/>
            </ProtectedRoute>
          }/>

          <Route exact path = '/top-rated' element={
            <ProtectedRoute token={this.state.token} setToken={this.setToken} addToCollection={this.addToCollection}>
              <TopMovies addToCollection={this.addToCollection}/>
            </ProtectedRoute>
          }/>
          
          <Route exact path = '/popular' element={
            <ProtectedRoute token={this.state.token} setToken={this.setToken} addToCollection={this.addToCollection}>
              <Popular addToCollection={this.addToCollection}/>
            </ProtectedRoute>
          }/>

          
          <Route exact path = '/search' element={
            <ProtectedRoute token={this.state.token} setToken={this.setToken} >
              <Search addToCollection={this.addToCollection}/>
            </ProtectedRoute>
          }/>
          
          <Route exact path = '/my-collection' element={
            <ProtectedRoute token={this.state.token}>
              <List
                collection={this.state.collection} 
                removeFromCollection={this.removeFromCollection} 
              />
            </ProtectedRoute>
          }/>

          <Route exact path = '/edit-profile' element={
            <ProtectedRoute token={this.state.token}>
              <EditProfile/>
            </ProtectedRoute>
          }/>

          <Route exact path = '/logout' element={
            <ProtectedRoute token={this.state.token}>
              <Logout setToken={this.setToken}/>
            </ProtectedRoute>
          }/>
          
          <Route path = '/login' element={<Login setToken={this.setToken}/>}/>
          <Route path = '/register' element={<Register/>}/>

        </Routes>
      </div>
    )
  }
}