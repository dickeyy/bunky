import { View, Text, Image } from 'react-native';
import mainStyles from '../styles/mainStyle';

function Header(props) {
    return (
        
        <View style={mainStyles.header}>
            
            <Text style={mainStyles.headerTitle}>Bunky</Text>

        </View>

    );
}

export default Header;