import React from 'react'
import { GOOGLE_OAUTH_KEY } from './apis/key'

class GoogleAuth extends React.Component {
  // initiate google oauth login, getting user email
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clienId: GOOGLE_OAUTH_KEY,
        scope: 'email'
      })
    })
  }
  render() {
    return <div>GoogleAuth</div>
  }
}

export default GoogleAuth
