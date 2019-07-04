import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { I18nManager } from 'react-native';
import { Header } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';
import { Welcome } from './src/screens/welcome';
import Management from './src/screens/management';
import localization from './src/localization/localization';
import Home from './src/screens/Home';
import Root from './src/screens/index';
import InternetConnection from './src/helpers/internetConnection';
// import firebase from "react-native-firebase";

import { LocalStorage } from './src/helpers/localStorage';

class App extends Component {
  constructor(props) {
    super(props);
    const lang = new LocalStorage().getLang().then(res => {
      if (res == '"rtl"') {
        I18nManager.forceRTL(true);
        localization.setLanguage('ar');
      } else {
        I18nManager.forceRTL(false);
        localization.setLanguage('en');
      }
      this.setState({});
      this.forceUpdate();
    });

    // if (Platform.OS == 'android')

    //   I18nManager.forceRTL(true);
    // if (Platform.OS == 'ios') {
    //   I18nManager.forceRTL(true);

    // }
    // localization.setLanguage('ar');
    new InternetConnection();
  }

  async componentDidMount() {
    SplashScreen.hide();
    new LocalStorage().getLoginUser();
  }

  componentWillUnmount() {
    // this.messageListener();
  }

  render() {
    return <Root />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    flexWrap: 'wrap',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};
export default codePush(codePushOptions)(App);
