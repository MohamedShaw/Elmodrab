import React, { Component } from 'react';
import { View, Text,FlatList} from 'react-native';
import { Picker } from 'native-base';

export default class PKR extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value:`اختر ${this.props.name}`
    };
  }

  render() {
    return (
       <Picker
                    mode="dropdown"
                    onValueChange={(val)=>{
                        this.setState({value:val});
                    }}
                    selectedValue={this.state.value}                    
                    style={[{
                        width:'60%',
                        marginLeft:10,
                        backgroundColor:'white',
                }]}
                    placeholder={this.props.Picker.placeholder}
                    placeholderStyle={{ color: "#bfc6ea",textAlign:'center'}}
                    {...this.props.Picker}
                    >
                 {this.props.Picker.data}
                  </Picker> 
    );
  }
}
