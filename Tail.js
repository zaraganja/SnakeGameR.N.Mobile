import React,{Component} from "react";
import { View } from "react-native";
import Constants from "./Constants";

export default class Tail extends Component {
    constructor(props){
        super(props);
    }
   


render () {
  let TailList =this.props.elements.map((item,index)=>
  {
return <View  key={index} style={{width:this.props.size , height : this.props.size, backgroundColor:'#888888',position:'absolute',left: item[0]* this.props.size ,top: item[1]* this.props.size}} />
  })
    return(
        <View style={{width:Constants.GRID_SIZE * this.props.size , width:Constants.GRID_SIZE * this.props.size}}>
            {TailList}
        </View>
    )
}
 }
