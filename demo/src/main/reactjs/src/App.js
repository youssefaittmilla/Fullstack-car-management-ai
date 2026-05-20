import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Footer from './Components/Footer';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';
import VoitureAI from './Components/VoitureAI';
// Wrapper pour passer les params à Voiture
function VoitureWrapper() {
  const params = useParams();
  return <Voiture params={params} />;
}

function App() {
  const marginTop = { marginTop: "20px" };
  return (
    <Router>
      <NavigationBar/>
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Routes>
              <Route path="/" element={<Bienvenue/>}/>
              <Route path="/add" element={<VoitureWrapper/>}/>
              <Route path="/edit/:id" element={<VoitureWrapper/>}/>
              <Route path="/list" element={<VoitureListe/>}/>
              <Route path="/ai" element={<VoitureAI/>}/>
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;