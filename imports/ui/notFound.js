import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default () => {
  return (
    <div className="boxed-view">
        <div className="boxed-view__box"> 
          <h1>Nicht gefunden</h1>
          <p> Leider kann ich die gewünschte Seite nicht finden.</p>
          <NavLink to="/" className="button button--link">Zurück</NavLink>
        </div>
      </div>
              
  );
};
