import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createStream } from '../../actions'

class StreamCreate extends React.Component {
  renderError(error, touched) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }
  renderInput = (formProps) => {
    // use destructuring rather than just grabbing value and onChange, because we // need access to other values from redux form eventually

    //assigns semantic ui error class when focused on and it is blank
    const className = `field ${
      formProps.meta.error && formProps.meta.touched ? 'error' : ''
    }`

    return (
      <div className={className}>
        <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off" />
        {this.renderError(formProps.meta.error, formProps.meta.touched)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    // redux form automatically calls prevent default
    this.props.createStream(formValues)
  }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className=" ui button primary">Submit</button>
      </form>
    )
  }
}

// redux validation best practice, declare func outside component state
const validate = (formValues) => {
  const errors = {}
  if (!formValues.title) {
    // run if user not enter title
    errors.title = 'You must enter a title'
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description'
  }
  return errors
}

const formWrapped = reduxForm({
  form: 'streamCreate',
  validate: validate
})(StreamCreate)

export default connect(null, { createStream })(formWrapped)
