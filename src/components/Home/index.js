import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'

import {GrFormClose} from 'react-icons/gr'
import {BsSearch} from 'react-icons/bs'
import {GoPrimitiveDot} from 'react-icons/go'

import Header from '../Header'
import Sidebar from '../Sidebar'

import Failure from '../Failure'

import WatchContext from '../../Context/WatchContext'

import {
  NavigationSidebar,
  HomeComponentContainer,
  BannerContainer,
  BannerContentsContainer,
  BannerNxtWatchLogo,
  BannerText,
  GetItNowBannerButton,
  BannerCloseButton,
  HomeComponent,
  SearchInputField,
  SearchButton,
  SearchFieldContainer,
  LoaderOrFailure,
  NoSearchResultsImage,
  NoSearchResultsText,
  DifferentText,
  RetryButton,
  SearchResultsContainer,
  EachVideoThumbnailContainer,
  EachVideoThumbnailImage,
  LinkContainer,
  ChannelLogoVideoTitleInformationContainer,
  ChannelLogoImage,
  VideoTitleInformationContainer,
  VideoTitle,
  VideoInformation,
  ChannelTitle,
  ChannesViewsAndUpdatedTime,
  PrimitiveDotChangingScreens,
  PrimitiveDot,
  ChannelViewAndUpdatedTimeContainer,
} from './styledComponents'

const fetchStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class HomeRoute extends Component {
  state = {
    showBanner: true,
    searchInput: '',
    listOfVideosDetails: [],
    dataFetchStatus: fetchStatusConstants.initial,
  }

  takingSearchInput = event => {
    this.setState({searchInput: event.target.value})
    console.log(event.target.value)
  }

  componentDidMount = () => {
    this.getListOfVideosData()
  }

  getListOfVideosData = async () => {
    this.setState({dataFetchStatus: fetchStatusConstants.loading})
    const {searchInput} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${searchInput}`,
      {
        method: 'GET',
        headers: {authorization: `Bearer ${Cookies.get('jwt_token')}`},
      },
    )
    if (response.ok) {
      const data = await response.json()

      this.setState({dataFetchStatus: fetchStatusConstants.success})
      this.setState({listOfVideosDetails: data.videos})
    }
    if (!response.ok) {
      this.setState({dataFetchStatus: fetchStatusConstants.failure})
    }
    console.log('fetching data function complete')
  }

  closeBanner = () => {
    this.setState({showBanner: false})
  }

  renderHomePartOnDataResponse = lightTheme => {
    const {dataFetchStatus, listOfVideosDetails} = this.state

    switch (dataFetchStatus) {
      case fetchStatusConstants.loading:
        return (
          <LoaderOrFailure data-testid="loader" value={lightTheme}>
            <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
          </LoaderOrFailure>
        )
      case fetchStatusConstants.failure:
        return (
          <LoaderOrFailure value={lightTheme}>
            <Failure retryFunction={this.getListOfVideosData} />
          </LoaderOrFailure>
        )
      case fetchStatusConstants.success:
        return (
          <>
            {listOfVideosDetails.length === 0 ? (
              <LoaderOrFailure>
                <NoSearchResultsImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                  alt="no videos"
                />
                <NoSearchResultsText value={lightTheme}>
                  No Search Results Found
                </NoSearchResultsText>
                <DifferentText>
                  Try different key words or remove search filter
                </DifferentText>
                <RetryButton type="button" onClick={this.getListOfVideosData}>
                  Retry
                </RetryButton>
              </LoaderOrFailure>
            ) : (
              <SearchResultsContainer>
                {listOfVideosDetails.map(each => {
                  const {channel} = each

                  return (
                    <EachVideoThumbnailContainer key={each.id}>
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
                              <ChannelTitle>{channel.name}</ChannelTitle>
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
                                    {
                                      addSuffix: true,
                                    },
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
                    </EachVideoThumbnailContainer>
                  )
                })}
              </SearchResultsContainer>
            )}
          </>
        )
      default:
        return null
    }
  }

  render() {
    const {showBanner} = this.state

    return (
      <div>
        <Header />
        <NavigationSidebar>
          <Sidebar />
          <WatchContext.Consumer>
            {value => {
              const {lightTheme} = value
              return (
                <HomeComponentContainer>
                  {showBanner && (
                    <BannerContainer data-testid="banner">
                      <BannerContentsContainer>
                        <BannerNxtWatchLogo
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <BannerText>
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </BannerText>
                        <GetItNowBannerButton type="button">
                          GET IT NOW
                        </GetItNowBannerButton>
                      </BannerContentsContainer>
                      <div>
                        <BannerCloseButton
                          type="button"
                          data-testid="close"
                          onClick={this.closeBanner}
                        >
                          <GrFormClose />
                        </BannerCloseButton>
                      </div>
                    </BannerContainer>
                  )}
                  <HomeComponent data-testid="home" value={lightTheme}>
                    <SearchFieldContainer>
                      <SearchInputField
                        type="search"
                        placeholder="Search"
                        onChange={this.takingSearchInput}
                      />
                      <SearchButton
                        type="button"
                        data-testid="searchButton"
                        onClick={this.getListOfVideosData}
                      >
                        <BsSearch />
                      </SearchButton>
                    </SearchFieldContainer>
                    <>{this.renderHomePartOnDataResponse(lightTheme)}</>
                  </HomeComponent>
                </HomeComponentContainer>
              )
            }}
          </WatchContext.Consumer>
        </NavigationSidebar>
      </div>
    )
  }
}

export default HomeRoute
