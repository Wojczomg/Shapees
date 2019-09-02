import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { SketchPicker } from 'react-color';
import * as math from "mathjs";




class App extends React.Component {
  constructor(props) {
    super(props);
    this.wallRef = React.createRef();
    this.state = {
      shapeColor: 'white',
      backgroundColor: 'black'
    }
  }

  

  changeColorShape = (color) => {console.log('ZMIENIA');
    this.setState({shapeColor: color.hex})};
  changeColorback = (color) => {this.setState({backgroundColor: color.hex})};

  numbers = () => Array.from(
    Array(Math.round((window.innerHeight*window.innerWidth)/(14*14))).keys());

  render() {
    return (
      <div>
      <div 
      className="App w3-container" 
      style={{backgroundColor: this.state.backgroundColor,
      lineHeight:'0', height:"95vh", overflow:"hidden"
      }}
      onMouseUp={(e) => this.wallRef.current.mouseUp(e)}>
      
       {this.numbers().map((key) =>
         <Point 
         key={key}  
         shapeColor={this.state.shapeColor} 
         backgroundColor={this.state.backgroundColor}/>)}
         <Wall ref={this.wallRef}/>
        
      </div>
      <Colors
      shapeColor={this.state.shapeColor} 
      backgroundColor={this.state.backgroundColor}
      backchange={this.changeColorback}
      shapechange={this.changeColorShape}
      />
      </div>
    );
  }
}


class Point extends React.Component {

  randInRange = (min,max) => Math.floor(Math.random() * (max - min)) + min;

  rect = (e) => {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.strokeStyle = this.props.shapeColor;
    ctx.lineWidth = 1;
    const x = e.target.offsetLeft;
    const y = e.target.offsetTop;
    const r1 = this.randInRange(4,50);
    const r2 = this.randInRange(4,50);
    const ro = this.randInRange(0,180);
    const array = [[0,0],[r1,0],[r1,r2],[0,r2]];
    const rotation = [[Math.cos(ro),-Math.sin(ro)],[Math.sin(ro),Math.cos(ro)]];
    console.log(math.multiply(array,rotation)[0][1]);
    const coords = math.multiply(array,rotation);
    ctx.beginPath();
    ctx.moveTo(coords[0][0]+x, coords[0][1]+y);
    ctx.lineTo(coords[1][0]+x, coords[1][1]+y);
    ctx.lineTo(coords[2][0]+x, coords[2][1]+y);
    ctx.lineTo(coords[3][0]+x, coords[3][1]+y);
    ctx.lineTo(coords[0][0]+x, coords[0][1]+y);
    ctx.stroke();
  }

  circle = (e) => {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.strokeStyle = this.props.shapeColor;
    ctx.lineWidth = 1;
    const x = e.target.offsetLeft;
    const y = e.target.offsetTop;
    const r1 = this.randInRange(4,50);
    const r2 = this.randInRange(4,50);
    const ro = this.randInRange(0,180);
    ctx.beginPath();
    ctx.arc(x, y, r1, 0, 2 * Math.PI);
    ctx.stroke(); 

  }

  triangle = (e) => {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.strokeStyle = this.props.shapeColor;
    ctx.lineWidth = 1;
    const x = e.target.offsetLeft;
    const y = e.target.offsetTop;
    const r1 = this.randInRange(4,50);
    const r2 = this.randInRange(4,50);
    const ro = this.randInRange(0,180);
    const array = [[0,0],[r1,1],[0,r2]];
    const rotation = [[Math.cos(ro),-Math.sin(ro)],[Math.sin(ro),Math.cos(ro)]];
    const coords = math.multiply(array,rotation);
    ctx.beginPath();
    ctx.moveTo(coords[0][0]+x, coords[0][1]+y);
    ctx.lineTo(coords[1][0]+x, coords[1][1]+y);
    ctx.lineTo(coords[2][0]+x, coords[2][1]+y);
    ctx.lineTo(coords[0][0]+x, coords[0][1]+y);
    ctx.stroke();
  }

  cross = (e) => {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.strokeStyle = this.props.shapeColor;
    ctx.lineWidth = 2;
    const x = e.target.offsetLeft;
    const y = e.target.offsetTop;
    const r1 = this.randInRange(4,20);
    const r2 = this.randInRange(4,50);
    const ro = this.randInRange(0,180);
    const array = [[0,-r1],[0,r1],[r1,0],[-r1,0]];
    const rotation = [[Math.cos(ro),-Math.sin(ro)],[Math.sin(ro),Math.cos(ro)]];
    const coords = math.multiply(array,rotation);
    ctx.beginPath();
    ctx.moveTo(coords[0][0]+x, coords[0][1]+y);
    ctx.lineTo(coords[1][0]+x, coords[1][1]+y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(coords[2][0]+x, coords[2][1]+y);
    ctx.lineTo(coords[3][0]+x, coords[3][1]+y);
    ctx.stroke();

  }

  step = (e) => {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.strokeStyle = this.props.shapeColor;
    ctx.lineWidth = 2;
    const x = e.target.offsetLeft;
    const y = e.target.offsetTop;
    const r1 = this.randInRange(4,25);
    const r2 = this.randInRange(4,50);
    const ro = this.randInRange(0,180);
    const array = [[0,0],[0,-r1],[r1,-r1]];
    const rotation = [[Math.cos(ro),-Math.sin(ro)],[Math.sin(ro),Math.cos(ro)]];
    const coords = math.multiply(array,rotation);
    ctx.beginPath();
    ctx.moveTo(coords[0][0]+x, coords[0][1]+y);
    ctx.lineTo(coords[1][0]+x, coords[1][1]+y);
    ctx.lineTo(coords[2][0]+x, coords[2][1]+y);
    ctx.stroke();

  }



  
  render() {

      // this.onmouseover = (e) => (ReactDOM.render(
      //   <Shape 
      //   shapeColor={this.props.shapeColor} 
      //   backgroundColor={this.props.backgroundColor}/>,
      //   e.target
      // ))
      const randInRange = (min,max) => Math.floor(Math.random() * (max - min)) + min;

      this.onmouseover = (e) => {
        console.log('drawing');
        const randomshape = [
          this.cross,this.step,this.rect,this.triangle,this.circle
        ];
        randomshape[this.randInRange(0,5)](e);

      }

    return (
      <div 
      className="point"
      style={{borderStyle: 'solid',
        borderColor: "transparent",
        height: '20px', width: '20px',position:"relative",
        
        display: 'inline-block', zIndex:"2",
        backgroundColor: "transparent"}}
        onMouseOver={this.onmouseover}>
      
      </div>
    );
  }
}

class Wall extends React.Component{
  state = {onfront: '3'}


