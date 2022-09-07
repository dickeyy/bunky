import { View, Text, Image } from 'react-native';

function ChoiceOption(props) {
    return (
        <View
            style={[{
                height: 50,
                width: '90%',
                marginTop: 15,
                borderRadius: 12,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: props.selected ? '#6320EE' : '#000',
                backgroundColor: props.selected ? 'rgba(99,32,238,0.1)' : '#fff',
            }, props.style]}
        >
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color: '#211A1D',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                {props.text}
            </Text>
        </View>
    );
}

export default ChoiceOption;