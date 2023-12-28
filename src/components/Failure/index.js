import WatchContext from '../../Context/WatchContext'
import {
  FailureImage,
  FailureText,
  HavingTrouble,
  RetryButton,
} from './styledComponents'

const Failure = props => {
  const {retryFunction} = props

  const retry = () => {
    retryFunction()
  }

  return (
    <WatchContext.Consumer>
      {value => {
        const {lightTheme, changedAttributesOnThemeChange} = value
        const {failureViewImage, failureViewImageAlt} =
          changedAttributesOnThemeChange()

        return (
          <>
            <FailureImage
              value={lightTheme}
              src={failureViewImage}
              alt={failureViewImageAlt}
            />
            <FailureText value={lightTheme}>
              Oops! Something Went Wrong
            </FailureText>
            <HavingTrouble>
              We are having some trouble to complete your request. Please try
              again.
            </HavingTrouble>
            <RetryButton type="button" onClick={retry}>
              Retry
            </RetryButton>
          </>
        )
      }}
    </WatchContext.Consumer>
  )
}

export default Failure
