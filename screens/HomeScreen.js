import React from "react";
import { Platform, ScrollView, StyleSheet, View, Picker } from "react-native";
import { Image, Text, Card, Button } from "react-native-elements";
import { WebBrowser } from "expo";
import { MonoText } from "../components/StyledText";
import data from "../constants/dopestatz";
import { KylesKey, SamsKey } from "../secrets.js";
import OtherGames from "../components/OtherGames";
import TopMatch from "../components/TopMatch.js";
import { NBATeams, NBALogos } from "../teamsAlphabetical";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allGamesData: [],
      bestGame: [],
      otherGames: [],
      favTeam: ""
    };
    // this.loadGames = this.loadGames.bind(this)
    this.getGames = this.getGames.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    /* 
  Below here is for using our API call

  DO NOT DELETE
  */

    // fetch(
    //   "https://therundown-therundown-v1.p.rapidapi.com/sports/4/events?include=scores+or+teams+or+all_periods",
    //   {
    //     method: "GET",
    //     headers: {
    //       "X-RapidAPI-Key": SamsKey
    //     }
    //   }
    // )
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(resJSON => {
    //     let today = new Date();
    //     let tomorrow = new Date();
    //     tomorrow.setDate(today.getDate() + 1);
    //     let filtered = resJSON.events.filter(event => {
    //       return (
    //         Date.parse(event.event_date.slice(0, 10)) < Date.parse(tomorrow)
    //       );
    //     });
    //     //Won't allow you to setState on an unmounted component. Will need to store this data in a constant and then calll setState on componentDidMount
    //     return filtered;
    //   })
    //   .then(filtered => {
    //     this.setState({ allGamesData: filtered });
    //   });

    /* 
  Below here is for testing using dummy data

  DO NOT DELETE

  dOnT TeLl Me WhAt To Do
  */

    this.setState({ allGamesData: data.events });
  }

  bubbleSort(arr) {
    let length = arr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < length; i++) {
        if (arr[i + 1] === undefined) break;
        if (arr[i].spread > arr[i + 1].spread) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    return arr;
  }

  getGames() {
    const { allGamesData, favTeam } = this.state;
    let teamsAndSpreads = allGamesData.map(event => {
      return {
        teams: event.teams.map(team => {
          return {
            name: team.name,
            isAway: team.is_away,
            isHome: team.is_home
          };
        }),
        spread:
          event.lines[1].spread.point_spread_home > 0
            ? event.lines[1].spread.point_spread_home
            : event.lines[1].spread.point_spread_home * -1
      };
    });

    if (favTeam) {
      teamsAndSpreads.forEach(game => {
        game.teams.forEach(team => {
          if (team.name === favTeam) {
            game.spread = game.spread - game.spread * 0.33;
          }
        });
      });
    }

    let sorted = this.bubbleSort(teamsAndSpreads);
    this.setState({
      bestGame: sorted.shift(),
      otherGames: [...sorted]
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {this.state.bestGame === {} ? (
            ""
          ) : (
            <View>
              {this.state.bestGame.teams !== undefined &&
              this.state.bestGame.teams.length !== 0 ? (
                <TopMatch bestGame={this.state.bestGame} />
              ) : (
                <Card>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                  >
                    <Text h>No Games Found</Text>
                  </View>
                </Card>
              )}
              {this.state.bestGame.teams === undefined ? (
                <Text />
              ) : (
                <View style={{ paddingLeft: 75 }}>
                  <Text h3 style={{ fontWeight: "bold" }}>
                    Other Games :
                  </Text>
                </View>
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
                    );
                  })
                ) : (
                  <Text />
                )}
              </View>
            </View>
          )}
          <View style={styles.getStartedContainer}>
            <Button title="Load Games" onPress={this.getGames} />
          </View>

          <View>
            <Text style={styles.getStartedText}>
              If you select a team from the options below, it will weigh your
              favorite team more heavily in the results.
            </Text>
          </View>

          <Picker
            selectedValue={this.state.favTeam}
            onValueChange={teamName => {
              this.setState({ favTeam: teamName });
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
              );
            })}
          </Picker>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  teams: {
    fontSize: 25,
    fontWeight: "bold"
  }
});
