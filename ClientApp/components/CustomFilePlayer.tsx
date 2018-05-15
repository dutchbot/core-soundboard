import * as React from 'react'
import { ReactPlayerProps } from 'react-player'
import FilePlayer from 'react-player'

export interface CustomProps extends ReactPlayerProps{
  imageSrc: string;
}

class CustomFilePlayer extends React.Component<CustomProps, any> {
    private player: any
  constructor(props:any) {
    super(props);
  }

  ref = (player : any) => {
    this.player = player
  }

  render() {
    return (
    <div className="col-sm-2 rm-padding">
      <div className='player-wrapper-file'>
        <img src={this.props.imageSrc} 
              width="100%" 
              height="150px"/>
        <FilePlayer ref={this.ref}
                    url={this.props.url} 
                    controls={true}
                    width='100%'
                    height='100%'/>
        </div>
      </div>
    )
  }
};

export default CustomFilePlayer;