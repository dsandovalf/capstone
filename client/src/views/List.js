import React from 'react'
import {Table, Button} from "react-bootstrap";
    
    

    
    export default function List(props) {
        
    return(
        <div>
            {Object.keys(props.collection).length>0 ? 
            (<>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Movie Poster</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Rating</th>
                        <th>Release Date</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(props.collection).map(
                            (key)=>(
                                <tr key={props.collection[key].id}>
                                    <td>
                                        <img 
                                        alt = "Movie Poster"
                                        style={{height:"100px", objectFit:"contain"}}
                                        src={"https://image.tmdb.org/t/p/original/" + props.collection[key].poster_path ?? "https://res.cloudinary.com/cae67/image/upload/v1629310111/fakebook_shop/no-image_nkau78.png"}
                                        />
                                    </td>
                                    <td>{props.collection[key].title ?? "No title"}</td>
                                    <td>{props.collection[key].overview ?? "No Description"}</td>
                                    <td>{props.collection[key].vote_average}</td>
                                    <td>{props.collection[key].release_date}</td>
                                    <td>
                                        <Button 
                                            variant="warning"
                                            onClick={()=>props.removeFromCollection(props.collection[key])}
                                            >
                                                Remove Movie
                                        </Button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                </tbody>
            </Table>
            </>):(
                <h2>Your movie collection is empty</h2>
            )
        }
        </div>
    )

}
