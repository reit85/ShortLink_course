import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }

  onSubmit(e){
    e.preventDefault();
    const {url} = this.state;

     Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({error: err.reason});
      }
    });

  }

  onChange(e){
    this.setState({
      url: e.target.value.trim()
    });
  }

  handleModalClose(){
    this.setState({
      isOpen: false, 
      url: '', 
      error: ''
    });
  }

  render(){
    return (
      <div>
        <button className="button"  onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
        <Modal 
          isOpen={this.state.isOpen} 
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Add link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input 
              type="text" placeholder="URL" 
              value={this.state.url} ref="url"
              onChange={this.onChange.bind(this)}/>
            <button className="button">Add Link</button>
            <button className="button button--secondary" type="button" 
              onClick={this.handleModalClose.bind(this)}>Abbrechen</button>
          </form>
        </Modal>
      </div>
    );
  }
}