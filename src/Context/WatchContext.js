import React from 'react'

const WatchContext = React.createContext({
  lightTheme: true,
  changeThemeAndAttributes: () => {},
  changedAttributesOnThemeChange: () => {},
  likedList: [],
  dislikedList: [],
  savedList: [],
  addAsLikedVideos: () => {},
  addAsDislikedVideos: () => {},
  addOrRemoveAsOrFromSavedVideos: () => {},
})

export default WatchContext
