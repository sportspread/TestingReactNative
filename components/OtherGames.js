import React from "react";
import { View } from "react-native";
import { WebBrowser } from "expo";
import { Card, Text, Image } from "react-native-elements";
import { NBATeams, NBALogos } from "../teamsAlphabetical.js";
export const OtherGames = props => {
  // console.log("OTHER GAME SPREAD OTHER GAMES", props.otherGame.spread);
  // let style;
  // if (Number(props.bestGame.spread) < Number(props.otherGame.spread) <= 4) {
  //   style = "#e8eaed";
  // } else if (4.5 < Number(props.otherGame.spread) < 8.5) {
  //   style = "#a6a8ad";
  // } else if (Number(props.otherGame.spread) > 8.5) {
  //   style = "#88898c";
  // }

  let home;
  let away;
  if (props.bestGame.teams[0].isAway === true) {
    away = props.otherGame.teams[0];
    home = props.otherGame.teams[1];
  } else {
    away = props.otherGame.teams[1];
    home = props.otherGame.teams[0];
  }
  const homeImage = NBALogos[NBATeams.indexOf(home.name)];
  const awayImage = NBALogos[NBATeams.indexOf(away.name)];

  return (
    <Card style={{ backgroundColor: "#4286f4" }}>
      {props.bestGame !== undefined && props.bestGame.teams.length !== 0 ? (
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <View>
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
                paddingLeft: 100
              }}
              source={{
                uri: awayImage
              }}
            />
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text h3> @ </Text>
          </View>
          <View>
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
                paddingRight: 100
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
  );
};

export default OtherGames;

//Shades of gray (Light -> Dark (Best -> Worst))
// TopGame

// Tier 2
// TopGame.spread < props.otherGame.spread <= 4.5

// Tier 3
// 4.5 < props.otherGame.spread <= 8.5

// Tier 4
// props.otherGame.spread > 8.5

// style
//  if( bestGame.spread < game.spread <= 4 ){
// style = {light gray}
//}
//if (4.5 < game.spread < 8.5){
//  style = {medium gray}
// }
// if(game.spread > 8.5){
//                    style = {dark gray}
// }
// .then ( <Text style={`${style}})
