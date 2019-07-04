import React, { Component } from 'react';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import PersonalInfo from './personalInfo';
import Welcome from './welcome';
import Home from './Home';
import Profile from './profile';
import SocialMedia from './socialMedia';
import ResetPassword from './resetPassword';
import Consultant from './Categories/mostsharen';
import TabsList from './Categories/Tabs';
// import Search from '../screens/Categories/search'
import JobCard from './jobCard';
import SideDrawer from './Drawer';
import Management from './management';
import Policy from './policy';
import AddAds from './Ads/AddAds';
import Register from './Registration/Register';
import RegisterTrainer from './Registration/RegisterTrainer';
import RegisterCenter from './Registration/RegisterCenter';
import SplashScreen from './splashScreen';
import RegistrationSuccess from './Registration/RegsitrationSuccess';
import Trainers from './Categories/trainers';
import { Language } from './language';
import { ProfilePage } from './Profile/profile';
import Search from './search';
import SearchResults from './searchResults';
import CenterDetails from './Categories/CenterDetails';
import TrainerDetails from './Categories/trainerDetails';
import VisitorRegistrationSuccess from './Registration/VisitorRegistrationSuccess';
import VisitorComponentForm from './Registration/registerVisitorForm';
import { Statistics } from './statistics';

const stack = createStackNavigator(
  {
    splashScreen: { screen: SplashScreen },

    Home: { screen: Home },

    registerCenter: { screen: RegisterCenter },

    policy: { screen: Policy },

    search: { screen: Search },
    TrainerDetails: { screen: TrainerDetails },
    CenterDetails: { screen: CenterDetails },
    register: { screen: Register },
    registerForm: { screen: VisitorComponentForm },
    registerTrainer: { screen: RegisterTrainer },
    Welcome: { screen: Welcome },
    Consultant: { screen: Consultant },
    trainers: { screen: Trainers },
    SearchResults: { screen: SearchResults },
    Language: { screen: Language },
    resetPassword: { screen: ResetPassword },
    PersonalInfo: { screen: PersonalInfo },
    jobCard: { screen: JobCard },
    SocialMedia: { screen: SocialMedia },
    Tabs: { screen: TabsList },
    profile: { screen: Profile },
    policy: { screen: Policy },
    ads: { screen: AddAds },
    RegistrationSuccess: { screen: RegistrationSuccess },
    profilePage: { screen: ProfilePage },

    visitorSuccess: { screen: VisitorRegistrationSuccess },
    statistics: { screen: Statistics },
  },
  {
    headerMode: 'none',
  },
);
export default (Root = createDrawerNavigator(
  {
    stack: { screen: stack },
  },
  {
    initialRouteName: 'stack',

    contentComponent: props => <SideDrawer {...props} />,
  },
));
// export default createAppContainer(Root)
