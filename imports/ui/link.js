import React from 'react';
import PropTypes from 'prop-types';
import Privateheader from './Privateheader';
import AddLink from './AddLink';
import LinksList from './LinksList';
import LinksListFilters from './LinksListFilters';

export default () => {
  return (
      <div>
        <Privateheader title="Short Link"/>
        <div className="page-content">
          <AddLink/>
          <LinksListFilters/>
          <LinksList/>
        </div>
      </div>
    );
};

