import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoDetails from './components/VideoDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import WatchContext from './Context/WatchContext'

import './App.css'

class App extends Component {
  state = {lightTheme: true, likedList: [], dislikedList: [], savedList: []}

  changeTheme = () => {
    this.setState(prevState => ({lightTheme: !prevState.lightTheme}))
  }

  changedAttributesOnThemeChange = () => {
    const {lightTheme} = this.state

    let watchLogoImage
    let failureViewImage
    let notFoundImage

    if (lightTheme) {
      watchLogoImage =
        'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      failureViewImage =
        'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      notFoundImage =
        'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
    } else {
      watchLogoImage =
        'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      failureViewImage =
        'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      notFoundImage =
        'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
    }

    const watchLogoImageAlt = 'website logo'
    const failureViewImageAlt = 'failure view'
    const notFoundImageAlt = 'not found'

    return {
      watchLogoImage,
      watchLogoImageAlt,
      failureViewImage,
      failureViewImageAlt,
      notFoundImage,
      notFoundImageAlt,
    }
  }

  addAsLikedVideos = id => {
    const {likedList, dislikedList} = this.state
    if (dislikedList.includes(id)) {
      this.setState({dislikedList: dislikedList.filter(each => each !== id)})
    }
    if (likedList.includes(id)) {
      this.setState({likedList: likedList.filter(each => each !== id)})
    } else {
      this.setState({likedList: [...likedList, id]})
    }
  }

  addAsDislikedVideos = id => {
    const {likedList, dislikedList} = this.state
    if (likedList.includes(id)) {
      this.setState({likedList: likedList.filter(each => each !== id)})
    }
    if (dislikedList.includes(id)) {
      this.setState({dislikedList: dislikedList.filter(each => each !== id)})
    } else {
      this.setState({dislikedList: [...dislikedList, id]})
    }
  }

  addOrRemoveAsOrFromSavedVideos = videoDetails => {
    const {savedList} = this.state
    let savedListIds = []
    if (savedList.length !== 0) {
      savedListIds = savedList.map(each => each.id)
    }
    if (savedListIds.includes(videoDetails.id)) {
      this.setState({
        savedList: savedList.filter(each => each.id !== videoDetails.id),
      })
    } else {
      this.setState({savedList: [...savedList, videoDetails]})
    }
  }

  render() {
    const {lightTheme, likedList, dislikedList, savedList} = this.state

    return (
      <WatchContext.Provider
        value={{
          lightTheme,
          changeTheme: this.changeTheme,
          changedAttributesOnThemeChange: this.changedAttributesOnThemeChange,
          likedList,
          dislikedList,
          savedList,
          addAsLikedVideos: this.addAsLikedVideos,
          addAsDislikedVideos: this.addAsDislikedVideos,
          addOrRemoveAsOrFromSavedVideos: this.addOrRemoveAsOrFromSavedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </WatchContext.Provider>
    )
  }
}

export default App
