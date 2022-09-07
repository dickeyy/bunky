import { View, Text, Image } from 'react-native';
import mainStyles from '../styles/mainStyle';

function Footer(props) {

    return (
        
        <View style={mainStyles.footer}>
            
            <Image source={require('../assets/home-icon.png')} style={mainStyles.footerIconSmall} />
            <Image source={require('../assets/chat-icon.png')} style={mainStyles.footerIcon} />
            <Image source={require('../assets/star-icon.png')} style={mainStyles.footerIconBig} />
            <Image source={require('../assets/account-icon.png')} style={mainStyles.footerIconBig} />

        </View>

    );
}

export default Footer;