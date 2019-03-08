import React from 'react'
import { ThemeProvider } from 'react-native-elements'
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
import data from '../constants/dopestatz'
import { WebBrowser } from 'expo'
import { MonoText } from '../components/StyledText'
import { TopMatch } from '../components/TopMatch.js'
import { OtherGames } from '../components/OtherGames.js'

export default class GamesScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      allGamesData: [],
      bestGame: {},
      otherGames: [],
    }
  }

  static navigationOptions = {
    header: null,
  }

  // getGames() {
  //   const gameData = this.state.ball;
  //   let teamsAndSpreads = gameData.map(event => {
  //     return {
  //       teams: event.teams.map(team => {
  //         return team.name;
  //       }),
  //       spread:
  //         event.lines[1].spread.point_spread_home > 0
  //           ? event.lines[1].spread.point_spread_home
  //           : event.lines[1].spread.point_spread_home * -1
  //     };
  //   });
  //   let length = teamsAndSpreads.length;
  //   for (let i = 0; i < length; i++) {
  //     for (let j = 0; j < length - i - 1; j++) {
  //       if (teamsAndSpreads[j].spread > teamsAndSpreads[j + 1].spread) {
  //         let temp = teamsAndSpreads[j];
  //         teamsAndSpreads[j] = teamsAndSpreads[j + 1];
  //         teamsAndSpreads[j + 1] = temp;
  //       }
  //     }
  //     console.log(teamsAndSpreads[0]);
  //     return teamsAndSpreads[0];
  //   }
  // }

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

  getGames() {
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
    let length = teamsAndSpreads.length
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (teamsAndSpreads[j].spread > teamsAndSpreads[j + 1].spread) {
          let temp = teamsAndSpreads[j]
          teamsAndSpreads[j] = teamsAndSpreads[j + 1]
          teamsAndSpreads[j + 1] = temp
        }
      }
    }
    this.setState({
      bestGame: teamsAndSpreads[0],
      otherGames: [teamsAndSpreads[0]],
    })
    return teamsAndSpreads[0]
  }

  componentWillMount() {
    this.getGames()
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <TopMatch bestGame={this.state.bestGame} />
          {this.state.otherGames.map(game => {
            return <OtherGames key={game.teams[0]} otherGame={game} />
          })}
        </ScrollView>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}
        />
      </View>
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
