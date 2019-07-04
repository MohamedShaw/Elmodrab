import Axios from 'axios';
import qs from 'qs';
import { post } from './URLENCODE';

const getFormBody = async obj => Object.keys(obj).map(key =>
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    ).join('&');;
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
};;
export class Api {
  formData;

  loginUrl = 'http://almodarrebalarabi.com/api/login';

  registerUrl = 'http://almodarrebalarabi.com/api/register/user';

  logoutUrl = 'http://almodarrebalarabi.com/api/logout';

  async visitorLogin(visitorData) {
    // debugger;
    try {
      this.formData = new FormData();
      this.formData.append('email', visitorData.email);
      this.formData.append('password', visitorData.password);
      console.log(this.formData);;
      let response = await fetch(this.loginUrl, {
        method: 'POST',
        body: this.formData,
      });;
      console.log(response);

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        status: false,
        msg: 'username or password is incorrect.',
        data: {
          errors: {
            auth: ['username or password is incorrect. '],
          },
        },
      };;
    }
    // debugger;
  }

  async visitorRegister(visitorData) {
    let d = {
      nationality_id: visitorData.nationality,
      name: visitorData.name,
      // 'email': visitorData.email,
      prefix: visitorData.prefix,
      phone: visitorData.phone,
      password: visitorData.password,
      confirmPassword: visitorData.confirmPassword,
      country_id: visitorData.countryID,
      city_id: visitorData.cityID,
      terms: 'on',
    };;
    // let ddd="nationality_id=108&country_id=64&city_id=14994&email=ebrahimhassjan000%40gmail.com&prefix=20&password=123456789&confirmPassword=123456789&name=sss&phone=127726640";+
    console.log(visitorData);;
    return (response = await fetch(this.registerUrl, {
      method: 'POST',
      cache: 'reload',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Cache-Control': 'no-cache',
      },
      body: visitorData,
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .catch(err => {
        console.log(err);
        return {
          status: false,
          msg: 'There is  Some!!!',
          data: { errors: { behaviour: ['[Some thing went Wrong.'] } },;
        };
      }));
  }

  async logout(userData) {
    // alert(userData.token);
    const response = await fetch(this.logoutUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userData.token,
      },
    });;
    const data = await response.json();

    return data;
  }
}
