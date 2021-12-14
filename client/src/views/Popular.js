import React, { Component } from 'react'
import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import {Table, Col, Row} from 'react-bootstrap'

const formSchema = Yup.object().shape({
    "search": Yup.string(),

})

const initialValues = {
    search: ''
}

export default class Popular extends Component {
    constructor(){
        super();
        this.state={
            movies:[]
        }
    }

    handleSubmit=({search})=>{
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=16c47942fb66dc368097a99fe70cad81&language=en-US&page=1`)
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
                                    <Form>
                                        <button type="submit" className="btn btn-warning">See Trending Movies</button>
                                    </Form>
                                }

                        </Formik>
                    </Col>
                    <Col md={9}>
                        {/* movie table starts here */}
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
                    </Col>
                </Row>
            </div>
        )
    }
}