  mouseDown = (e) => {
    e.preventDefault();
    console.log('DOWNDOWNDOWN');
    this.setState({onfront: '1'});
  };
  mouseUp = (e) => {
    e.preventDefault();
    console.log('UPUPUPUP');
    this.setState({onfront: '3'});
    window.open(document.getElementById("canvas").toDataURL('image/png', 1.0));

  };

  render(){
    const index = this.state.onfront;
    console.log('zmieniam na '+ index);
    const styleObj = {
     
      position: 'absolute', top: '0px',left:'0px',
      backgroundColor: 'transparent',
      zIndex: index,
    };

    return (
      <canvas style={styleObj} id={"canvas"}
       height={window.innerHeight*0.95} 
       width={window.innerWidth}
       onMouseDown={(e) => this.mouseDown(e)}
       onMouseUp={(e) => this.mouseUp(e)}>
      </canvas>
    );
  }
}

class Shape extends React.Component{

  randInRange = (min,max) => Math.floor(Math.random() * (max - min)) + min;

  randomizer = () => {
    const shapes = [
          <circle 
          r={this.randInRange(4,40)}
          stroke={this.props.shapeColor}
          strokeWidth="1"
          fill="transparent" />,
          <rect
          width={this.randInRange(4,50)} 
          height={this.randInRange(4,50)} 
          style={{fill:'transparent', 
          strokeWidth:1, 
          stroke:this.props.shapeColor,
          transform: `rotate(${this.randInRange(0,180)}deg)`}}/>,
          <polyline 
          points="0,20 20,20 20,40" 
          style={{fill:'transparent',
          stroke:this.props.shapeColor,
          strokeWidth:'2',
          transform: `rotate(${this.randInRange(0,180)}deg)`}} />,
          <path 
          d="M0 -10 L0 10 M-10 0 L10 0" 
          stroke={this.props.shapeColor}
          strokeWidth='2' 
          style={{fill:'transparent',
          transform: `rotate(${this.randInRange(0,180)}deg)`}}/>,
          <polygon 
          points="-1,1 30,20 16,-21" 
          style={{fill:'transparent',
          stroke:this.props.shapeColor,
          strokeWidth:1,
          transform: `rotate(${this.randInRange(0,180)}deg)`}} />
        ]    
    return shapes[this.randInRange(0,5)];
     
  };

  render(){
    console.log('drawing');
    return (
      <svg height='1' width='1' className={"svg"}
        style={{position: 'absolute', height: '0 px', width: '0 px',
          overflow: 'visible'}}>
        {this.randomizer()}
      </svg>
    )
  }
    
   
}

class Colors extends React.Component{
  state = {
    hidden: true
  }

  toogle = () => {
    this.setState({hidden:!this.state.hidden});
    
  }
  
  componentDidUpdate() {
    window.scrollBy(0,500);
    console.log("YEEEE HAAAAW")
  }

  render(){
    if(this.state.hidden){
      return (
        <div className={"w3-button w3-block w3-blue-grey w3-xlarge"} 
        onClick={this.toogle}> Click
        </div>
      )
    }
    else { 
      return (
        <div className={"w3-black w3-xlarge w3-container"}>

            <div className={"w3-row-padding w3-black"}>
              <div className={"w3-col m4 w3-black w3-hover-grey w3-center w3-xxlarge"}  onClick={this.toogle}>
                Hide
              </div>
              <div className={"w3-col m4"}>
                <div >
                <Picker
                color={this.props.shapeColor} 
                onChange={this.props.shapechange}/>
                </div>
              </div>  
              <div className={"w3-col m4"}>
                <div>
                <Picker 
                color={this.props.backgroundColor} 
                onChange={this.props.backchange}/>
                </div>
              </div>

            </div>
            
        </div>
      )
    }
  }
}

class Picker extends React.Component{
  state = {
    color: this.props.color
  }

  change = (c) => {this.setState({color:c})};

  render() {
    return (
      <SketchPicker style={{backgroundColor:"black"}}
        color={ this.state.color }
        onChange={this.change}
        onChangeComplete={this.props.onChange}
      />
    );
  }

}

export default App;
