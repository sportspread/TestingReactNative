import React from 'react'
import { View } from 'react-native'
import { Card, Text, Image } from 'react-native-elements'
import { NBATeams, NBALogos } from '../teamsAlphabetical.js'
import FadeInView from '../screens/FadeInView'
export const OtherGames = props => {
  let home
  let away
  if (props.bestGame.teams[0].isAway === true) {
    away = props.otherGame.teams[0]
    home = props.otherGame.teams[1]
  } else {
    away = props.otherGame.teams[1]
    home = props.otherGame.teams[0]
  }
  const homeImage = NBALogos[NBATeams.indexOf(home.name)]
  const awayImage = NBALogos[NBATeams.indexOf(away.name)]

  return (
    <Card>
      {props.bestGame !== undefined && props.bestGame.teams.length !== 0 ? (
        <FadeInView
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
        >
          <View>
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                paddingLeft: 100,
              }}
              source={{
                uri: awayImage,
              }}
            />
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text h3> @ </Text>
          </View>
          <View>
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                paddingRight: 100,
              }}
              source={{
                uri: homeImage,
              }}
            />
          </View>
        </FadeInView>
      ) : (
        <Text>"No Games Found"</Text>
      )}
    </Card>
  )
}

export default OtherGames
