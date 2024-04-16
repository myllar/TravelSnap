import React from 'react'
import { View, StyleSheet, Text, Animated} from 'react-native'

const SplashAnimation = () => {

    const position = new Animated.ValueXY({x: 0, y: 42})

    Animated.loop(
        Animated.timing(position, {
            toValue:{x: 0, y: 0},
            duration: 250,
            useNativeDriver: true
        })
    ).start()

    
  return (
    <View style={styles.container}>
        
        <View style={{flexDirection: "row"}}>
            <Text style={[styles.headerText, {color:"#86BBD8"}]}>Travel</Text>
            <Text style={[styles.headerText, {color:"#F6AE2D"}]}>Snap</Text>
        </View>

        <View style={styles.circle}>
            <View style={{marginTop: -40}}>
                <View style={styles.trainBody}>
                    <View>
                        <View style={styles.trainWindow}></View>
                            <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                                <View style={styles.trainLights}></View>
                                <View style={styles.trainFrontPlate}></View>
                                <View style={styles.trainLights}></View>
                            </View>
                    </View>
                </View>
                <View style={styles.trainTracksContainer}>
                    <View style={styles.trainTracksInner}></View>
                    <View style={styles.trainTracksInnerInner}>
                    <Animated.View style={[styles.trainTracksHorizontalLine, {transform:
                        [ 
                        {translateX: position.x},
                        {translateY: position.y}
                        ]
                        }]}>

                        </Animated.View>
                        <Animated.View style={[styles.trainTracksHorizontalLine, {transform:
                        [ 
                        {translateX: position.x},
                        {translateY: position.y}
                        ]
                        }]}>
                        </Animated.View>
                    </View>
                    <View style={styles.trainTracksOuterLeft}></View>
                    <View style={styles.trainTracksOuterRight}></View>
                </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#2F4858",
        justifyContent: "center",
        alignItems: "center"
    },
    circle: {
        width: 350,
        height: 350,
        borderRadius: 200,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    headerText: {
        fontSize: 56,
        alignSelf: "center",
        fontWeight: "900",
        marginBottom: 24
        // fontFamily: "sans-serif"
    },
    trainBody: {
        backgroundColor: "#FFF",
        zIndex: 100,
        height: 210,
        width: 200,
        borderWidth: 4,
        borderColor: "#2F4858",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    trainWindow: {
        height: 70,
        width: 160,
        borderWidth: 4,
        borderColor: "#2F4858",
        marginBottom: 24,
        borderRadius: 8,
        // backgroundColor: "#86BBD8"
    },
    trainLights: {
        height: 40,
        width: 40,
        borderWidth: 4,
        borderColor: "#2F4858",
        borderRadius: 20,
        backgroundColor: "#F6AE2D"
    },
    trainFrontPlate: {
        height: 20,
        width: 50,
        // borderWidth: 4,
        // borderColor: "#2F4858",
        backgroundColor: "#2F4858"
    },

    trainTracksContainer: {
        marginTop: 200,
        position: 'absolute',
    },
    trainTracksOuterLeft: {
        position: "absolute",
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 30,
        borderTopWidth: 100,
        borderRightColor: "transparent",
        borderTopColor: "#FFF"
        // height: 100,
        // width: 20,
        // backgroundColor: "red"
    },
    trainTracksOuterRight: {
        position: "absolute",
        left: 170,
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 30,
        borderTopWidth: 100,
        borderLeftColor: "transparent",
        borderTopColor: "#FFF"
    },
    trainTracksInner: {
        position: "absolute",
        height: 100,
        width: 200,
        backgroundColor: "#2F4858"
    },
    trainTracksInnerInner: {
        position: "absolute",
        // gap: 40,
        left: 5,
        width: 190,
        height: 0,
        borderBottomWidth: 100,
        borderBottomColor: "#FFF",
        borderLeftWidth: 30,
        borderLeftColor: "transparent",
        borderRightWidth: 30,
        borderRightColor: "transparent",
        borderStyle: "solid",
    },
    trainTracksHorizontalLine: {
        borderWidth: 3,
        height: 3,
        borderColor: "#2F4858",
        width: 200,
        // top: 42,
        left: -35,
        marginBottom: 48
    }
})

export default SplashAnimation
