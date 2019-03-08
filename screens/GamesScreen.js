export default class GamesScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      bestGame: {},
      otherGames: []
    };
  }

  static navigationOptions = {
    header: null
  };

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
  // getGames() {
  //   let teamsAndSpreads = data.events.map(event => {
  //     return {
  //       teams: event.teams.map(team => {
  //         return team.name;
  //       }),
  //       spread:
  //         event.lines[1].spread.point_spread_home > 0
  //           ? event.lines[1].spread.point_spread_home
  //           : event.lines[1].spread.point_spread_home * -1
  //     };
  //   });
  //   let length = teamsAndSpreads.length;
  //   for (let i = 0; i < length; i++) {
  //     for (let j = 0; j < length - i - 1; j++) {
  //       if (teamsAndSpreads[j].spread > teamsAndSpreads[j + 1].spread) {
  //         let temp = teamsAndSpreads[j];
  //         teamsAndSpreads[j] = teamsAndSpreads[j + 1];
  //         teamsAndSpreads[j + 1] = temp;
  //       }
  //     }
  //   }
  //   this.setState({
  //     bestGame: teamsAndSpreads[0],
  //     otherGames: [teamsAndSpreads[0]]
  //   });
  //   return teamsAndSpreads[0];
  // }
  // componentWillMount() {
  //   this.getGames();
  // }

  render() {
    return (
      <ThemeProvider>
        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <TopMatch bestGame={this.state.bestGame} />
            {this.state.otherGames.map(game => {
              return <OtherGames key={game.teams[0]} otherGame={game} />;
            })}
          </ScrollView>

          <View style={styles.tabBarInfoContainer}>
            {/* <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text> */}

            {/* <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          /> */}
          </View>
        </View>
      </ThemeProvider>
    );
  }
}
