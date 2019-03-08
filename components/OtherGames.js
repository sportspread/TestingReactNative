import React from "react";
import { View } from "react-native";
import { WebBrowser } from "expo";
import { Card, Text } from "react-native-elements";

export const OtherGames = props => {
  return (
    <View>
      <Card>
        <Text>
          {" "}
          {props.otherGame !== undefined
            ? `${props.otherGame.teams[0]} vs ${props.otherGame.teams[1]}`
            : "No Games Found"}{" "}
        </Text>
      </Card>
    </View>
  );
};

export default OtherGames;
