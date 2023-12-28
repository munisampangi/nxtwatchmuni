import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {GoPrimitiveDot} from 'react-icons/go'
import {formatDistanceToNow} from 'date-fns'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Failure from '../Failure'
import WatchContext from '../../Context/WatchContext'

import {
  LoaderOrFailureContainer,
  LoaderComponent,
  NavigationAndTrendingPartContainer,
  TrendingVideoAndDetailsContainer,
  TrendingComponentContainer,
  EachVideoThumbnailImage,
  VideoTitle,
  VideoDetailsOptionsContainers,
  ViewsAndUpdatedTimeContainer,
  HorizontalRule,
  ChannelDetailsContainer,
  ChannelImage,
  PrimitiveDot,
  CustomizeButton,
  ButtonContainer,
  ChannelTitle,
  ChannelSubscriber,
} from './styledComponents'

const dataFetchStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class VideoDetails extends Component {
  state = {
    dataFetchStatus: dataFetchStatusConstants.initial,
    videoDetails: {},
  }

  componentDidMount = () => {
    this.getVideoData()
  }

  getVideoData = async () => {
    this.setState({dataFetchStatus: dataFetchStatusConstants.loading})
    const {match} = this.props
    const {id} = match.params
    const token = Cookies.get('jwt_token')

    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, {
      headers: {Authorization: `Bearer ${token}`},
      method: 'GET',
    })
    if (response.ok) {
      const data = await response.json()

      this.setState({videoDetails: data.video_details})
      this.setState({dataFetchStatus: dataFetchStatusConstants.success})
    }
    if (!response.ok) {
      this.setState({dataFetchStatus: dataFetchStatusConstants.failure})
    }
  }

  renderRoutePartOnDataResponse = lightTheme => {
    const {dataFetchStatus, videoDetails} = this.state

    const {channel} = videoDetails

    switch (dataFetchStatus) {
      case dataFetchStatusConstants.loading:
        return (
          <LoaderOrFailureContainer data-testid="loader" value={lightTheme}>
            <LoaderComponent
              as={Loader}
              type="ThreeDots"
              color="#4f46e5"
              height="50"
              width="50"
            />
          </LoaderOrFailureContainer>
        )
      case dataFetchStatusConstants.failure:
        return (
          <LoaderOrFailureContainer value={lightTheme}>
            <Failure retryFunction={this.getVideoData} />
          </LoaderOrFailureContainer>
        )
      case dataFetchStatusConstants.success:
        return (
          <TrendingVideoAndDetailsContainer>
            <EachVideoThumbnailImage
              as={ReactPlayer}
              url={videoDetails.video_url}
              controls
              width="100%"
              height="70vh"
            />

            <VideoTitle value={lightTheme}>{videoDetails.title}</VideoTitle>

            <VideoDetailsOptionsContainers>
              <ViewsAndUpdatedTimeContainer>
                <p>{videoDetails.view_count} Views </p>
                <PrimitiveDot as={GoPrimitiveDot} />
                <p>
                  {formatDistanceToNow(new Date(videoDetails.published_at), {
                    addSuffix: true,
                  })
                    .split(' ')
                    .slice(1)
                    .join(' ')}
                </p>
              </ViewsAndUpdatedTimeContainer>

              <WatchContext.Consumer>
                {value => {
                  const {
                    likedList,
                    dislikedList,
                    savedList,
                    addAsLikedVideos,
                    addAsDislikedVideos,
                    addOrRemoveAsOrFromSavedVideos,
                  } = value

                  const {match} = this.props
                  const {id} = match.params

                  const addToLiked = () => {
                    addAsLikedVideos(id)
                  }

                  const addToDisLiked = () => {
                    addAsDislikedVideos(id)
                  }

                  const toSaveOrUnSave = () => {
                    addOrRemoveAsOrFromSavedVideos(videoDetails)
                  }

                  /*  const likeButtonText = likedList.includes(id)

                  const DislikeButtonText = dislikedList.includes(id) */

                  const savedListIds = savedList.map(each => each.id)

                  const saveButtonText = savedListIds.includes(id)
                    ? 'Saved'
                    : 'Save'

                  return (
                    <ButtonContainer>
                      <CustomizeButton
                        type="button"
                        onClick={addToLiked}
                        value={likedList.includes(id)}
                      >
                        <BiLike /> Like
                      </CustomizeButton>
                      <CustomizeButton
                        type="button"
                        onClick={addToDisLiked}
                        value={dislikedList.includes(id)}
                      >
                        <BiDislike /> Dislike
                      </CustomizeButton>

                      <CustomizeButton
                        type="button"
                        onClick={toSaveOrUnSave}
                        value={savedListIds.includes(id)}
                      >
                        <BiListPlus /> {saveButtonText}
                      </CustomizeButton>
                    </ButtonContainer>
                  )
                }}
              </WatchContext.Consumer>
            </VideoDetailsOptionsContainers>

            <HorizontalRule />
            <ChannelDetailsContainer>
              <ChannelImage
                src={channel.profile_image_url}
                alt="channel logo"
              />
              <div>
                <ChannelTitle value={lightTheme}>{channel.name}</ChannelTitle>
                <ChannelSubscriber>
                  {channel.subscriber_count} subscribers
                </ChannelSubscriber>
                <ChannelSubscriber>
                  {videoDetails.description}
                </ChannelSubscriber>
              </div>
            </ChannelDetailsContainer>
          </TrendingVideoAndDetailsContainer>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <NavigationAndTrendingPartContainer>
          <Sidebar />
          <WatchContext.Consumer>
            {value => {
              const {lightTheme} = value
              return (
                <TrendingComponentContainer
                  data-testid="videoItemDetails"
                  value={lightTheme}
                >
                  {this.renderRoutePartOnDataResponse(lightTheme)}
                </TrendingComponentContainer>
              )
            }}
          </WatchContext.Consumer>
        </NavigationAndTrendingPartContainer>
      </div>
    )
  }
}

export default VideoDetails
