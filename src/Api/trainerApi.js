GetAllTrainersurl="http://almodarrebalarabi.com/api/persons/trainers";
async function getAllTrainersFromApi(){
    var response=await fetch(GetAllTrainersurl);
    const data=await response.json();
   // debugger;
    console.log(data);
    return data;
}
//PostTrainerUrl="http://modarrebarabi.sailaway-eg.com/api/register/trainer";
//PostTrainerNewUrl="http://modarrebarabi.sailaway-eg.com/api/register/trainer";
async function RegisterTrainer(newTrainer){
    console.log('newTrainer',newTrainer)
const PostTrainerNewUrl="http://almodarrebalarabi.com/api/register/trainer";

    let tempbody=new FormData();
   
    tempbody.append("name",newTrainer.name);
    tempbody.append("sex",newTrainer.sex);
    tempbody.append("email",newTrainer.email);
    tempbody.append("phone",newTrainer.phone);
    tempbody.append("password",newTrainer.password);
    tempbody.append("confirmPassword",newTrainer.confirmPassword);
    if(newTrainer.image){
    tempbody.append("image", {
        uri:newTrainer.image,
        type: 'image/jpg',
        name: 'image.jpg',
      });
    }
    tempbody.append("credit",newTrainer.credit);
    tempbody.append("role_id",newTrainer.role_id);
    tempbody.append("character",newTrainer.role_id);
    tempbody.append("field",newTrainer.trainer_field);
    tempbody.append("courses[0]",newTrainer.courses1);
    tempbody.append("courses[1]",newTrainer.courses2);
    tempbody.append("courses[2]",newTrainer.courses3);
    tempbody.append("card",newTrainer.professional_card);
    tempbody.append("prefix",newTrainer.prefix); //change prefix
    tempbody.append("country_id",newTrainer.country_id);
    tempbody.append("city_id",newTrainer.city_id);
    tempbody.append("nationality_id",newTrainer.nationality_id);
    // tempbody.append("gcm",newTrainer.fcmToken);
    return await fetch(PostTrainerNewUrl,{
        method: 'POST',
        body:tempbody
    }).then(res=>{return res.json()}).catch(er=>{console.log('Catch',er);return er})
    // const data=await response.json();
  
    // return data;
}
export const Api={
    getAllTrainersFromApi,
    RegisterTrainer
}