import React from 'react'
import { Platform, Text, View, Button, ActivityIndicator, TextInput, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import UserActions from 'App/Stores/User/Actions'
import Style from './UserScreenStyle'
import { Images } from 'App/Theme'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Parse from 'parse/react-native'

class UserScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <View style={Style.container}>
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <Text style={Style.title}>Sign Up</Text>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
            <Button onPress={this.props.fetchUser} title="Sign In" />
          </View>
        )}
      </View>
    )
  }
}

UserScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.user,
  userIsLoading: state.userIsLoading,
  userErrorMessage: state.userErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(UserActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScreen)
