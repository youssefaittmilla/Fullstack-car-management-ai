import React, { Component } from 'react';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyToast from './MyToast';

const API = process.env.REACT_APP_API_URL || "http://localhost:9090";

export default class VoitureListe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      show: false,
      message: ''
    };
  }

  componentDidMount() {
    axios.get(`${API}/api/voitures`)
      .then(response => {
        const voitures = response.data._embedded.voitures.map(v => ({
          ...v,
          id: v._links.self.href.split('/').pop()
        }));
        this.setState({ voitures });
      })
      .catch(error => console.log(error));
  }

  deleteVoiture = (voitureId) => {
    axios.delete(`${API}/api/voitures/` + voitureId)
      .then(() => {
        this.setState({
          voitures: this.state.voitures.filter(v => v.id !== voitureId),
          show: true,
          message: "Voiture supprimée avec succès !"
        });
        setTimeout(() => this.setState({ show: false }), 3000);
      })
      .catch(error => console.log(error));
  };

  render() {
    const { voitures } = this.state;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast children={{ show: this.state.show, message: this.state.message, type: "danger" }}/>
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faCoffee} /> Liste Voitures
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Modele</th>
                  <th>Couleur</th>
                  <th>Immatricule</th>
                  <th>Annee</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {voitures.length === 0 ?
                  <tr align="center">
                    <td colSpan="7">Aucune Voiture n'est disponible</td>
                  </tr>
                  :
                  voitures.map(voiture => (
                    <tr key={voiture.id} align="center">
                      <td>{voiture.marque}</td>
                      <td>{voiture.modele}</td>
                      <td>{voiture.couleur}</td>
                      <td>{voiture.immatricule}</td>
                      <td>{voiture.annee}</td>
                      <td>{voiture.prix}</td>
                      <td>
                        <ButtonGroup>
                          <Link to={"/edit/" + voiture.id} className="btn btn-sm btn-outline-primary">
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{' '}
                          <Button size="sm" variant="outline-danger"
                            onClick={this.deleteVoiture.bind(this, voiture.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}