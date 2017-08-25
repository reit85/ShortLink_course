import React from 'react';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';
import moment from 'moment/min/moment-with-locales';
import PropTypes from 'prop-types';

export default class LinksListItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      justCopied: false
    };
  }

  componentDidMount(){
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success', () => {
      this.setState({justCopied: true});
      setTimeout(() => 
        this.setState({justCopied: false}), 1000);
    }).on('error', () => {
      alert('unable to copy Link to clipboard!');
    })
  }

  componentWillUnmount(){
    this.clipboard.destroy();
  }

  renderStats(){
    visitMessage = this.props.visitedCount === 1 ? 'Besuch' : 'Besuche';
    visitedMessage = null;
    if(typeof this.props.lastVisitedAt === 'number'){
      var m = moment(this.props.lastVisitedAt).locale('de');

      visitedMessage = `(Letzter Besuch ${m.fromNow()})`;
    }

    return <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
  }

  render() {
    return(
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <a className="button button--link button--pill" href={this.props.shortUrl} target="_blank">Visit</a>
        <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied ? 'Done' : 'Copy'}
        </button>
        <button className="button button--pill" onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible)}}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
};

LinksListItem.propTypes = {
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  shortUrl: React.PropTypes.string.isRequired,
  visitedCount: React.PropTypes.number.isRequired,
  lastVisitedAt: React.PropTypes.number
};