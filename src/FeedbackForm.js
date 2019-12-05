import React, { Component } from "react";
import * as emailjs from "emailjs-com";

const LOADING = "LOADING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";

export default class FeedbackForm extends Component {
  state = {
    feedback: "",
    formState: false
  };

  handleChange = event => {
    this.setState({
      feedback: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { feedback } = this.state;
    const {
      REACT_APP_EMAILJS_USER_ID: userId,
      REACT_APP_SERVICE_ID: serviceId,
      REACT_APP_TEMPLATE_ID: templateId
    } = process.env;

    try {
      this.setState({ formState: LOADING });
      await emailjs.send(serviceId, templateId, { feedback }, userId);
    } catch (e) {
      this.setState({ formState: ERROR });
    } finally {
      this.setState({ formState: SUCCESS });
    }
  };

  render() {
    const { formState, feedback } = this.state;
    if (formState === SUCCESS) {
      return <h1>Success!</h1>;
    }
    if (formState === ERROR) {
      return <h1>*HUGE ERROR MESSAGE WAS NOT SENT*</h1>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Your Feedback</h1>
        <textarea
          style={{ width: "30vw", height: "10vw", fontSize: 20 }}
          name="feedback-entry"
          onChange={this.handleChange}
          placeholder="Enter your feedback here"
          required
          value={feedback}
        />
        <div>
          <input
            type="submit"
            value="Submit"
            disabled={formState === LOADING}
          />
        </div>
      </form>
    );
  }
}
