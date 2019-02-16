import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SOUNDS from '../constants/Sounds';
import { play, randomPlay } from '../utils/sound';

export default class RabbitsMaterialScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'RabbitsMaterialStack',
  };

  constructor(props) {
    super(props);

    this.state = {
      touchCount: 0,
    };

    // XXX Handle component lifecycle "didFocus" is executed between tabs change
    this.props.navigation.addListener('didFocus', () => {
      (async () => {
        const introductionVoice = randomPlay([SOUNDS.introductionVoiceRabbitsMaterial]);
      })();
    });

    this._handleScreenTouch = this._handleScreenTouch.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Les Lapins Bagarreurs</Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleScreenTouch} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>CLICK ME</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  _exerciceCompleted() {
    (async () => {
      const successSound = play(SOUNDS.successLong);
    })();
    this.props.navigation.navigate('RabbitsMoveStack');
  }

  _handleScreenTouch = () => {
    const touchCount = this.state.touchCount + 1;
    console.log(`_handleScreenTouch called ${touchCount} times`);

    if (touchCount >= 10) {
      this._exerciceCompleted();
      this.setState({
        touchCount: touchCount,
        exerciseCompleted: true,
      });
    } else {
      this.setState({
        touchCount: touchCount,
      });
    }

    (async () => {
      console.log(this.state.touchCount, 'touchCount');
      const backgroundSound = await randomPlay([
        // SOUNDS.metal1,
        SOUNDS.metal2,
      ]);
    })();
  };
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
