import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

export default class FadeInView extends Component {
    constructor (props){
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
            yPosition: new Animated.Value(20),
        }
    }

    componentDidMount(){
        Animated.parallel([
            Animated.timing(                  // Animate over time
                this.state.fadeAnim,            // The animated value to drive
                {
                    toValue: 1,                   // Animate to opacity: 1 (opaque)
                    duration: 600,              // Make it take a while
                }
            ),
            Animated.timing(this.state.yPosition, {
                toValue: 0,
                easing: Easing.in(),
                duration: 800,
            })
        ]).start();                        // Starts the animation
    }

render() {
    return (
        <Animated.View                 // Special animatable View
            style={{
            ...this.props.style,
            opacity: this.state.fadeAnim,         // Bind opacity to animated value
            top: this.state.yPosition,
            }}
        >
            {this.props.children}
      </Animated.View>
      );
    }
  }