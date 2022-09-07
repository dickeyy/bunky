import { ImageBackground, View, Image, Pressable } from 'react-native';
import onboardingStyles from '../styles/onboardingStyle';

function UploadedPhoto(props) {
    return (
        <View style={props.style}>
            <Pressable onPress={() => { console.log('p') }}> 
                {props.source != undefined ? props.source.map((image, index) => {
                    <Image source={image} style={onboardingStyles.uploadedImage} />
                }): null}
            </Pressable>
        </View>

    );
}

export default UploadedPhoto;