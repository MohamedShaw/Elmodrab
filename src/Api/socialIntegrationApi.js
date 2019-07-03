class Api {
   // add_updateSocialUrl = "http://modarrebarabi.sailaway-eg.com/api/socials/user/6";
    createSocialUrl="http://almodarrebalarabi.com/api/socials/user/"
    socialFormData;
    async Add_UpdateSocialIntegration(socialData) {
        this.socialFormData = new FormData();
        console.log('socialD',socialData)
        this.socialFormData.append(`socials[${socialData.letter}]`, `'${socialData.url}'`);
        const response = await fetch(
            this.createSocialUrl+socialData.id
            , {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + socialData.token
                },
                body: this.socialFormData

            });
        const data = await response.json();

        console.log(data);

        return data;
    }
}
export default api = new Api();