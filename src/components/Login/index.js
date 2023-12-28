import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import WatchContext from '../../Context/WatchContext'

import {
  Page,
  Card,
  Image,
  Label,
  Input,
  ShowPassword,
  Button,
} from './styledComponents'

class Login extends Component {
  state = {
    showPasswordStatus: false,
    usernameInput: '',
    passwordInput: '',
    showErrorMessage: false,
    errorMessage: '',
  }

  changeShowPasswordStatus = () => {
    this.setState(prevState => ({
      showPasswordStatus: !prevState.showPasswordStatus,
    }))
  }

  takingUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  takingPasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  loginCredentialsSubmission = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 2})
      const {history} = this.props
      history.replace('/')
    }
    if (!response.ok) {
      this.setState({showErrorMessage: true, errorMessage: data.error_msg})
    }
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <WatchContext.Consumer>
        {value => {
          const {lightTheme, changedAttributesOnThemeChange} = value

          const {showPasswordStatus, showErrorMessage, errorMessage} =
            this.state

          const passwordInputType = showPasswordStatus ? 'text' : 'password'

          const {watchLogoImage, watchLogoImageAlt} =
            changedAttributesOnThemeChange()

          return (
            <Page value={lightTheme}>
              <Card onSubmit={this.loginCredentialsSubmission}>
                <Image src={watchLogoImage} alt={watchLogoImageAlt} />

                <Label value={lightTheme} htmlFor="usernameInputField">
                  USERNAME
                </Label>

                <Input
                  type="text"
                  id="usernameInputField"
                  placeholder="Username"
                  onChange={this.takingUsernameInput}
                />

                <Label value={lightTheme} htmlFor="passwordInputField">
                  PASSWORD
                </Label>

                <Input
                  type={passwordInputType}
                  id="passwordInputField"
                  placeholder="Password"
                  onChange={this.takingPasswordInput}
                />

                <div>
                  <input
                    id="showPasswordInputField"
                    type="checkbox"
                    onChange={this.changeShowPasswordStatus}
                  />
                  <ShowPassword
                    value={lightTheme}
                    htmlFor="showPasswordInputField"
                  >
                    Show Password
                  </ShowPassword>
                </div>
                <Button type="submit">Login</Button>
                {showErrorMessage && <p>*{errorMessage}</p>}
              </Card>
            </Page>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default Login
