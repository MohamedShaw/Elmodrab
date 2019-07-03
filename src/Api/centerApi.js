GetAllurl = "http://almodarrebalarabi.com/api/persons/centers";
async function getAllCentersFromApi() {
    var response = await fetch(GetAllurl);
    const data = await response.json();
    console.log(data);
    return data;
}
PostCenterUrl = "http://almodarrebalarabi.com/api/register/center";
async function RegisterCenter(newCenter) {
   // debugger;
    var tempbody = new FormData();

//     name: sss
// _token: TJUFhf4CIMC0LTUpFJGjEeF3U09lA2LbazjdqIwX
// manager: ssss
// establishment_year: 2000
// country_id: 64
// city_id: 14994
// fields[]: www
// fields[]: ddkdkd
// fields[]: jjjjjj
// fields[]: jhhjhhhj
// fields[]: hhhjhjhj
// fields[]: hhjhjhh
// card: jkjkjjkjkkjjkjk
// email: testjjsjksksjksjssjk@gmail.com
// prefix: 1
// phone: 855588555775
// password: 123456
// confirmPassword: 123456
// terms: on
    tempbody.append("name", newCenter.name);
    tempbody.append("manager", newCenter.manager);
    tempbody.append("establishment_year", newCenter.establishment);
    tempbody.append("country_id", newCenter.country_id);
    tempbody.append("city_id", newCenter.city_id);
    tempbody.append("fields[]", newCenter.courses1);
    tempbody.append("fields[]", newCenter.courses2);
    tempbody.append("fields[]", newCenter.courses3);
    tempbody.append("fields[]", newCenter.courses4);
    tempbody.append("fields[]", newCenter.courses5);
    tempbody.append("fields[]", newCenter.courses6);
    tempbody.append("card", newCenter.professional_card);
    tempbody.append("email", newCenter.email);
    tempbody.append("prefix", newCenter.prefix); //change prefix
    tempbody.append("phone", newCenter.phone);
    tempbody.append("password", newCenter.password);
    tempbody.append("confirmPassword", newCenter.confirmPassword);


    if (newCenter.image) {
        tempbody.append("image", {
            uri: newCenter.image,
            type: 'image/jpg',
            name: 'image.jpg',
        });
    }
    tempbody.append("gcm",newCenter.fcmToken);




    console.log(tempbody);


    var response = await fetch(PostCenterUrl, {
        method: 'POST',


        body: tempbody
    });
   // debugger;
    const data = await response.json();
   // debugger;
    console.log(data);
    return data;
}
export const Api = {
    getAllCentersFromApi,
    RegisterCenter
}