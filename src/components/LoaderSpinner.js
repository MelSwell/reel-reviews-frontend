import { Dimmer, Loader } from 'semantic-ui-react'

function LoaderSpinner() {
  return (
    <div className="loader">
      <Dimmer active inverted>
        <Loader inverted size="massive">Loading</Loader>
      </Dimmer>
    </div>
  )
}

export default LoaderSpinner