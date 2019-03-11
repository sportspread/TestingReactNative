import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Picker,
  TextInput,
} from 'react-native'
import {
  Image,
  Text,
  Card,
  Button,
  Avatar,
  SocialIcon,
} from 'react-native-elements'
import ActionSheet from 'react-native-actionsheet'
import { NBATeams, NBALogos } from '../teamsAlphabetical'
const NBA = require('nba')

export default class ProfileScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      favTeam: 'Tap Me!',
      image: '',
      favPlayer: 'Search Players Below',
      text: '',
    }
    this.findPlayer = this.findPlayer.bind(this)
  }

  static navigationOptions = {
    header: null,
  }
  showActionSheet = () => {
    this.ActionSheet.show()
  }

  findPlayer() {
    let sanitizedPlayer = this.state.text.toLowerCase().trim()
    const player = NBA.findPlayer(sanitizedPlayer)
    if (player !== undefined) {
      this.setState({
        favPlayer: player.fullName,
      })
    } else {
      this.setState({
        text: 'Please Enter a Valid Player Name',
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Card style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row' }}>
              <Avatar
                rounded
                title="xlarge"
                showEditButton
                source={{
                  uri:
                    'http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/bulls.png',
                }}
              />
              <Text h3 style={{ paddingLeft: 50 }}>
                Chicago Bulls
              </Text>
            </View>
          </Card>
          <Card>
            <Text h6> Share To:</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <SocialIcon type="twitter" />
              <SocialIcon type="facebook" />
              <SocialIcon type="instagram" />
            </View>
          </Card>
          <Card>
            {Platform.OS === 'android' ? (
              <View>
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
              </View>
            ) : (
              <View>
                <Text h6 style={{ alignContent: 'center' }}>
                  {' '}
                  Favorite Team: {this.state.favTeam}{' '}
                </Text>

                <Text onPress={this.showActionSheet} />
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
                      image: NBALogos[index],
                    })
                  }}
                />
              </View>
            )}
          </Card>

          <Card>
            <View>
              <Text h6> Favorite Player: {this.state.favPlayer} </Text>
            </View>
          </Card>
          <View
            style={[
              {
                width: '90%',
                paddingLeft: 10,
                margin: 10,
              },
            ]}
          >
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
              }}
              onChangeText={text => {
                this.setState({ text: text })
              }}
              placeholder="Use official names. Ex. Stephen Curry"
              value={this.state.text}
            />
            <Button
              onPress={this.findPlayer}
              title="Set Player"
              color="#90A4AE"
            />
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
