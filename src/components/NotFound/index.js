import Header from '../Header'
import Sidebar from '../Sidebar'
import WatchContext from '../../Context/WatchContext'

import {
  NavigationSideBar,
  LoaderOrFailure,
  FailureView,
  NotFoundContainer,
} from './styledComponents'

const NotFound = () => (
  <div>
    <Header />
    <NavigationSideBar>
      <Sidebar />
      <WatchContext.Consumer>
        {value => {
          const {lightTheme, changedAttributesOnThemeChange} = value
          const {notFoundImage, notFoundImageAlt} =
            changedAttributesOnThemeChange()

          return (
            <LoaderOrFailure value={lightTheme}>
              <FailureView
                src={notFoundImage}
                alt={notFoundImageAlt}
                value={lightTheme}
              />
              <NotFoundContainer value={lightTheme}>
                Page Not Found
              </NotFoundContainer>
              <NotFoundContainer value={lightTheme} as="p">
                we are sorry, the page you requested could not be found.
              </NotFoundContainer>
            </LoaderOrFailure>
          )
        }}
      </WatchContext.Consumer>
    </NavigationSideBar>
  </div>
)

export default NotFound
