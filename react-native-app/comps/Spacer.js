import { View } from 'react-native';

function Spacer(props) {
    return (
        <View style={[{
            height: props.height ? props.height : 10,
        }, props.style]}>
        
        </View>
    );
}

export default Spacer;