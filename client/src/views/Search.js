import React, { Component } from 'react';
import * as Yup from 'yup';
import {Formik, Field, Form} from 'formik';
import Table from 'react-bootstrap/Table';
import {Col, Row} from 'react-bootstrap';

const formSchema = Yup.object().shape({
    "search": Yup.string().required("Required"),

})

const initialValues = {
    search: ''
}

export default class Search extends Component {
    constructor(){
        super();
        this.state={
            movies:[],
        }
    }

    handleSubmit=({search})=>{
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=16c47942fb66dc368097a99fe70cad81&language=en-US&query=${search}&page=1&include_adult=false`)
            .then(res=>res.json())
            .then(data=>{
                this.setState({
                    movies: data.results,
                }, ()=>console.log(this.state.movies))
            })
    }    
    

    render() {
        return (
            <div>
                 <Row>
                    <Col md={2}>
                        <h3>Search </h3>
                        <h3>for a </h3>
                        <h3>Movie</h3>
                        <Formik initialValues={initialValues}
                                validationSchema={formSchema}
                                onSubmit={
                                    (values, {resetForm})=>{
                                    this.handleSubmit(values);
                                    resetForm(initialValues);
                                    }
                                }
                                >
                                {
                                    ({errors, touched})=>(
                                    <Form>
                                        <label htmlFor="search" className="form-label"></label>
                                        <Field name="search" className="form-control" />
                                        {errors.search && touched.search ? (<div style={{color:'red'}}>{errors.search}</div>):null}
                                        <br/>
                                        <button type="submit" className="btn btn-warning">Search</button>
                                    </Form>
                                    )
                                }

                        </Formik>
                    </Col>
                    <br/>
                    <Col md={9}>
                        <Row>
                            {this.state.movies?.length > 0  ?
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Movie Poster</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Release Date</th>
                                            <th>Rating</th>
                                            <th>Add to Collection</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.movies.map(
                                            movie => (
                                                <tr key={movie.id}>
                                                    <td><img src={ "https://image.tmdb.org/t/p/original/" + movie.poster_path} height="200" alt="Movie Poster"/></td>
                                                    <td>{movie.title}</td>
                                                    <td>{movie.overview}</td>
                                                    <td>{movie.release_date}</td>
                                                    <td>{movie.vote_average}</td>
                                                    <td>{<button type="submit" className="btn btn-danger" onClick={()=> this.props.addToCollection(movie)}>Add to Collection</button>}</td>
                                                </tr>
                                            )
                                        )
                                        
                                        }
                                    </tbody>
                                </Table>
                            :''}
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}