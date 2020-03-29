import React from 'react'
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues)
  }

  render() {

    if (!this.props.stream) {
      return <div>Loading...</div>
    } else {
      // destructure our initial values to make code more concise
      const { title, description } = this.props.stream

      return (
        <div>
          <h3>Edit a Stream</h3>
          <StreamForm
            initialValues={{ title: title, description: description }}
            onSubmit={this.onSubmit}>
          </StreamForm>
        </div>
      )

    }

  }
}

const mapStateToProps = (state, ownProps) => {
  // get the stream from redux state that user
  // is trying to edit

  return { stream: state.streams[ownProps.match.params.id] }
}
export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit)
