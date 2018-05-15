import * as React from 'react'
import { ReactPlayerProps } from 'react-player'
import ReactPlayer from 'react-player'

class ResponsivePlayer extends React.Component<ReactPlayerProps, any> {
    private player: any
  constructor(props:any) {
    super(props);
    this.state = {};
  }

  ref = (player : any) => {
    this.player = player
  }

  onProgress = (state : any) => {
    if (state.playedSeconds >= this.props.end_time) {
      var internalPlayer = this.player.player.player.player;
      internalPlayer.pauseVideo();
      internalPlayer.seekTo(this.props.start_time)
      this.setState({url:this.props.url});
      }
  }

  render() {
    return (
      <div className='col-4 col-sm-3 rm-padding'>
        <div className='player-wrapper '>
          <ReactPlayer
            ref={this.ref}
            className='react-player'
            url={this.props.url}
            onProgress={this.onProgress}
            width='100%'
            height='100%'
          />
          <div className="overlay">
            <div className="text">{this.props.name}</div>
          </div>
        </div>
      </div>
    )
  }
};

export default ResponsivePlayer;