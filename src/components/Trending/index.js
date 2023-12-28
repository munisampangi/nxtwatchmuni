import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'

import {GoPrimitiveDot} from 'react-icons/go'
import {HiFire} from 'react-icons/hi'

import Header from '../Header'
import Sidebar from '../Sidebar'
import Failure from '../Failure'

import WatchContext from '../../Context/WatchContext'

import {
  NavigationAndTrendingBar,
  LoaderOrFailure,
  TrendingComponent,
  TrendingTopHead,
  TrendingLogo,
  TrendingVideoAndDetails,
  TrendingsContainer,
  EachVideoThumbnailImage,
  LinkContainer,
  ChannelLogoVideoTitleInformationContainer,
  ChannelLogoImage,
  VideoTitleInformationContainer,
  VideoTitle,
  VideoInformation,
  Title,
  ChannesViewsAndUpdatedTime,
  PrimitiveDotChangingScreens,
  PrimitiveDot,
  ChannelViewAndUpdatedTimeContainer,
} from './styledComponents'

const dataFetchStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Trending extends Component {
  state = {
    listOfVideosDetails: [],
    dataFetchStatus: dataFetchStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getListOfVideosData()
  }

  getListOfVideosData = async () => {
    this.setState({dataFetchStatus: dataFetchStatusConstants.loading})
    const response = await fetch('https://apis.ccbp.in/videos/trending', {
      method: 'GET',
      headers: {authorization: `Bearer ${Cookies.get('jwt_token')}`},
    })
    if (response.ok) {
      const data = await response.json()

      this.setState({dataFetchStatus: dataFetchStatusConstants.success})
      this.setState({listOfVideosDetails: data.videos})
    }
    if (!response.ok) {
      this.setState({dataFetchStatus: dataFetchStatusConstants.failure})
    }
  }

  renderRoutePartOnDataResponse = lightTheme => {
    const {dataFetchStatus, listOfVideosDetails} = this.state

    switch (dataFetchStatus) {
      case dataFetchStatusConstants.loading:
        return (
          <LoaderOrFailure data-testid="loader" value={lightTheme}>
            <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
          </LoaderOrFailure>
        )
      case dataFetchStatusConstants.failure:
        return (
          <LoaderOrFailure value={lightTheme}>
            <Failure retryFunction={this.getListOfVideosData} />
          </LoaderOrFailure>
        )
      case dataFetchStatusConstants.success:
        return (
          <div>
            <TrendingTopHead theme={lightTheme}>
              <TrendingLogo as={HiFire} />
              <h1>Trending</h1>
            </TrendingTopHead>

            <TrendingsContainer theme={lightTheme} data-testid="trending">
              {listOfVideosDetails.map(each => {
                const {channel} = each

                return (
                  <TrendingVideoAndDetails key={each.id}>
                    <LinkContainer as={Link} to={`/videos/${each.id}`}>
                      <EachVideoThumbnailImage
                        src={each.thumbnail_url}
                        alt="video thumbnail"
                      />
                      <ChannelLogoVideoTitleInformationContainer>
                        <ChannelLogoImage
                          src={channel.profile_image_url}
                          alt="channel logo"
                        />
                        <VideoTitleInformationContainer>
                          <VideoTitle value={lightTheme}>
                            {each.title}
                          </VideoTitle>
                          <VideoInformation>
                            <Title>{channel.name}</Title>
                            <ChannelViewAndUpdatedTimeContainer>
                              <PrimitiveDotChangingScreens
                                as={GoPrimitiveDot}
                              />
                              <ChannesViewsAndUpdatedTime>
                                {each.view_count} views
                              </ChannesViewsAndUpdatedTime>
                              <PrimitiveDot as={GoPrimitiveDot} />
                              <ChannesViewsAndUpdatedTime>
                                {formatDistanceToNow(
                                  new Date(each.published_at),
                                  // {
                                  //   addSuffix: true,
                                  // },
                                )
                                  .split(' ')
                                  .reverse()
                                  .slice(0, 3)
                                  .reverse()
                                  .join(' ')}
                              </ChannesViewsAndUpdatedTime>
                            </ChannelViewAndUpdatedTimeContainer>
                          </VideoInformation>
                        </VideoTitleInformationContainer>
                      </ChannelLogoVideoTitleInformationContainer>
                    </LinkContainer>
                  </TrendingVideoAndDetails>
                )
              })}
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
        <NavigationAndTrendingBar>
          <Sidebar />
          <WatchContext.Consumer>
            {value => {
              const {lightTheme} = value

              return (
                <TrendingComponent>
                  {this.renderRoutePartOnDataResponse(lightTheme)}
                </TrendingComponent>
              )
            }}
          </WatchContext.Consumer>
        </NavigationAndTrendingBar>
      </div>
    )
  }
}

export default Trending
