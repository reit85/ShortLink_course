import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      if(err){
        this.setState({error: 'Bitte überprüfen Sie ihre E-Mail Adresse und Passwort.'});
      } else {
        this.setState({error: ''});
      }
    });
  }

  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box"> 
          <h1>Short Link</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="E-Mail"/>
            <input type="password" ref="password" name="password" placeholder="Passwort"/>
            <button className="button">Anmelden</button>
          </form>
          <p><NavLink to="/signup">Nocht nicht registriert?</NavLink></p>
        </div>
      </div>
    );
  }
}
