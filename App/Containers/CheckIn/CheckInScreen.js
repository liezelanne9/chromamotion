import React from 'react'
import { Platform, Text, View, ScrollView, RefreshControl, Button, ActivityIndicator, TouchableOpacity,Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import CheckInActions from 'App/Stores/CheckIn/Actions'
import Style from './CheckInScreenStyle'
import Colors from 'App/Theme/Colors'
import { Images } from 'App/Theme'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import moment from 'moment'
/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake checkIn.
 * Feel free to remove it.
 */
//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu.',
//   android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu.',
// })

class CheckInScreen extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    // Run the startup saga when the application is starting
    this.props.listCheckIns()
  }

  renderCheckInList = (checkIns) => {
    if(checkIns.length == 0){
      return(
        <>
          <Text style={Style.text}>To get started, record how you are feeling.</Text>
        </>
      )
    } else {
      let checkInElements = checkIns.sort((a,b) => {
        return moment(b.createdAt).format('X')-moment(a.createdAt).format('X')
      }).map((checkIn, index) => {
        let colorArray = [];
        if(checkIn.emotions != null){
          colorArray = checkIn.emotions.emotions.filter((emotion) => {
            return emotion.selected ? emotion : null;
          }).map((emotion) => {
            return emotion.color
          });
          const time = moment(checkIn.createdAt || moment.now()).fromNow();
          return (
            <TouchableOpacity key={checkIn.id || index} onPress={() => { this.viewCheckIn(checkIn.objectId)}}>
              <LinearGradient colors={colorArray} start={{x: 0, y: 0}} end={{x: 1, y: 0}} >
                <View style={Style.checkInBar}>
                  <Text style={Style.title}>{time}</Text>
                  <Text style={Style.text} toNow>{colorArray.length} feelings</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )
        } else {
          return (
            <TouchableOpacity key={checkIn.id || index}>
              <Text style={Style.text}>Create a new Check In</Text>
            </TouchableOpacity>
          )
        }
      })

      return (
        <>
          {checkInElements}
        </>
      )
    }
  }

  viewCheckIn = (checkInId) => {
    this.props.fetchCheckIn(checkInId)
    this.props.navigation.navigate('ViewCheckIn')
  }

  render() {
    let defaultColorArray = ['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']
    const { checkIns, checkInIsLoading, checkInErrorMessage} = this.props;
    return (
      <View style={Style.container}>
        <View style={Style.headerContainer}>
          <Text style={Style.headerTitle}>{checkIns.length} Check-Ins</Text>
          <TouchableOpacity style={Style.headerTitle} onPress={() => this.props.navigation.navigate('EmotionsScreen')}>
            <Text style={Style.headerButton}>+</Text>
          </TouchableOpacity>
        </View>
        {checkInIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.props.checkInIsLoading}
                onRefresh={this.props.listCheckIns}
              />
            }>
            {checkInErrorMessage ? (
              <View>
                <Text style={Style.error}>{checkInErrorMessage}</Text>
              </View>
            ) : (
              <View>
                {this.renderCheckInList(checkIns)}
              </View>
            )}
          </ScrollView>

        )}
        <View style={Style.buttonContainer}>
            <Button
              onPress={() => this.props.navigation.navigate('UserScreen')}
              style={Style.signUpLoginButton}
              title="Sign Up or Log In"
            />
        </View>
      </View>
    )
  }
}

CheckInScreen.propTypes = {
  checkIns: PropTypes.array,
  checkInIsLoading: PropTypes.bool,
  checkInErrorMessage: PropTypes.string,
  fetchCheckIn: PropTypes.func,
  listCheckIns: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    checkIns: state.checkIn.checkIns,
    checkInIsLoading: state.checkIn.checkInIsLoading,
    checkInErrorMessage: state.checkIn.checkInErrorMessage,
  }
}

const mapDispatchToProps = (dispatch) => ({
  listCheckIns: () => dispatch(CheckInActions.listCheckIns()),
  fetchCheckIn: (checkInId) => dispatch(CheckInActions.fetchCheckIn(checkInId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckInScreen)