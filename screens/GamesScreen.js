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
import styles from "./styles.js";

export default class GamesScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      bestGame: {}
    };
  }

  static navigationOptions = {
    header: null
  };

  getGames() {
    let teamsAndSpreads = data.events.map(event => {
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
    }
    console.log(teamsAndSpreads[0]);
    this.setState({
      bestGame: teamsAndSpreads[0]
    });
    return teamsAndSpreads[0];
  }
  componentWillMount() {
    this.getGames();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View>
            <Text style={styles.teams}>
              Tonight's top Game is:
              {this.state.bestGame !== undefined
                ? `Team A:${this.state.bestGame.teams[0]} Team B: ${
                    this.state.bestGame.teams[1]
                  }`
                : "No Games Found"}
            </Text>
          </View>
          {/* <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
              Press this button to see todays top games!
            </Text>
            <Button title="BUTTONTIME" onPress={this.getGames} />
          </View> */}

          {/* <View style={styles.helpContainer}>
            <TouchableOpacity
              onPress={this._handleHelpPress}
              style={styles.helpLink}
            >
              <Text style={styles.helpLinkText}>
                Help, it didn’t automatically reload!
              </Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          {/* <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text> */}

          {/* <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          /> */}
        </View>
      </View>
    );
  }
}
