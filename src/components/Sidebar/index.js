import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import WatchContext from '../../Context/WatchContext'

import {
  NavigationMenuContainer,
  NavigationItemsContainer,
  EachNavigation,
  NavigationRoute,
  NavigationContactContainer,
  NavigationImages,
  NavigationContainerFootLine,
  Icon,
} from './styledComponents'

const Sidebar = props => {
  const {match} = props

  return (
    <WatchContext.Consumer>
      {value => {
        const {lightTheme} = value

        return (
          <NavigationMenuContainer value={lightTheme}>
            <NavigationItemsContainer>
              <li>
                <EachNavigation
                  as={Link}
                  to="/"
                  selection={match.path === '/'}
                  theme={lightTheme}
                >
                  <Icon as={AiFillHome} selection={match.path === '/'} />
                  <NavigationRoute>Home</NavigationRoute>
                </EachNavigation>
              </li>
              <li>
                <EachNavigation
                  as={Link}
                  to="/trending"
                  selection={match.path === '/trending'}
                  theme={lightTheme}
                >
                  <Icon as={HiFire} selection={match.path === '/trending'} />
                  <NavigationRoute>Trending</NavigationRoute>
                </EachNavigation>
              </li>
              <li>
                <EachNavigation
                  as={Link}
                  to="/gaming"
                  selection={match.path === '/gaming'}
                  theme={lightTheme}
                >
                  <Icon
                    as={SiYoutubegaming}
                    selection={match.path === '/gaming'}
                  />
                  <NavigationRoute>Gaming</NavigationRoute>
                </EachNavigation>
              </li>
              <li>
                <EachNavigation
                  as={Link}
                  to="/saved-videos"
                  selection={match.path === '/saved-videos'}
                  theme={lightTheme}
                >
                  <Icon
                    as={MdPlaylistAdd}
                    selection={match.path === '/saved-videos'}
                  />
                  <NavigationRoute>Saved videos</NavigationRoute>
                </EachNavigation>
              </li>
            </NavigationItemsContainer>

            <NavigationContactContainer value={lightTheme}>
              <p>CONTACT US</p>
              <div>
                <NavigationImages
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt=" facebook logo"
                />
                <NavigationImages
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                  alt="twitter logo"
                />
                <NavigationImages
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt=" linked in logo"
                />
              </div>
              <NavigationContainerFootLine>
                Enjoy! Now to see your channels and recommendations!
              </NavigationContainerFootLine>
            </NavigationContactContainer>
          </NavigationMenuContainer>
        )
      }}
    </WatchContext.Consumer>
  )
}

export default withRouter(Sidebar)
