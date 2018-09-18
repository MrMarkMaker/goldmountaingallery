import React, { Component } from "react";

const formErrors = ({ formErrors }) => (
  <div>
    {Object.keys(formErrors).map((fieldName, index) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={index}>
            {fieldName} {formErrors[fieldName]}
          </p>
        );
      } else {
        return "";
      }
    })}
  </div>
);

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lambdaLoading: false,
      sendAttempted: false,
      sendSuccessful: null,
      name: "",
      nameValid: false,
      email: "",
      emailValid: false,
      subject: "",
      subjectValid: false,
      message: "",
      messageValid: false,
      formValid: false,
      formErrors: {
        name: "",
        email: "",
        subject: "",
        message: ""
      }
    };
  }

  hasErrorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.nameValid &&
        this.state.emailValid &&
        this.state.subjectValid &&
        this.state.messageValid
    });
  }

  validateField(fieldName, value) {
    let formValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let subjectValid = this.state.subjectValid;
    let messageValid = this.state.messageValid;

    if (fieldName === "email") {
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      formValidationErrors.email = emailValid
        ? ""
        : "is not in the proper format";
      emailValid = emailValid ? true : false;
    } else {
      let message = "";
      let isValid = false;
      if (value.length === 0) {
        isValid = false;
        message = "may not be blank";
      } else {
        isValid = true;
      }

      if (fieldName === "name") {
        formValidationErrors.name = message;
        nameValid = isValid;
      }

      if (fieldName === "subject") {
        formValidationErrors.subject = message;
        subjectValid = isValid;
      }

      if (fieldName === "message") {
        formValidationErrors.message = message;
        messageValid = isValid;
      }
    }

    this.setState(
      {
        formErrors: formValidationErrors,
        nameValid: nameValid,
        emailValid: emailValid,
        subjectValid: subjectValid,
        messageValid: messageValid
      },
      this.validateForm
    );
  }

  handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    var bodymessage =
      this.state.name +
      " is sending you the following message: \r\n\r\n" +
      this.state.message +
      "\r\n\r\n To respond, please send an email to: " +
      this.state.email;

    var data = {
      subject: this.state.subject,
      message: bodymessage,
      replyto: this.state.email
    };

    this.setState({ sendAttempted: true, lambdaLoading: true });
    fetch("/.netlify/functions/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        console.log("Response received");
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ sendSuccessful: true, lambdaLoading: false });
      })
      .catch(function(error) {
        this.setState({ sendSuccessful: false, lambdaLoading: false });
        console.log(JSON.stringify(error));
      });
  };

  render() {
    const { sendAttempted, sendSuccessful, lambdaLoading } = this.state;
    return (
      <div className="container">
        <h1 className="text-center">Get In Touch</h1>
        <div className="row">
          <div className="col-md-3">
            <h3>Call</h3>
            <div className="gmg-phone">
              <a href="tel:9145848333">
                <strong>Mark Goldberg:</strong> 914 584 8333
              </a>
            </div>

            <h3>Visit</h3>
            <p>135 W. Colorado Avenue</p>
            <p>Telluride, CO 81435</p>

            <h3>Ship</h3>
            <p>PO Box 4013</p>
            <p>Telluride, CO 81435</p>
          </div>
          <div className="col-md-9">
            <h3>Email</h3>

            <div>
              {sendAttempted ? (
                <div>
                  {lambdaLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <div>
                      {sendSuccessful ? (
                        <div>
                          <h3>Thank you</h3>
                          <p>
                            Your message has been sent and will be arriving in
                            our inbox shortly. Thanks again for contacting us.
                            We will reach out to you as soon as possible.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h3>Whoops...</h3>
                          <p>
                            It appears that something went wrong and your
                            message has not been sent. We're sorry for the
                            inconvenience. In the meantime, you can send an
                            email to mark @ goldmountaingallery.com.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>Yet to send.</div>
              )}
            </div>

            <form onSubmit={this.handleSubmit} className="form">
              <div
                className={`form-group ${this.hasErrorClass(
                  this.state.formErrors.name
                )}`}
              >
                <label htmlFor="guest-name">Your Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={this.state.name}
                  id="guest-name"
                  onChange={this.handleInput}
                />
              </div>
              <div
                className={`form-group ${this.hasErrorClass(
                  this.state.formErrors.email
                )}`}
              >
                <label htmlFor="guest-email">Your Email Address</label>
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  name="email"
                  id="guest-email"
                  onChange={this.handleInput}
                />
              </div>

              <div
                className={`form-group ${this.hasErrorClass(
                  this.state.formErrors.subject
                )}`}
              >
                <label htmlFor="guest-subject">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.subject}
                  name="subject"
                  id="guest-subject"
                  onChange={this.handleInput}
                />
              </div>

              <div
                className={`form-group ${this.hasErrorClass(
                  this.state.formErrors.message
                )}`}
              >
                <label htmlFor="guest-message">Message</label>
                <textarea
                  className="form-control"
                  name="message"
                  value={this.state.message}
                  id="guest-message"
                  onChange={this.handleInput}
                />
              </div>
              <button
                className="btn btn-default"
                type="submit"
                disabled={!this.state.formValid}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
