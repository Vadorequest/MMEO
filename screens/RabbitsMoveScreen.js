import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo';

import { play, randomPlay } from '../utils/sound';
import SOUNDS from '../constants/Sounds';

const MAX_Y = 0.6; // Seuil haut, détection de saut
const MIN_Y = 0.1; // Seuil bas, détection de saut

const JUMPS_NEEDED_SUCCESS = 3;

const JUMP_HIGH = 'high';
const JUMP_LOW = 'low';

export default class RabbitsMoveScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'RabbitsMoveStack',
  };

  constructor(props) {
    super(props);

    this.state = {
      jumpCount: 0,
      lastJump: null,
      accelerometerData: {},
      backgroundRing: null,
    };

    // XXX Handle component lifecycle "didFocus" is executed between tabs change
    this.props.navigation.addListener('didFocus', () => {
      (async () => {
        const activityStart = await randomPlay([SOUNDS.activityStart]);
        const backgroundRing = await randomPlay([SOUNDS.backgroundRing]);
        this.setState({
          backgroundRing,
        });
      })();

      this._subscription = Accelerometer.addListener(accelerometerData => {
        this.setState({ accelerometerData });
        // console.log(accelerometerData.y, this.state.lastJump)
        if (accelerometerData.y >= MAX_Y) {
          if (this.state.lastJump === JUMP_LOW) {
            this._handleJump();
          }
          this.setState({
            lastJump: JUMP_HIGH,
          });
        } else if (accelerometerData.y <= MIN_Y) {
          if (this.state.lastJump === JUMP_HIGH) {
            this._handleJump();
          }
          this.setState({
            lastJump: JUMP_LOW,
          });
        }
      });
    });
  }

  render() {
    let { x, y, z } = this.state.accelerometerData;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Les Lapins Bagarreurs</Text>
          </View>

          <View style={styles.helpContainer}>
            <Text style={styles.helpLinkText}>Saute sur place comme les lapins pour les libérer !</Text>
          </View>

          <View style={styles.helpContainer}>
            <Text style={styles.helpLinkText}>{this.round(x)}, {this.round(y)}, {this.round(z)}</Text>
            <Text style={styles.helpLinkText}>Tu as sauté {this.state.jumpCount} fois pour l'instant !</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  round(n) {
    if (!n) {
      return 0;
    }

    return Math.floor(n * 100) / 100;
  }

  _handleJump() {
    if (!this.state.exerciseCompleted) {
      const jumpCount = this.state.jumpCount + 1;
      console.log(jumpCount, 'jumpCount');

      if (jumpCount >= JUMPS_NEEDED_SUCCESS) {
        this.setState({
          exerciseCompleted: true,
          jumpCount: jumpCount,
        });

        this._exerciceCompleted();

      } else {
        this.setState({
          jumpCount: jumpCount,
        });
      }
    }
  }

  _exerciceCompleted() {
    (async () => {
      const successSound = await play(SOUNDS.successLong);
    })();

    this.props.navigation.navigate('Settings'); // TODO

    if(this.state.backgroundRing){
      console.log(this.state.backgroundRing)
      this.state.backgroundRing.stopAsync();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

