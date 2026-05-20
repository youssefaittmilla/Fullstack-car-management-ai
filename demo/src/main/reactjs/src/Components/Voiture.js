import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';

const API = process.env.REACT_APP_API_URL || "http://localhost:9090";

export default class Voiture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      marque: '',
      modele: '',
      couleur: '',
      immatricule: '',
      annee: '',
      prix: '',
      show: false,
      message: ''
    };
    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
  }

  componentDidMount() {
    const id = this.props.params ? this.props.params.id : null;
    if (id) {
      axios.get(`${API}/api/voitures/` + id)
        .then(response => {
          const v = response.data;
          this.setState({
            id: v.id,
            marque: v.marque,
            modele: v.modele,
            couleur: v.couleur,
            immatricule: v.immatricule,
            annee: v.annee,
            prix: v.prix
          });
        })
        .catch(error => console.log(error));
    }
  }

  voitureChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitVoiture(event) {
    event.preventDefault();
    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      annee: this.state.annee,
      prix: this.state.prix
    };

    if (this.state.id) {
      axios.put(`${API}/api/voitures/` + this.state.id, voiture)
        .then(() => {
          this.setState({ show: true, message: "Voiture modifiée avec succès !" });
          setTimeout(() => this.setState({ show: false }), 3000);
        })
        .catch(error => console.log(error));
    } else {
      axios.post(`${API}/api/voitures`, voiture)
        .then(() => {
          this.setState({ show: true, message: "Voiture ajoutée avec succès !" });
          setTimeout(() => this.setState({ show: false }), 3000);
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const isEdit = this.state.id ? true : false;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast children={{ show: this.state.show, message: this.state.message, type: "success" }}/>
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>{isEdit ? "Modifier Voiture" : "Ajouter Voiture"}</Card.Header>
          <Form onSubmit={this.submitVoiture} id="VoitureFormId">
            <Card.Body>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridMarque">
                  <Form.Label>Marque</Form.Label>
                  <Form.Control required name="marque" type="text"
                    className={"bg-dark text-white"}
                    placeholder="Entrez Marque Voiture"
                    value={this.state.marque}
                    onChange={this.voitureChange}/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridModele">
                  <Form.Label>Modele</Form.Label>
                  <Form.Control required name="modele" type="text"
                    className={"bg-dark text-white"}
                    placeholder="Entrez Modele Voiture"
                    value={this.state.modele}
                    onChange={this.voitureChange}/>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCouleur">
                  <Form.Label>Couleur</Form.Label>
                  <Form.Control required name="couleur" type="text"
                    className={"bg-dark text-white"}
                    placeholder="Entrez Couleur Voiture"
                    value={this.state.couleur}
                    onChange={this.voitureChange}/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridImmatricule">
                  <Form.Label>Immatricule</Form.Label>
                  <Form.Control required name="immatricule" type="text"
                    className={"bg-dark text-white"}
                    placeholder="Entrez Immatricule Voiture"
                    value={this.state.immatricule}
                    onChange={this.voitureChange}/>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAnnee">
                  <Form.Label>Annee</Form.Label>
                  <Form.Control required name="annee" type="number"
                    className={"bg-dark text-white"}
                    placeholder="Entrez Annee Voiture"
                    value={this.state.annee}
                    onChange={this.voitureChange}/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPrix">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control required name="prix" type="number"
                    className={"bg-dark text-white"}
                    placeholder="Entrez Prix Voiture"
                    value={this.state.prix}
                    onChange={this.voitureChange}/>
                </Form.Group>
              </Row>
            </Card.Body>
            <Card.Footer style={{"textAlign":"right"}}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> Submit <FontAwesomeIcon icon={faSave} />
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}