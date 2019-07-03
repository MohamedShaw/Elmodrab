import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { ListItem, CardItem, Card, Left, Right, Button, Radio } from 'native-base';

export default class Index extends Component {
  render() {
    return (
        <View>

        <ListItem itemHeader first>
            <Text style={{ color: 'white' }}>{localization.Subscription} </Text>
        </ListItem>
        <Card>
            <CardItem>
                <Text style={{ textAlign: 'center', flex: 1 }}>{localization.moneyAmount}</Text>
            </CardItem>
            <CardItem style={{ flexDirection: 'row', left: 80, alignContent: 'center', flex: 1 }}>
                <Left style={{ flexDirection: 'row' }}>
                    <Radio style={{ right: 5 }} />
                    <Text>{localization.months6}</Text>
                </Left>
                <Right style={{ flexDirection: 'row' }}>
                    <Radio style={{ right: 5 }} />
                    <Text >{localization.months12}</Text>
                </Right>
            </CardItem>
            <CardItem>
                <View style={{ flexDirection: 'row' }}>
                    <Radio style={{ right: 7 }} />
                    <Text>{localization.Saudiriyals}</Text>
                </View>
            </CardItem>
            <CardItem>
                <Button style={{ backgroundColor: 'red' }}><Text style={{ color: "white", textAlign: 'center', flex: 1 }}>{localization.pay}</Text></Button>
            </CardItem>
        </Card>

    </View>
    )
  }
}
