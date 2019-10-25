import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./SignUp.css";
import {
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from './actions/authActions';
import { clearErrors } from './actions/errorActions';

const Button = props => (
  <button className="c-button" onClick={props.onClick}>
    {props.text}
  </button>
);

const Input = props => (
  <input
    className="c-input"
    type={props.type}
    placeholder={props.placeholder}
    onKeyUp={props.onKeyUp}
  />
);

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
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

    const { name, email, password } = this.state;

    // Create user object
    const newUser = {
      name,
      email,
      password
    };

    // Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <section id="signup">
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
                      <h2>Sign up</h2>
                      <p>
                        Maybe insert a sentence or two here about being a good
                        person on this platform
                      </p>
                    </div>
                    
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <div className="card-body">
                      <form className="form">
            {/* <Form onSubmit={this.onSubmit}>
              <FormGroup> */}
                {/* <Label for='name'>Name</Label> */}
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Full Name'
                  className="form-control"
                  onChange={this.onChange}
                />

                {/* <Label for='email'>Email</Label> */}
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
                  placeholder='Create Password'
                  className="form-control"
                  onChange={this.onChange}
                />
              {/* </FormGroup>
            </Form> */}
            <div class="signupbutton">
                          {/* SIGN UP BUTTON */}
                          <Button text="Join Now" onClick={this.handleSubmit} />
                        </div>
                        
                      </form>
                      <div class="switchpage">
                          <Link to="/login" className="navbar__link">
                            Already a user? Click here to login
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
  { register, clearErrors }
)(RegisterModal);
