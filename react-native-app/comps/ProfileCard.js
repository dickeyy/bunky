import { Image, Pressable, Text, View, Animated, Panresponder } from 'react-native';
import mainStyles from '../styles/mainStyle';
import Spacer from './Spacer';

function ProfileCard(props) {

    return (
        
        <Animated.View style={mainStyles.profileCard}>

            <View style={mainStyles.profileCardImageContainer}>

                <Image source={{uri: props.image}} style={mainStyles.profileCardImage} />
            
            </View>

            

            {/* <View style={mainStyles.profileImageNumIndicatorCurrent}>
            </View> */}

            <View style={mainStyles.profileCardInfo}>

                <View style={mainStyles.profileCardInfoRow1}>
                    <Text style={mainStyles.profileCardName}>{props.firstName}</Text>

                    {props.isVerified ?
        
                    <Image source={require('../assets/verified-icon.png')} style={mainStyles.profileCardVerified} />
                    :
                    null }

                    <Text style={mainStyles.profileAge}>{props.age}</Text>
                </View>

                <View style={mainStyles.profileCardInfoRow2}>
                    <Text style={mainStyles.profileLastName}>{props.lastName}</Text>
                    <Text style={mainStyles.profilePronouns}>{props.pronouns}</Text>
                </View>

            </View>

            {/* <View style={mainStyles.likeOverlay}>
                <Image source={require('../assets/like-icon.png')} style={mainStyles.likeIcon2} />
            </View> */}
        </Animated.View>

    );
}

export default ProfileCard;