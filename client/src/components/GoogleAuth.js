import React from 'react'
import { GOOGLE_OAUTH_KEY } from './apis/key'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {
  // initiate google oauth login, getting user email
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: GOOGLE_OAUTH_KEY,
          scope: 'email'
        })
        .then(() => {
          // after auth instance init, get reference to obj
          // adding this, makes sure it's apart of our class
          this.auth = window.gapi.auth2.getAuthInstance()
          //figure if user signed in, assign to state, to re-render
          this.onAuthChange(this.auth.isSignedIn.get())
          this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId())
    } else {
      this.props.signOut()
    }
  }

  onSignInClick = () => {
    this.auth.signIn()
  }

  onSignOutClick = () => {
    this.auth.signOut()
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon"></i>Sign Out
        </button>
      )
    } else {
      return (
        <button className=" ui red google button" onClick={this.onSignInClick}>
          <i className="google icon"></i>
          Sign In with Google
        </button>
      )
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)
