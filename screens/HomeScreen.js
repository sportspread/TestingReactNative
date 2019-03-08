import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native'
import { WebBrowser } from 'expo'
import { MonoText } from '../components/StyledText'
import data from '../constants/dopestatz'
import { Kyleskey, SamsKey } from '../secrets.js'
import OtherGames from '../components/OtherGames'
export default class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      allGamesData: [],
      bestGame: {},
      otherGames: [],
    }
    // this.loadGames = this.loadGames.bind(this)
    this.getGames = this.getGames.bind(this)
  }
  static navigationOptions = {
    header: null,
  }

  // Kyles Key = cca1dc9064mshca4afa3c2a7c913p1ee48djsn3e71d9a9afa8
  // Sams Key = eb3aa29c30mshe3fcb151bf70b80p1d39ccjsn13eb2939026b

  componentDidMount() {
    // fetch(
    //   "https://therundown-therundown-v1.p.rapidapi.com/sports/4/events?include=scores+or+teams+or+all_periods",
    //   {
    //     method: "GET",
    //     headers: {
    //       "X-RapidAPI-Key": "cca1dc9064mshca4afa3c2a7c913p1ee48djsn3e71d9a9afa8"
    //     }
    //   }
    // )
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(resJSON => {
    //     //Won't allow you to setState on an unmounted component. Will need to store this data in a constant and then calll setState on componentDidMount
    //     this.setState({ allGames: resJSON.events });
    //   });
    this.setState({ allGamesData: data.events })
  }

  bubbleSort(arr) {
    let length = arr.length
    let swapped
    do {
      swapped = false
      for (let i = 0; i < length; i++) {
        if (arr[i + 1] === undefined) break
        if (arr[i].spread > arr[i + 1].spread) {
          let temp = arr[i]
          arr[i] = arr[i + 1]
          arr[i + 1] = temp
          swapped = true
        }
      }
    } while (swapped)
    return arr
  }

  getGames() {
    const { allGamesData } = this.state
    let teamsAndSpreads = allGamesData.map(event => {
      return {
        teams: event.teams.map(team => {
          return team.name
        }),
        spread:
          event.lines[1].spread.point_spread_home > 0
            ? event.lines[1].spread.point_spread_home
            : event.lines[1].spread.point_spread_home * -1,
      }
    })
    let sorted = this.bubbleSort(teamsAndSpreads)
    // for (let i = 0; i < length; i++) {
    //   for (let j = 0; j < length; j++) {
    //     if (teamsAndSpreads[j + 1] === undefined) break
    //     if (teamsAndSpreads[j].spread > teamsAndSpreads[j + 1].spread) {
    //       let temp = teamsAndSpreads[j]
    //       teamsAndSpreads[j] = teamsAndSpreads[j + 1]
    //       teamsAndSpreads[j + 1] = temp
    //     }
    //   }

    // let sorted = teamsAndSpreads.reduce((acc, game) => {
    //   let lowest = undefined
    //   if (lowest === undefined) {
    //     lowest = game.spread
    //   }
    //   if (game.spread <= lowest) {
    //     return [...acc, game]
    //   }
    // }, [])
    console.log(sorted)
    this.setState({
      bestGame: sorted.shift(),
      otherGames: [...sorted],
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {this.state.bestGame === {} ? (
            <View style={styles.getStartedContainer}>
              <Text>Press button to get games</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.teams}>
                {this.state.bestGame.teams !== undefined &&
                this.state.bestGame.teams.length !== 0
                  ? `Team A:${this.state.bestGame.teams[0]} Team B: ${
                      this.state.bestGame.teams[1]
                    }`
                  : 'Press button to get games'}
              </Text>
              <Text>
                {this.state.otherGames !== undefined &&
                this.state.otherGames.length !== 0
                  ? this.state.otherGames.map(game => {
                      return <OtherGames key={game.teams[0]} otherGame={game} />
                    })
                  : ''}
              </Text>
            </View>
          )}

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>{this.state.test}</Text>

            <Text style={styles.getStartedText}>
              Press this button to see todays top games!
            </Text>

            <Button title="Show Me YA MOVES" onPress={this.getGames} />
          </View>
        </ScrollView>
      </View>
    )
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      )

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      )
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      )
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    )
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    )
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
  teams: {
    fontSize: 25,
    fontWeight: 'bold',
  },
})
