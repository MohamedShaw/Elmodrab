import React from 'react';
import {TouchableOpacity,Text} from 'react-native';
// import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5Brands';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'native-base';
export default class MyCheckbox extends React.PureComponent {
  constructor(props){
    super(props);
   this.state={
      checked:false
  }
  
  }

    render() {

      const { label, checked, onChange } = this.props;
      let ico=<Icon type='MaterialCommunityIcons'  name={this.state.checked?'checkbox-marked':'checkbox-blank-outline'} color='black' style={{flex:1,alignSelf: 'center',color:'white'}} />
      return (
        <TouchableOpacity
        style={[this.props.style]}
                 onPress={()=>{onChange(!this.state.checked);this.setState({checked:!this.state.checked}); }}
        >
        {ico}
                </TouchableOpacity>
      );
    }
  }