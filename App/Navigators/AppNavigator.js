import { createAppContainer, createStackNavigator } from 'react-navigation'

import EmotionsScreen from 'App/Containers/Emotions/EmotionsScreen'
import CheckInScreen from 'App/Containers/CheckIn/CheckInScreen'
import ViewCheckInScreen from 'App/Containers/CheckIn/ViewCheckInScreen'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    SplashScreen: SplashScreen,
    // The main application screen is our "CheckInScreen". Feel free to replace it with your
    // own screen and remove the example.
    MainScreen: CheckInScreen,
    ViewCheckIn: ViewCheckInScreen,
    EmotionsScreen: EmotionsScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
  }
)

export default createAppContainer(StackNavigator)
