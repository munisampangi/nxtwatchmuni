import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Failure from '../Failure'

import {
  NavigationSidebar,
  LoaderOrFailure,
  HomeComponent,
  TrendingLogo,
  TrendingTopHead,
  TrendingsContainer,
  TrendingVideoAndDetails,
  LinkContainer,
  EachVideoThumbnailImage,
  Title,
  GameDetails,
} from './styledComponents'
import WatchContext from '../../Context/WatchContext'

const statusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Gaming extends Component {
  state = {
    listOfGamesDetails: [],
    dataFetchStatus: statusConstants.initial,
  }

  componentDidMount = () => {
    this.getListOfGamesData()
  }

  getListOfGamesData = async () => {
    this.setState({dataFetchStatus: statusConstants.loading})
    const response = await fetch('https://apis.ccbp.in/videos/gaming', {
      method: 'GET',
      headers: {authorization: `Bearer ${Cookies.get('jwt_token')}`},
    })
    if (response.ok) {
      const data = await response.json()

      this.setState({dataFetchStatus: statusConstants.success})
      this.setState({listOfGamesDetails: data.videos})
    }
    if (!response.ok) {
      this.setState({dataFetchStatus: statusConstants.failure})
    }
  }

  renderRoutePartOnDataResponse = lightTheme => {
    const {dataFetchStatus, listOfGamesDetails} = this.state

    switch (dataFetchStatus) {
      case statusConstants.loading:
        return (
          <LoaderOrFailure data-testid="loader" value={lightTheme}>
            <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
          </LoaderOrFailure>
        )
      case statusConstants.failure:
        return (
          <LoaderOrFailure value={lightTheme}>
            <Failure retryFunction={this.getListOfGamesData} />
          </LoaderOrFailure>
        )
      case statusConstants.success:
        return (
          <div>
            <TrendingTopHead theme={lightTheme}>
              <TrendingLogo as={SiYoutubegaming} />
              <h1>Gaming</h1>
            </TrendingTopHead>

            <TrendingsContainer data-testid="gaming" theme={lightTheme}>
              {listOfGamesDetails.map(each => (
                <TrendingVideoAndDetails key={each.id}>
                  <LinkContainer as={Link} to={`/videos/${each.id}`}>
                    <EachVideoThumbnailImage
                      src={each.thumbnail_url}
                      alt="video thumbnail"
                    />
                    <Title value={lightTheme}>{each.title}</Title>
                    <GameDetails>{each.view_count} Watching</GameDetails>
                    <GameDetails>Worldwide</GameDetails>
                  </LinkContainer>
                </TrendingVideoAndDetails>
              ))}
            </TrendingsContainer>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <NavigationSidebar>
          <Sidebar />
          <WatchContext.Consumer>
            {value => {
              const {lightTheme} = value
              return (
                <HomeComponent>
                  {this.renderRoutePartOnDataResponse(lightTheme)}
                </HomeComponent>
              )
            }}
          </WatchContext.Consumer>
        </NavigationSidebar>
      </div>
    )
  }
}
export default Gaming
