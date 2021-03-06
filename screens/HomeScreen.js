/* eslint-disable complexity */
import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Picker,
  TextInput,
} from 'react-native'
import { Text, Card, Button } from 'react-native-elements'
import data from '../constants/dopestatz'
import { KylesKey, SamsKey } from '../secrets.js'
import OtherGames from '../components/OtherGames'
import TopMatch from '../components/TopMatch.js'
import { NBATeams } from '../teamsAlphabetical'
import ActionSheet from 'react-native-actionsheet'
import FadeInView from './FadeInView'
import { allTeams } from '../constants/teams'
const NBA = require('nba')

export default class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      allGamesData: [],
      bestGame: [],
      otherGames: [],
      favTeam: '',
      playerTeam: '',
      favPlayer: 'Search Players Below',
      text: '',
    }
    this.findPlayer = this.findPlayer.bind(this)
    this.getGames = this.getGames.bind(this)
    this.scrollToTop = this.scrollToTop.bind(this)
    this.getSpread = this.getSpread.bind(this)
  }
  static navigationOptions = {
    header: null,
  }

  async componentDidMount() {
    /* 
  Below here is for using our API call

  DO NOT DELETE
  */

    fetch(
      'https://therundown-therundown-v1.p.rapidapi.com/sports/4/events?include=scores+or+teams+or+all_periods',
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': SamsKey,
        },
      }
    )
      .then(res => {
        return res.json()
      })
      .then(resJSON => {
        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1)
        let filtered = resJSON.events.filter(event => {
          return (
            Date.parse(event.event_date.slice(0, 10)) < Date.parse(tomorrow)
          )
        })
        return filtered
      })
      .then(filtered => {
        this.setState({ allGamesData: filtered })
      })

    /* 
  Below here is for testing using dummy data

  DO NOT DELETE

  dOnT TeLl Me WhAt To Do
  */

    // this.setState({ allGamesData: data.events })
  }
  scrollToTop() {
    this.scroller.scrollTo({ x: 0, y: 0 })
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

  findPlayer() {
    let sanitizedPlayer = this.state.text.toLowerCase().trim()
    const player = NBA.findPlayer(sanitizedPlayer)
    if (player !== undefined) {
      const team = allTeams.filter(curTeam => {
        return curTeam.teamId === player.teamId
      })
      this.setState({
        favPlayer: player.fullName,
        playerTeam: team[0].teamName,
      })
    } else {
      this.setState({
        text: '',
      })
      alert('Please Enter a Valid Player Name')
    }
  }

  getSpread(event) {
    let counter = 0
    let total = 0
    for (key in event.lines) {
      if (event.lines.hasOwnProperty([key])) {
        let curSpread =
          event.lines[key].spread.point_spread_home > 0
            ? event.lines[key].spread.point_spread_home
            : event.lines[key].spread.point_spread_home * -1
        total += curSpread
        counter++
      }
    }
    return total / counter
  }

  getGames() {
    const { allGamesData, favTeam, playerTeam } = this.state
    let teamsAndSpreads = allGamesData.map(event => {
      return {
        teams: event.teams.map(team => {
          return {
            name: team.name,
            isAway: team.is_away,
            isHome: team.is_home,
          }
        }),
        spread: this.getSpread(event),
      }
    })

    if (favTeam) {
      teamsAndSpreads.forEach(game => {
        game.teams.forEach(team => {
          if (team.name === favTeam) {
            game.spread = game.spread - game.spread * 0.33
          }
        })
      })
    }

    if (playerTeam) {
      teamsAndSpreads.forEach(game => {
        game.teams.forEach(team => {
          if (team.name === playerTeam) {
            game.spread = game.spread - game.spread * 0.33
          }
        })
      })
    }

    let sorted = this.bubbleSort(teamsAndSpreads)
    this.scrollToTop()
    this.setState({
      bestGame: sorted.shift(),
      otherGames: [...sorted],
    })
  }
  showActionSheet = () => {
    this.ActionSheet.show()
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          ref={scroller => {
            this.scroller = scroller
          }}
        >
          {this.state.bestGame === {} ? (
            ''
          ) : (
            <FadeInView>
              {this.state.bestGame.teams !== undefined &&
              this.state.bestGame.teams.length !== 0 ? (
                <TopMatch bestGame={this.state.bestGame} />
              ) : (
                <Text />
              )}
              {this.state.bestGame.teams === undefined ? (
                <Text />
              ) : (
                <FadeInView
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: 20,
                    paddingBottom: 15,
                  }}
                >
                  <View alignItems="center">
                    <Text h4 style={{ fontWeight: 'bold' }}>
                      Other Games
                    </Text>
                    <Text h5 alignText="center">
                      (from best to worst)
                    </Text>
                  </View>
                </FadeInView>
              )}
              <View>
                {this.state.otherGames !== undefined &&
                this.state.otherGames.length !== 0 ? (
                  this.state.otherGames.map(game => {
                    return (
                      <OtherGames
                        key={game.teams[0].name}
                        bestGame={this.state.bestGame}
                        otherGame={game}
                      />
                    )
                  })
                ) : (
                  <Text />
                )}
              </View>
            </FadeInView>
          )}

          {this.state.bestGame === undefined ||
          this.state.bestGame.length === 0 ? (
            <View
              style={{
                paddingTop: 20,
                paddingBottom: 15,
                alignItems: 'center',
              }}
            >
              <Button title="Load Games" onPress={this.getGames} />
            </View>
          ) : (
            <View
              style={{
                paddingTop: 20,
                paddingBottom: 15,
                alignItems: 'center',
                marginHorizontal: 50,
              }}
            >
              <Button title="Refresh Games" onPress={this.getGames} />
            </View>
          )}

          {Platform.OS === 'android' ? (
            <Picker
              selectedValue={this.state.favTeam}
              onValueChange={teamName => {
                this.setState({ favTeam: teamName })
              }}
              promt="Select Favorite Team"
            >
              <Picker.Item label="Select a Team" value="" />
              {NBATeams.map(team => {
                return (
                  <Picker.Item
                    label={team}
                    value={team}
                    key={NBATeams.indexOf(team)}
                  />
                )
              })}
            </Picker>
          ) : (
            <View>
              <Card>
                <Text onPress={this.showActionSheet}>
                  {' '}
                  Pick Favorite Team: {this.state.favTeam}
                </Text>
                <ActionSheet
                  ref={o => (this.ActionSheet = o)}
                  title={'Select Team'}
                  options={[
                    'Atlanta Hawks',
                    'Boston Celtics',
                    'Brooklyn Nets',
                    'Charlotte Hornets',
                    'Chicago Bulls',
                    'Cleveland Cavaliers',
                    'Dallas Mavericks',
                    'Denver Nuggets',
                    'Detroit Pistons',
                    'Golden State Warriors',
                    'Houston Rockets',
                    'Indiana Pacers',
                    'Los Angeles Clippers',
                    'Los Angeles Lakers',
                    'Memphis Grizzlies',
                    'Miami Heat',
                    'Milwaukee Bucks',
                    'Minnesota Timberwolves',
                    'New Orleans Pelicans',
                    'New York Knicks',
                    'Oklahoma City Thunder',
                    'Orlando Magic',
                    'Philadelphia 76ers',
                    'Phoenix Suns',
                    'Portland Trail Blazers',
                    'Sacramento Kings',
                    'San Antonio Spurs',
                    'Toronto Raptors',
                    'Utah Jazz',
                    'Washington Wizards',
                    'Cancel',
                  ]}
                  cancelButtonIndex={37}
                  destructiveButtonIndex={37}
                  onPress={index => {
                    this.setState({
                      favTeam: NBATeams[index],
                    })
                  }}
                />
              </Card>
            </View>
          )}
          <Card>
            <View>
              <Text h6> Favorite Player: {this.state.favPlayer} </Text>
            </View>
          </Card>
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 15,
              alignItems: 'center',
              marginHorizontal: 50,
            }}
          >
            <TextInput
              style={{
                height: 40,
                width: 300,
                borderColor: 'gray',
                borderWidth: 1,

                textAlign: 'center',
              }}
              onChangeText={text => {
                if (text === '') {
                  this.setState({
                    favPlayer: 'Search Players Below',
                    playerTeam: '',
                  })
                }
                this.setState({ text: text })
              }}
              placeholder="Use official names. Ex. Stephen Curry"
              value={this.state.text}
            />
            <View
              style={{
                paddingTop: 20,
                paddingBottom: 15,
                alignItems: 'center',
                marginHorizontal: 50,
              }}
            >
              <Button
                onPress={this.findPlayer}
                title="Set Player"
                color="#90A4AE"
              />
            </View>
          </View>
        </ScrollView>
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
