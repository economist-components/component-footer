import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { routerShape } from 'react-router';

export default class NewsletterSubscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    // const {
    //   router,
    //   path,
    // } = this.props;
    // router.push({
    //   pathname: '/register',
    //   query: {
    //     destination: path,
    //   },
    //   state: {
    //     email: this.state.email,
    //     isNewsLetterChecked: true,
    //   },
    // });
  }
  handleEmailChange(event) {
    if (event) {
      this.setState({ email: event.target.value });
    }
  }
  render() {
    return (
      <div className="signup-footer">
        <div className="signup-footer__header">
          <p className="signup-footer__header-title">
            Sign up to get more from
            <i> The Economist</i>
          </p>
          <p className="signup-footer__header-subtitle">
            Sign up to get 3 free articles per week, daily
            newsletters and more.
          </p>
        </div>
        <div className="signup-footer__body">
          <span>
            <form>
              <input
                id="emailInput"
                name="emailInput"
                type="email"
                autoFocus
                required
                aria-required="true"
                aria-labelledby="emailInput"
                className="signup-footer-input"
                placeholder="Enter your e-mail address"
              />
              <button className="signup-footer__signup-button" >Sign up</button>
            </form>
          </span>
        </div>
    </div>
    );
  }
}
