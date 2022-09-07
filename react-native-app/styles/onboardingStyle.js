import { StyleSheet } from 'react-native';

const onboardingStyles = StyleSheet.create({
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#211A1D',
        textShadowColor: 'rgba(0, 0, 0, .25)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 4,
    },

    titleTextHighlight: {
        fontSize: 70,
        fontWeight: '800',
        color: '#6320EE',
        textShadowColor: 'rgba(0, 0, 0, .25)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 4,
    },

    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 150
    },

    buttonContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(99,32,238,0.3)',
        padding: 15,
        borderRadius: 10,
    },

    getStartedButton: {
        color: '#6320EE',
        fontSize: 30,
        fontWeight: '700',
    },

    purposeTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 50,
    },

    purposeTitleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#211A1D',
        alignItems: 'center',
        textAlign: 'center',
    },

    underline: {
        textDecorationLine: 'underline',
        textDecorationColor: '#6320EE',
        textDecorationStyle: 'solid'
    },

    purposeButton: {
        backgroundColor: 'rgba(99,32,238,0.3)',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
    },

    selectionIcon: {
        width: 50,
        height: 50,
    },

    selectionText: {
        fontSize: 30,
        marginLeft: 15,
        marginRight: 5,
        marginTop: 7,
        fontWeight: '700',
    },

    headerContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'left',
        position: 'absolute',
        top: -30,
    },

    backIcon: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: -150
    },

    dormTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 200,
    },

    dormTitleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#6320EE',
        alignItems: 'center',
        textAlign: 'center',
    },

    dormSubtitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        padding: 20,
        top: 250,
    },

    dormSubtitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#211A1D',
        alignItems: 'center',
        textAlign: 'center',
    },

    homeTitleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#211A1D',
        alignItems: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 110,
    },  

    homePhoneInput: {
        backgroundColor: 'rgba(99,32,238,0.1)',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#888698',
        marginTop: -100,
        borderColor: '#6320EE',
        width: '90%',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },

    homePhoneInputText: {
        backgroundColor: 'transparent',
    },

    homePhoneInputButton: {
        backgroundColor: 'rgba(99,32,238,0.3)',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        width: '70%',
        textAlign: 'center',
    },

    homePhoneInputButtonText: {
        fontSize: 30,
        fontWeight: '700',
        color: '#6320EE',
        textAlign: 'center',
    },

    homeNameInput: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#888698',
        marginTop: 20,
        marginBottom: 20,
        borderColor: '#6320EE',
        width: '90%',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'rgba(99,32,238,0.1)',
    },

    homeNameInputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 200,   
        width: '100%',
    },

    homeTitleText2: {
        fontSize: 40,
        fontWeight: 'bold',
        alignItems: 'center',
        marginTop: 20,
        textAlign: 'center',
    },

    homeSubtitleText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#888698',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },

    questionaireContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    questionaireQuestion: {
        fontSize: 20,
        fontWeight: '500',
        color: '#211A1D',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 7.5
    },

    questionaireInput: {
        fontSize: 20,
        marginTop: 7.5,
        width: '90%',
        fontWeight: '500',
        color: '#000000',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },

    questionaireInput2: {
        fontSize: 20,
        marginTop: 7.5,
        width: '90%',
        fontWeight: '500',
        color: '#000000',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },

    uploadedImage: {
        width: 300,
        height: 400,
        borderRadius: 10,
        marginTop: 30,
        position: 'relative',
    },

    deleteIcon: {
        position: 'relative',
        top: 30,
        left: 30,
    },

    photosContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        top: 0,
        left: 0,
    },

    profileContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        top: 0,
        left: 0,
    },

    profileImage: {
        width: 200,
        height: 300,
        borderRadius: 10,
        marginTop: 30,
        position: 'relative',
    },

    profileName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#211A1D',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },

});

export default onboardingStyles