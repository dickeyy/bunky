import { View, Text } from 'react-native';

function RadioButton(props) {
    return (
        <View style={[{
          height: 24,
          width: 100,
          marginTop: 15,
          position: 'relative',
            right: 120,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }, props.style]}>
          {
            props.selected ?
              <View style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#6320EE',
              }}/>
              : null
          }
          <Text>{props.text}</Text>
        </View>
    );
}

export default RadioButton;