import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

export default class MyToast extends Component {
  render() {
    const { show, message, type } = this.props.children;
    return (
      <Toast
        show={show}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          minWidth: '200px',
          backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
          color: 'white'
        }}>
        <Toast.Header closeButton={false}
          style={{
            backgroundColor: type === 'success' ? '#218838' : '#c82333',
            color: 'white'
          }}>
          <strong className="mr-auto">
            {type === 'success' ? '✅ Succès' : '❌ Suppression'}
          </strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    );
  }
}