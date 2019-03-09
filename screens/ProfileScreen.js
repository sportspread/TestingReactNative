import React from "react";
import { ThemeProvider } from "react-native-elements";
import { Platform, ScrollView, StyleSheet, View, Picker } from "react-native";
import {
  Image,
  Text,
  Card,
  Button,
  Avatar,
  SocialIcon
} from "react-native-elements";
import data from "../constants/dopestatz";
import { WebBrowser } from "expo";
import { MonoText } from "../components/StyledText";
import { TopMatch } from "../components/TopMatch.js";
import { OtherGames } from "../components/OtherGames.js";
import { NBATeams, NBALogos } from "../teamsAlphabetical";

export default class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      favTeam: ""
    };
  }

  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Card style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row" }}>
              <Avatar
                rounded
                title="xlarge"
                showEditButton
                source={{
                  uri:
                    "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/bulls.png"
                }}
              />
              <Text h3 style={{ paddingLeft: 50 }}>
                Chicago Bulls
              </Text>
            </View>
          </Card>
          <Card>
            <Text h6> Share To:</Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <SocialIcon type="twitter" />
              <SocialIcon type="facebook" />
              <SocialIcon type="instagram" />
            </View>
          </Card>
          <Card>
            <Text h6> Favorite Team:</Text>
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
          </Card>
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
