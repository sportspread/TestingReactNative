import React from "react";
import { View } from "react-native";
import { WebBrowser } from "expo";
import { Text, Card } from "react-native-elements";
import { MonoText } from "../components/StyledText";
import data from "../constants/dopestatz";

const remote = "https://s15.postimg.org/tw2qkvmcb/400px.png";

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
  return (
    <View>
      <Card>
        {/* <BackgroundImage /> */}
        <Text> Tonight's Top Game is:</Text>
        <Text>
          {props.bestGame !== undefined
            ? `${away.name} @ ${home.name}`
            : "No Games Found"}
        </Text>
      </Card>
    </View>
  );
};

export default TopMatch;
