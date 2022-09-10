import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import mainStyles from '../styles/mainStyle';

function Footer(props) {

    const [isHome, setIsHome] = useState(false);
    const [isChat, setIsChat] = useState(false);
    const [isLikes, setIsLikes] = useState(false);
    const [isAccount, setIsAccount] = useState(false);

    React.useEffect(() => {
        if (props.route == "Home") {
            setIsHome(true);
            setIsChat(false);
            setIsLikes(false);
            setIsAccount(false);
        } else if (props.route == "Chat") {
            setIsHome(false);
            setIsChat(true);
            setIsLikes(false);
            setIsAccount(false);
        } else if (props.route == "Likes") {
            setIsHome(false);
            setIsChat(false);
            setIsLikes(true);
            setIsAccount(false);
        } else if (props.route == "Account") {
            setIsHome(false);
            setIsChat(false);
            setIsLikes(false);
            setIsAccount(true);
        } else {
            setIsHome(false);
            setIsChat(false);
            setIsLikes(false);
            setIsAccount(false);
        }
    }, [props.route]);

    return (
        
        <View style={mainStyles.footer}>

            { isHome ? 
                <Image source={require('../assets/logo-07.png')} style={mainStyles.footerIconActive} /> :
                
                <Pressable onPress={() => props.navigation.navigate('Home')}>
                    <Image source={require('../assets/logo-10.png')} style={mainStyles.footerIconBig} /> 
                </Pressable>
            }

            { isChat ? 
                <Image source={require('../assets/chat-icon-active.png')} style={mainStyles.footerIconActive} /> : 

                <Pressable onPress={() => props.navigation.navigate('Chat')}>
                    <Image source={require('../assets/chat-icon.png')} style={mainStyles.footerIcon} /> 
                </Pressable>
            }

            { isLikes ? 
                <Image source={require('../assets/star-icon-active.png')} style={mainStyles.footerIconBigActive} /> : 

                <Pressable onPress={() => props.navigation.navigate('Likes')}>
                    <Image source={require('../assets/star-icon.png')} style={mainStyles.footerIconBig} /> 
                </Pressable>
            }

            { isAccount ? 
                <Image source={require('../assets/account-icon-active.png')} style={mainStyles.footerIconBigActive} /> : 

                <Pressable onPress={() => props.navigation.navigate('Account')}>
                    <Image source={require('../assets/account-icon.png')} style={mainStyles.footerIconBig} /> 
                </Pressable>
            }



        </View>

    );
}

export default Footer;