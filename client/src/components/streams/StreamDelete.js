import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends React.Component {


  componentDidMount() {
    // id comes from our component url, we set this by routes in app
    this.props.fetchStream(this.props.match.params.id)
  }

  //var that holds some JSX we will use to pass buttons as props
  // Fragment fixes styling issues that we would have between our
  // buttons, fragment is like an invisible element

  renderActionsJsx() {
    const { id } = this.props.match.params
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </React.Fragment>
    )
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?'
    }
    return `Are you sure you want to delete the stream with the title: ${this.props.stream.title}`
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActionsJsx()}
        onDismiss={() => history.push('/')}
      />

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)
