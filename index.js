/**
 * @format
 */
import React, { Component,useState } from 'react';
import { AppRegistry, View, StyleSheet, ImageBackground, TouchableOpacity, Alert, Button } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { GameEngine } from 'react-native-game-engine';
import Constants from './Constants';
import Head from './Head';
import Food from './Food';
import Tail from './Tail';
import GameLoop from './GameLoop';

export default class Snake extends Component {
    constructor(props) {
        super(props);
        this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
        this.engine = null;
        this.state ={
            running:true
        }
      
    }
    onEvent =(e)=> {
        if( e.type === "game-over"){
            Alert.alert("Game Over!");
            this.setState({
                running:false
            })
        }
    }

    Reset=()=>{
        this.engine.swap(
            {
                head: { position: [0, 0], xspeed: 1, yspeed: 0, updateFrequency: 15, nextMove: 15, size: Constants.CELL_SIZE, renderer: <Head /> },
                food :{position: [this.randomBetween(1,Constants.GRID_SIZE-1), this.randomBetween(1,Constants.GRID_SIZE-1)], size: Constants.CELL_SIZE, renderer: <Food />},
                // tuye food ,1 yani az yedune munde be labeye samte chap shuru kone 
                tail : { size: Constants.CELL_SIZE, elements: [] ,renderer: <Tail/>}
            }
           
        );
        this.setState({
            running:true
        })
    }

    randomBetween =(min,max)=>{
        return Math.floor(Math.random() * (max - min +1)+ min );
    }
    render() {

        return (
            <View style={styles.container}>
                <GameEngine
                    ref={(ref) => this.engine = ref}
                    style={{ width: this.boardSize, height: this.boardSize, flex: null, backgroundColor: '#ffffff' }}
                    entities={{
                        head: { position: [0, 0], xspeed: 1, yspeed: 0, updateFrequency: 15, nextMove: 15, size: Constants.CELL_SIZE, renderer: <Head /> },
                        food :{position: [this.randomBetween(1,Constants.GRID_SIZE-1), this.randomBetween(1,Constants.GRID_SIZE-1)], size: Constants.CELL_SIZE, renderer: <Food />},
                        // tuye food ,1 yani az yedune munde be labeye samte chap shuru kone 
                        tail : { size: Constants.CELL_SIZE, elements: [] ,renderer: <Tail/>}
                    }}
                    systems={[GameLoop]}
                    onEvent= {this.onEvent}
                    running={this.state.running}
                />
                <Button title='New Game' onPress={()=> this.Reset()}/>
                <View style={styles.controls}>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={()=> {this.engine.dispatch({ type :"move-up"})}}>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={()=> {this.engine.dispatch({ type :"move-left"})}}>
                            <View style={styles.control} />
                        </TouchableOpacity>
                        <View style={[styles.control, { backgroundColor: null }]} />
                        <TouchableOpacity onPress={()=> {this.engine.dispatch({ type :"move-right"})}}>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={()=> {this.engine.dispatch({ type :"move-down"})}}>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>

                </View>


            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controls: {
        width: 300,
        height: 300,
        flexDirection: 'column',
    },
    control: {
        width: 100,
        height: 100,
        backgroundColor: 'lightblue'
    },
    controlRow: {
        width: 300,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }

})



AppRegistry.registerComponent(appName, () => Snake);
