import { View, StyleSheet,I18nManager } from "react-native";
import React, { Component } from 'react';
import { Container, Content } from "native-base";
import { Colors } from "../assets/colors";
import { CustomButton } from "../Ui/customButon";
import localization from "../localization/localization";
import { HeaderWithoutButtons } from "../Ui/headerWithoutButtons";
import Toast,{DURATION } from "react-native-easy-toast";
import { LocalStorage } from '../helpers/localStorage';
import RNRestart from 'react-native-restart'; // Import package from node modules

export class Language extends Component {
    setLanguage(language) {
        localization.setLanguage(language);

        this.refs.toast.show(localization.languageSettings);
        this.forceUpdate();
    }
    render() {
        return (
            <Container style={styles.container}>
                <HeaderWithoutButtons page='Home' navigation={this.props.navigation} />
                <Content contentContainerStyle={styles.content}>
                    <View style={styles.buttonsContainer}>

                        <CustomButton style={{ backgroundColor: Colors.orange }} onPress={
                            () =>{
                                I18nManager.forceRTL(true);
                                localization.setLanguage('ar');
                                 this.setLanguage('ar');
                            new LocalStorage().changeLang('rtl').then(()=>RNRestart.Restart() );

                        }
                        } text={localization.arabic} />
                        <CustomButton
                            style={{ backgroundColor: Colors.orange }}
                            onPress={() => {
                                I18nManager.forceRTL(false);
                                this.setLanguage('en');
                                new LocalStorage().changeLang('ltr').then(()=>RNRestart.Restart() );
                        }}
                            text={localization.english}
                        />
                    </View>

                    <Toast
                        ref="toast"
                        position='bottom'
                        positionValue={200}
                        fadeInDuration={750}
                        fadeOutDuration={2000}
                        // opacity={0.8}
                        textStyle={{ color: 'white' }}
                    />

                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.lightBlue
    },
    content: {
        flex: 1, backgroundColor: Colors.lightBlue, justifyContent: 'center'
    },
    buttonsContainer: {
        flex: 0.2, justifyContent: 'space-between', alignSelf: 'center'
    }
})