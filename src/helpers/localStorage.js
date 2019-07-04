import { AsyncStorage } from 'react-native';

export class LocalStorage {
  static user;

  static token;

  async changeLang(lang) {
    await AsyncStorage.setItem('lang', JSON.stringify(lang)).then(() => true);
  }

  async getLang() {
    const lang = await AsyncStorage.getItem('lang');
    if (lang) {
      return lang;
    }
    return 'ltr';
  }

  async setLoginUser(userData) {
    // debugger;
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    LocalStorage.user = userData;
  }

  async getLoginUser() {
    const Userstored = await AsyncStorage.getItem('user');
    if (Userstored) {
      LocalStorage.user = JSON.parse(Userstored);
    } else {
      LocalStorage.user = null;
    }
  }

  async setUserSocial(key, value) {
    // debugger;
    await AsyncStorage.setItem(key, value.toString());
  }

  async getUserSocial(key) {
    return await AsyncStorage.getItem(key);
  }

  async setVisits(visitData) {
    await AsyncStorage.setItem('visit', JSON.stringify(visitData));
  }

  async logout() {
    await AsyncStorage.removeItem('user');
    LocalStorage.user = null;
  }

  async getVisits() {
    const visits = await AsyncStorage.getItem('visit');
    const visitObj = JSON.parse(visits);
    // debugger;
    if (visitObj) return visitObj.num;

    return -1;
  }

  async saveNotification(notification) {
    await AsyncStorage.setItem('notification', notification);
    LocalStorage.token = notification;
  }

  async getNotification() {
    const notificationJson = await AsyncStorage.getItem('notification');
    if (notificationJson) return notificationJson;
    return null;
  }
}
