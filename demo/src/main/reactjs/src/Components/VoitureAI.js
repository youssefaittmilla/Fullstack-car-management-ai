import React, { Component } from 'react';
import { Card, Button, Form, Row, Col, Tab, Tabs, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || "http://localhost:9090";

export default class VoitureAI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      // Résumé
      resumeId: '',
      resumeResult: '',
      // Recommandation
      budget: '',
      couleur: '',
      usage: '',
      recommandationResult: '',
      // Comparaison
      id1: '',
      id2: '',
      comparaisonResult: '',
      // UI
      loading: false,
      activeTab: 'resume'
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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getResume = () => {
    if (!this.state.resumeId) return;
    this.setState({ loading: true, resumeResult: '' });
    axios.get(`${API}/ai/voitures/${this.state.resumeId}/resume`)
      .then(res => this.setState({ resumeResult: res.data, loading: false }))
      .catch(() => this.setState({ resumeResult: "Erreur.", loading: false }));
  };

  getRecommandation = () => {
    if (!this.state.budget) return;
    this.setState({ loading: true, recommandationResult: '' });
    axios.get(`${API}/ai/voitures/recommander`, {
      params: {
        budget: this.state.budget,
        couleur: this.state.couleur || 'peu importe',
        usage: this.state.usage || 'usage général'
      }
    })
      .then(res => this.setState({ recommandationResult: res.data, loading: false }))
      .catch(() => this.setState({ recommandationResult: "Erreur.", loading: false }));
  };

  getComparaison = () => {
    if (!this.state.id1 || !this.state.id2) return;
    this.setState({ loading: true, comparaisonResult: '' });
    axios.get(`${API}/ai/voitures/comparer`, {
      params: { id1: this.state.id1, id2: this.state.id2 }
    })
      .then(res => this.setState({ comparaisonResult: res.data, loading: false }))
      .catch(() => this.setState({ comparaisonResult: "Erreur.", loading: false }));
  };

  renderResult(text) {
    if (!text) return null;
    return (
      <div className="mt-3 p-3" style={{
        background: '#1a1a2e',
        border: '1px solid #00d4aa',
        borderRadius: '8px',
        whiteSpace: 'pre-wrap',
        lineHeight: '1.7'
      }}>
        {text}
      </div>
    );
  }

  renderVoitureSelect(name, value, exclude) {
    const { voitures } = this.state;
    return (
      <Form.Select
        name={name}
        value={value}
        className="bg-dark text-white"
        onChange={this.handleChange}>
        <option value="">-- Sélectionner une voiture --</option>
        {voitures
          .filter(v => v.id !== exclude)
          .map(v => (
            <option key={v.id} value={v.id}>
              {v.marque} {v.modele} — {v.couleur} — {v.annee} — {v.immatricule}
            </option>
          ))
        }
      </Form.Select>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>
          <FontAwesomeIcon icon={faRobot} /> Assistant IA — Voitures
        </Card.Header>
        <Card.Body>
          <Tabs
            activeKey={this.state.activeTab}
            onSelect={tab => this.setState({ activeTab: tab })}
            variant="pills"
            className="mb-3">

            {/* ── RÉSUMÉ ── */}
            <Tab eventKey="resume" title="📝 Résumé">
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Sélectionner une voiture</Form.Label>
                  {this.renderVoitureSelect('resumeId', this.state.resumeId, null)}
                </Col>
              </Row>
              <Button variant="success" size="sm" onClick={this.getResume} disabled={loading}>
                {loading ? <Spinner size="sm" animation="border"/> : "Générer le résumé"}
              </Button>
              {this.renderResult(this.state.resumeResult)}
            </Tab>

            {/* ── RECOMMANDATION ── */}
            <Tab eventKey="recommandation" title="⭐ Recommandation">
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Label>Budget (MAD)</Form.Label>
                  <Form.Control
                    type="number" name="budget"
                    placeholder="Ex: 100000"
                    className="bg-dark text-white"
                    value={this.state.budget}
                    onChange={this.handleChange}/>
                </Col>
                <Col md={4}>
                  <Form.Label>Couleur préférée</Form.Label>
                  <Form.Control
                    type="text" name="couleur"
                    placeholder="Ex: Rouge"
                    className="bg-dark text-white"
                    value={this.state.couleur}
                    onChange={this.handleChange}/>
                </Col>
                <Col md={4}>
                  <Form.Label>Usage prévu</Form.Label>
                  <Form.Control
                    type="text" name="usage"
                    placeholder="Ex: ville, autoroute..."
                    className="bg-dark text-white"
                    value={this.state.usage}
                    onChange={this.handleChange}/>
                </Col>
              </Row>
              <Button variant="warning" size="sm" onClick={this.getRecommandation} disabled={loading}>
                {loading ? <Spinner size="sm" animation="border"/> : "Obtenir une recommandation"}
              </Button>
              {this.renderResult(this.state.recommandationResult)}
            </Tab>

            {/* ── COMPARAISON ── */}
            <Tab eventKey="comparaison" title="⚖️ Comparaison">
              <Row className="mb-3">
                <Col md={5}>
                  <Form.Label>Voiture A</Form.Label>
                  {this.renderVoitureSelect('id1', this.state.id1, this.state.id2)}
                </Col>
                <Col md={2} className="d-flex align-items-end justify-content-center pb-1">
                  <strong>VS</strong>
                </Col>
                <Col md={5}>
                  <Form.Label>Voiture B</Form.Label>
                  {this.renderVoitureSelect('id2', this.state.id2, this.state.id1)}
                </Col>
              </Row>
              <Button variant="info" size="sm" onClick={this.getComparaison} disabled={loading}>
                {loading ? <Spinner size="sm" animation="border"/> : "Comparer les voitures"}
              </Button>
              {this.renderResult(this.state.comparaisonResult)}
            </Tab>

          </Tabs>
        </Card.Body>
      </Card>
    );
  }
}