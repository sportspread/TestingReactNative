import React from "react";
import { View } from "react-native";
import { WebBrowser } from "expo";
import { Text, Card, Image } from "react-native-elements";
import { MonoText } from "../components/StyledText";
import data from "../constants/dopestatz";
import { NBATeams, NBALogos } from "../teamsAlphabetical.js";

export const TopMatch = props => {
  let home;
  let away;
  if (props.bestGame.teams[0].isAway === true) {
    away = props.bestGame.teams[0];
    home = props.bestGame.teams[1];
  } else {
    away = props.bestGame.teams[1];
    home = props.bestGame.teams[0];
  }
  const homeImage = NBALogos[NBATeams.indexOf(home.name)];
  const awayImage = NBALogos[NBATeams.indexOf(away.name)];
  return (
    <View>
      <Text h3 style={{ fontWeight: "bold", paddingLeft: 10 }}>
        {" "}
        Tonight's Top Game:
      </Text>
      <Card>
        {props.bestGame !== undefined && props.bestGame.teams.length !== 0 ? (
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <View>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain"
                }}
                source={{
                  uri: awayImage
                }}
              />
            </View>
            <View>
              <Text h1> @ </Text>
            </View>
            <View>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                  paddingLeft: 100
                }}
                source={{
                  uri: homeImage
                }}
              />
            </View>
          </View>
        ) : (
          <Text>"No Games Found"</Text>
        )}
      </Card>
    </View>
  );
};

export default TopMatch;
