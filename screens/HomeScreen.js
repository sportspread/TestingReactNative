import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { WebBrowser } from "expo";
import { MonoText } from "../components/StyledText";
import data from "../constants/dopestatz";
import { Kyleskey, SamsKey } from "../secrets.js";
export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      ball: []
    };
    // this.loadGames = this.loadGames.bind(this)
    this.getGames = this.getGames.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  // Kyles Key = cca1dc9064mshca4afa3c2a7c913p1ee48djsn3e71d9a9afa8
  // Sams Key = eb3aa29c30mshe3fcb151bf70b80p1d39ccjsn13eb2939026b

  componentWillMount() {
    fetch(
      "https://therundown-therundown-v1.p.rapidapi.com/sports/4/events?include=scores+or+teams+or+all_periods",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "cca1dc9064mshca4afa3c2a7c913p1ee48djsn3e71d9a9afa8"
        }
      }
    )
      .then(res => {
        return res.json();
      })
      .then(resJSON => {
        this.setState({ ball: resJSON.events });
      });
  }

  getGames() {
    console.log(this.state);
    const gameData = this.state.ball;
    let teamsAndSpreads = gameData.map(event => {
      return {
        teams: event.teams.map(team => {
          return team.name;
        }),
        spread:
          event.lines[1].spread.point_spread_home > 0
            ? event.lines[1].spread.point_spread_home
            : event.lines[1].spread.point_spread_home * -1
      };
    });
    let length = teamsAndSpreads.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (teamsAndSpreads[j].spread > teamsAndSpreads[j + 1].spread) {
          let temp = teamsAndSpreads[j];
          teamsAndSpreads[j] = teamsAndSpreads[j + 1];
          teamsAndSpreads[j + 1] = temp;
        }
      }
      console.log(teamsAndSpreads[0]);
      return teamsAndSpreads[0];
    }
  }

  render() {
    console.log("this.state.ball", this.state.ball);
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {/* <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/robot-dev.png")
                  : require("../assets/images/robot-prod.png")
              }
              style={styles.welcomeImage}
            />
          </View> */}
          <View>
            <Text style={styles.teams}>
              {this.state.bestGame !== undefined
                ? `Team A:${this.state.bestGame.teams[0]} Team B: ${
                    this.state.bestGame.teams[1]
                  }`
                : "No Games Found"}
            </Text>
          </View>
          <View style={styles.getStartedContainer}>
            {/* {this._maybeRenderDevelopmentModeWarning()} */}

            <Text style={styles.getStartedText}>{this.state.test}</Text>

            {/* <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            >
              <MonoText style={styles.codeHighlightText}>
                screens/HomeScreen.js
              </MonoText>
            </View> */}

            <Text style={styles.getStartedText}>
              Press this button to see todays top games!
            </Text>
            {/* <Button title="LOADGAMES" onPress={this.loadGames} /> */}

            <Button title="GETGAMES" onPress={this.getGames} />
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity
              onPress={this._handleHelpPress}
              style={styles.helpLink}
            >
              <Text style={styles.helpLinkText}>
                Help, it didn’t automatically reload!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          {/* <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text> */}

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
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
