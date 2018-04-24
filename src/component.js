import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'proptypes';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import * as actions from './actions.js';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Component extends React.Component {
  static propTypes = {
    content: PropTypes.oneOf([PropTypes.shape({
      title: PropTypes.string.isRequired,
      message: PropTypes.string,
      rejectText: PropTypes.string,
      submitText: PropTypes.string,
      link: PropTypes.string,
      form: PropTypes.arrayOf(PropTypes.shape({
        field: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['text-field', 'check-box', 'select-field']).isRequired,
        label: PropTypes.string.isRequired,
        fields: PropTypes.arrayOf(PropTypes.shape({
          field: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired
        }))
      }))
    }), null]).isRequired,
    submit: PropTypes.func.isRequired,
    reject: PropTypes.func.isRequired
  };

  state = {
    formValues: {}
  };

  onReject = () => {
    const { reject } = this.props;
    reject();
  };

  onSubmit = () => {
    const { submit, content: { link } } = this.props;
    const { formValues } = this.state;
    if (link) window.open(link, '_blank');
    submit(formValues);
  };

  componentWillReceiveProps = (props) => {
    const formValues = (props.content && props.content.form) ? props.content.form
      .reduce((data, { type, fields, field }) => {
        let value;
        switch (type) {
          case 'text-field':
            value = '';
            break;

          case 'check-box':
            value = false;
            break;

          case 'select-field':
            value = fields[0].field;
            break;

          default:
            value = '';
            break;
        }

        data[field] = value;
        return data;
      }, {}) : {};
    this.setState({ formValues });
  };

  changeForm = (field, value) => {
    const { formValues } = this.state;

    this.setState({
      formValues: {
        ...formValues,
        [field]: value
      }
    });
  };

  render() {
    const { content } = this.props;
    const { formValues } = this.state;

    if (!content) return null;

    const {
      title,
      message,
      rejectText = 'cancel',
      submitText = 'confirm',
      form = {}
    } = content;

    return (
      <Dialog
        open={true}
        title={title}
        onRequestClose={this.onReject}
        autoScrollBodyContent
        actions={[
          <FlatButton onTouchTap={this.onReject} label={rejectText} />,
          <RaisedButton onTouchTap={this.onSubmit} label={submitText} primary />
        ]}
      >
        <p>{message}</p>
        <form onSubmit={this.onSubmit}>
          {form.map(({ field, type, label, fields }) => {
            const value = formValues[field];

            switch (type) {
              case 'text-field':
                return (<TextField
                  key={field}
                  fullWidth
                  floatingLabelText={label}
                  value={value}
                  onChange={(event, value) => this.changeForm(field, value)}
                />);

              case 'check-box':
                return (<Checkbox
                  key={field}
                  label={label}
                  checked={value}
                  onCheck={(event, value) => this.changeForm(field, value)}
                />);

              case 'select-field':
                return (<SelectField
                  key={field}
                  floatingLabelText={label}
                  fullWidth
                  value={value}
                  onChange={(event, index, value) => this.changeForm(field, value)}
                >
                  {fields.map(({ field, label }) => (<MenuItem
                    value={field}
                    primaryText={label}
                  />))}
                </SelectField>);

              default:
                return null;
            }
          })}
        </form>
      </Dialog>
    );
  }
}

export default connect(state => ({
  content: state.prompt
}), {
  reject: actions.reject,
  submit: actions.submit
})(Component);
