import React, { Component } from 'react';
import "./LogIn.css";
import { Link } from "react-router-dom";
import {
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from './actions/authActions';
import { clearErrors } from './actions/errorActions';

const Input = props => (
  <input
    className="c-input"
    type={props.type}
    placeholder={props.placeholder}
    onKeyUp={props.onKeyUp}
  />
);

const Button = props => (
  <button className="c-button" onClick={props.onClick}>
    {props.text}
  </button>
);

class LoginModal extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <div>
        <section id="login">
          <div className="container ">
            <div className="row">
              <div className="col-md-10 mx-auto">
                <div className="card">
                  <div className="row mr-0 ml-0 d-flex h-100">
                    <img
                      src="https://res.cloudinary.com/erica-naglik/image/upload/v1564606802/skyline_vqpy6p.png"
                      className="img-fluid"
                      width="860px"
                    />

                    <div className="col-md-6 form">
                      <div className="card-title">
                        <img
                          src="https://res.cloudinary.com/erica-naglik/image/upload/v1564602895/Screen_Shot_2019-06-07_at_7.46.14_PM_cbfogy.png"
                          className="img-ms logo"
                        />
                        <h2>Log In</h2>
                        <p>
                          Welcome Back! Hope you're having a great day at Make
                          School!
                        </p>
                      </div>
                      <div className="card-body">
                        <form className="form">
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            {/* <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='email'>Email</Label> */}
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Make School Email'
                  className="form-control"
                  onChange={this.onChange}
                />

                {/* <Label for='password'>Password</Label> */}
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className="form-control"
                  onChange={this.onChange}
                />
              {/* </FormGroup>
            </Form> */}
            <div class="loginbutton">
                            <Button text="Log In" onClick={this.handleSubmit} />
                          </div>
                        </form>
                        <div class="switchpage">
                            <Link to="/signup" className="navbar__link">
                              Need to sign up? Click here
                            </Link>
                            </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* End of card */}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginModal);
