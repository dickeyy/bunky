import { Image, Pressable, Text, View, Animated, Panresponder } from 'react-native';
import mainStyles from '../styles/mainStyle';
import Spacer from './Spacer';

function ProfileCard(props) {

    return (
        
        <Animated.View style={mainStyles.profileCard}>
            <Image source={{uri: props.image}} style={mainStyles.profileCardImage} />

            <View style={mainStyles.profileCardInfo}>

                <View style={mainStyles.profileCardInfoRow1}>
                    <Text style={mainStyles.profileCardName}>{props.firstName}</Text>
                    <Text style={mainStyles.profileAge}>{props.age}</Text>
                </View>

                <View style={mainStyles.profileCardInfoRow2}>
                    <Text style={mainStyles.profileLastName}>{props.lastName}</Text>
                    <Text style={mainStyles.profilePronouns}>{props.pronouns}</Text>
                </View>

            </View>
        </Animated.View>

    );
}

export default ProfileCard;