import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

import './EmailChips.scss';

class EmailChips extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  state = {
    value: '',
    emails: [],
    error: null
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
      error: null
    });
  };

  handleKeyDown = (e) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();

      let email = this.state.value.trim();

      if (email && this.isValid(email)) {
        this.setState({
          emails: [...this.state.emails, email],
          value: ''
        });
      }
    }
  };

  handleClick = () => {

  };

  handleDelete = (deleteEmail) => {
    this.setState({
      emails: this.state.emails.filter(email => email !== deleteEmail)
    });
  };

  isValid(email) {
    let error = null;

    if (!this.isEmail(email)) {
      error = `${email} is not a valid email adress.`;
    }

    if (error) {
      this.setState({ error });
      return false;
    }

    return true;
  };

  isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  };

  render() {
    return (
      <div className="row">

        <Card className="bg-dark text-white col-xl-12 p-4">

          <h1 className="mb-5">Invite Members</h1>
          {this.state.emails.map(email => (
              <Chip
                className="mb-3 mr-1 mb-1"
                color="primary"
                label={email}
                onClick={this.handleClick}
                onDelete={() => this.handleDelete(email)}
              />
            )
          )}

          <div>
            <TextField
              fullWidth
              className="text-white mb-5"
              id="filled"
              variant="filled"
              label="Type or paste email addresses and press `Enter`"
              value={this.state.value}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              helperText=<span className="error">{this.state.error}</span>
            />

          </div>

          <div className="d-flex justify-content-end">
            <Button
              variant="contained"
              color="default"
            >
              Cancel
            </Button>
            <Button
              className="ml-2"
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </div>

        </Card>
      </div>
    );
  }
}

export default EmailChips;
