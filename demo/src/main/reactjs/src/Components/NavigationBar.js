import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to={"/"} className="navbar-brand">
          <Link to={"/"} className="navbar-brand">
  🚗 Master Miola
</Link>
        </Link>
        <Nav className="mr-auto">
          <Link to={"add"} className="nav-link">Ajouter Voiture</Link>
          <Link to={"list"} className="nav-link">Liste Voitures</Link>
          <Link to={"ai"} className="nav-link">🤖 Assistant IA</Link>
        </Nav>
      </Navbar>
    );
  }
}

export default NavigationBar;