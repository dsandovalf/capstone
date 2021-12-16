import React, { Component } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        const styles={
            navbar:{
                marginBottom:"20px"
            }
        }
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg" style={styles.navbar}>
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/"><img src="MoviesRus.png" height="50" alt="Movie Poster"/></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        {this.props.token ?
                        <>
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/top-rated">Top Rated</Nav.Link>
                                <Nav.Link as={Link} to="/popular">Trending Movies</Nav.Link>
                                <Nav.Link as={Link} to="/search"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg></Nav.Link>
                                <Nav.Link href="/auth/login">Movie</Nav.Link>

                            </Nav>
                            <Nav>
                                <Nav.Link as={Link} to="/my-collection">My Movie Collection</Nav.Link>
                                <NavDropdown title="My Profile" id="collasible-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/edit-profile">Edit Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </>
                        :
                            <Nav>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </Nav>
                        }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}