import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import ResponsivePlayer from './ResponsivePlayer'
import FilePlayer from 'react-player'
import Config from './config.json'
import '../css/App.css';
import '../css/index.css';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    private BoardOptions: any;
    private player_refs: any;
    private players: any;
    private file_players: any;
    private file_player_refs: any;
    constructor(props:any) {
        super(props);
        var baseUri = Config.http_server_uri;
        this.BoardOptions = {};
    
        this.getJsonData(baseUri + "board.json").then((json) => {
          this.BoardOptions = json;
        })
    
        this.getJsonData(baseUri + "youtube-urls.json")
        .then((json) => {
          if(json !== undefined){
            json.fragments.forEach((element: any) => {
              this.players.push(<div className="col-4 col-sm-3 rm-padding">
              <ResponsivePlayer ref={(player:any) => this.player_refs.push(player)} key={element.key} start_time={element.start_time} name={element.name} url={element.url} end_time={element.end_time}/>
              </div>);
            });
            this.setState(this.players);
          }
        })
    
        this.getJsonData(baseUri + "file-urls.json")
        .then((json) => {
          if(json !== undefined){
            json.fragments.forEach((element: any) => {
              this.file_players.push(<div className="col-sm-2 rm-padding">
              <div className='player-wrapper-file'>
              <img src={baseUri+element.img_url} width="100%" height="150px"/>
              <FilePlayer ref={(player: any) => this.file_player_refs.push(player)} url={baseUri+element.url} controls={true} width='100%' height='100%'/>
              </div>
              </div>);
            this.setState(this.file_players);
            });
          }
        })
    
        this.players = [];
        this.file_players = [];
        this.player_refs = [];
        this.file_player_refs = [];
    
        this.playAll = this.playAll.bind(this);
        this.playAllFiles = this.playAllFiles.bind(this);
      }
    
      getJsonData(url: string) {
        return fetch(url)
        .then((response) =>{ 
          return response.json() 
        })
        .catch((error) => {
          console.error(error);
        });
     }
    
      playAll() {
        this.player_refs.forEach((player_ref: any) => {
          player_ref.player.player.player.play();
        });
      }
    
      playAllFiles() {
        this.file_player_refs.forEach((player_ref: any) => {
          player_ref.player.player.player.play();
        });
      }
    
      render() {
        let boardTitle = this.BoardOptions.name;
    
        return <div className="container">
        <div className="row">
          <p className="boardTitle">{boardTitle}</p>
          <button onClick={this.playAll} type="button">Play All (Youtube)!</button>
          <button onClick={this.playAllFiles} type="button">Play All (Files)!</button>
        </div>
        <div className="row">
          {this.players}
        </div>
        <div className="row">
          {this.file_players}
        </div>
        </div>
      }
}