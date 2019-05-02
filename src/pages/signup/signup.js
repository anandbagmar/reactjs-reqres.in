import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import { connect } from "react-redux";
import PublicHead from "../../components/publicHead";
import DefaultLayout from "../../layouts/defaultLayout";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repassword : "",
      submitted: false,
    };
    if(localStorage.getItem("authToken")){
          this.props.history.push('/')
    }
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password,repassword } = this.state;
    // stop here if form is invalid
    if (!(email && password) || password!==repassword) {
      return;
    }
    // call saga reducer
    this.props.attempt(email,password)
  };
  render() {
    const { loading } = this.props;
    const { email, password,repassword, submitted  } = this.state;
    const title = "Signup";
    return (
      <DefaultLayout title={title}>
        <PublicHead title={title} />
        <div className="form-box">
          <form name="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className={'form-input' + (submitted && !email ? ' error' : '')}
                value={email}
                onChange={this.handleChange}
              />
              {submitted && !email && (
                <div className="error-block email">Email is required.</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className={'form-input' + (submitted && !password ? ' error' : '')}
                value={password}
                onChange={this.handleChange}
              />
              {submitted && !password && (
                <div className="error-block password">Password is required.</div>
              )}
            </div>
              <div className="form-group">
                  <label htmlFor="password">Retype Password</label>
                  <input
                      type="password"
                      name="repassword"
                      className={'form-input' + (submitted && (!repassword || repassword!==password) ? ' error' : '')}
                      value={repassword}
                      onChange={this.handleChange}
                  />
                  {submitted && !repassword && (
                      <div className="error-block repassword">Retype password is required.</div>
                  )}
                  {submitted && repassword!==password && (
                      <div className="error-block repassword">Passwords don't match</div>
                  )}
              </div>
            <div className="form-group">
              <button className="form-btn" disabled={loading}>
                  {loading ? <><i className="fas fa-spinner  fa-spin"/> loading ...</> : "Signup"}
              </button>
            </div>
              <span>Already have an account? <NavLink exact to='/login'> Log in</NavLink> </span>
          </form>
        </div>
      </DefaultLayout>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.signup.loading,
});
const mapDispatchToProps = dispatch => {
  const { attempt  } = actions;
  return bindActionCreators({ attempt }, dispatch);
};
Signup.propTypes = {
    loading : PropTypes.bool,
    attempt: PropTypes.func,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
