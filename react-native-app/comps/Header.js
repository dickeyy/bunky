import { View, Text, Image } from 'react-native';
import mainStyles from '../styles/mainStyle';

function Header(props) {
    return (
        
        <View style={props.style}>

            <Image source={require('../assets/logo-07.png')} style={mainStyles.headerLogo} />
            <Text style={mainStyles.headerTitle}>unky</Text>

        </View>

    );
}

export default Header;