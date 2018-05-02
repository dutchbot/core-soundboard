import * as React from 'react'
import { ReactPlayerProps } from 'react-player'
import ReactPlayer from 'react-player'

class ResponsivePlayer extends React.Component<ReactPlayerProps, any> {
    private player: any
    public propTypes: any;
    private end_time: any;
  constructor(props:any) {
    super(props);
    this.state = { url: props.url, start_time: props.start_time, end_time: props.end_time, name: props.name};
  }

  ref = (player : any) => {
    this.player = player
  }

  onProgress = (state : any) => {
    if (state.playedSeconds >= this.state.end_time) {
      var internalPlayer = this.player.player.player.player;
      internalPlayer.pauseVideo();
      internalPlayer.seekTo(this.props.start_time)
      this.setState({url:this.props.url});
      }
  }

  render() {
    return (
      <div className='player-wrapper'>
        <ReactPlayer
          ref={this.ref}
          className='react-player'
          playing={this.state.playing}
          url={this.state.url}
          onProgress={this.onProgress}
          width='100%'
          height='100%'
        />
      <div className="overlay">
      <div className="text">{this.state.name}</div>
      </div>
      </div>
    )
  }
};

export default ResponsivePlayer;