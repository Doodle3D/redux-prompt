import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../src/index.js';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'proptypes';

class App extends React.Component {
  static propTypes = {
    onOpen: PropTypes.func.isRequired
  };

  render() {
    const { onOpen } = this.props;

    return <RaisedButton onTouchTap={onOpen} label="Open" primary />;
  }
}

export default connect(null, dispatch => ({
  onOpen() {
    dispatch(actions.open({
      title: 'Form',
      message: 'Please fill in the form below',
      form: [
        { field: 'name', type: 'text-field', label: 'Name' },
        { field: 'sirName', type: 'text-field', label: 'Sir Name' },
        { field: 'gender', type: 'select-field', label: 'Gender', fields: [
          { field: 'male', label: 'Male' },
          { field: 'female', label: 'Female' }
        ]},
        { field: 'termsOfService', type: 'check-box', label: 'Accept terms of service' }
      ]
    })).then(data => {
      alert(`user entered: ${JSON.stringify(data)}`);
    })
  }
}))(App);
