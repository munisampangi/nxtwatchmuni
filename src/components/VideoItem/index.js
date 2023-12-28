import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

import {
  MainDiv,
  Image,
  MiniDiv,
  Para,
  ChannelPara,
  ParaSection,
  LogoImage,
  MainSection,
  View,
} from './styledComponents'

const VideoItem = props => {
  const {item} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = item
  const uploadedTime = formatDistanceToNow(new Date(publishedAt))
  return (
    <MainDiv>
      <Link to={`/videos/${id}`}>
        <Image src={thumbnailUrl} alt="video thumbnail" />
      </Link>
      <MiniDiv>
        <LogoImage src={channel.profileImageUrl} alt="channel logo" />
        <MainSection>
          <Para>{title}</Para>
          <ChannelPara>{channel.name}</ChannelPara>
          <ParaSection>
            <View>{viewCount} views</View>
            <View>{uploadedTime} ago</View>
          </ParaSection>
        </MainSection>
      </MiniDiv>
    </MainDiv>
  )
}

export default VideoItem
