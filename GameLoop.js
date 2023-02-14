import React,{ Component} from "react";
import { Alert, View } from "react-native";
import Constants from "./Constants";

randomBetween =(min,max)=>{
    return Math.floor(Math.random() * (max - min +1)+ min );
}
const GameLoop =(entities,{touches,events,dispatch})=>{
   // in kelas hamash ejra mishe
   let head= entities.head;
   let food =entities.food;
   let tail = entities.tail;

if(events.length){
    for(let i=0 ; i< events.length ; i++){
        if(events[i].type === "move-up" && head.yspeed !== 1){
            head.yspeed = -1;
            head.xspeed=0;
        }
        else if(events[i].type === "move-down" && head.yspeed !== -1){
            head.yspeed = 1;
            head.xspeed=0;
        }
        else if (events[i].type === "move-left" && head.xspeed !== 1){
            head.xspeed = -1;
            head.yspeed=0;
        }
        else if(events[i].type === "move-right" && head.xspeed !== -1){
            head.xspeed = 1;
            head.yspeed=0;
        }
    }
}




   head.nextMove -= 1;
   if(head.nextMove === 0){
    head.nextMove= head.updateFrequency;
    if( head.position[0] + head.xspeed <0 || head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
        head.position[1] + head.yspeed <0 || head.position[1] + head.yspeed >= Constants.GRID_SIZE){
            //Game over
            dispatch({
                type :"game-over"
            })
           
        }
        else {

            tail.elements =[[head.position[0],head.position[1]]].concat(tail.elements).slice(0,-1);


            head.position[0] += head.xspeed;
            head.position[1] += head.yspeed;

            // kod payını mıge age dome snake ba head barkhord kone game over beshe
            for (let i ; i< tail.elements.length ; i++){
                if(head.position[0] === tail.elements[i][0] && head.position[1] === tail.elements[i][1]){
                    dispatch({
                        type :"game-over"
                    })
                }
            }


            if( head.position[0] === food.position[0] && head.position[1] === food.position[1]){
                // eating food and grow tail
                tail.elements =[[food.position[0],food.position[1]]].concat(tail.elements);



                //1 yani az yedune munde be labeye samte chap shuru kone 
                food.position[0]=randomBetween(1,Constants.GRID_SIZE-1);
                food.position[1]=randomBetween(1,Constants.GRID_SIZE-1);
            }
        }
         

   }
    return entities
}

export default GameLoop;
