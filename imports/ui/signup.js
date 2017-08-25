import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component{
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

    if(password.length < 6) {
      return this.setState({error: 'Das Passwort muss mindestens 6 Zeichen lang sein.'});
    }

    Accounts.createUser({email, password}, (err) => {
      if(err){
        this.setState({error: err.reason});
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
            <button className="button">Registrieren</button>
          </form>
          <NavLink to="/">Schon registriert?</NavLink>
        </div>
      </div>
    );
  }
}
