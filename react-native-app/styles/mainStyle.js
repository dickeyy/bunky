import { StyleSheet, StatusBar } from 'react-native';

const mainStyles = StyleSheet.create({
    container: {
        fontFamily: 'Helvetica',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        paddingTop: StatusBar.currentHeight,
    },
  
    spacer: {
      marginBottom: 10,
    },

    header: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -75,
        flex: 1,
        flexDirection: 'row',
    },

    headerScrollView: {
      width: '100%',
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 40,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#f2f2f2',
  },

    footer: {
      width: '100%',
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#f2f2f2',
  },

    headerTitle: {
        fontSize: 40,
        fontWeight: '800',
        color: '#6320EE',
        alignItems: 'center',
        textAlign: 'center',
    },

    headerLogo: {
        width: 35,
        height: 35,
    },

    footerIcon: {
        width: 50,
        height: 50,
        position: 'relative',
        bottom: 15,
        marginRight: 20,
        marginLeft: 20,
    },

    footerIconBig: {
      width: 55,
      height: 55,
      position: 'relative',
      bottom: 15,
      marginRight: 15,
      marginLeft: 15,
  },

  footerIconSmall: {
    width: 45,
    height: 45,
    position: 'relative',
    bottom: 15,
    marginRight: 25,
    marginLeft: 25,
  },

  footerIconActive: {
        width: 50,
        height: 50,
        position: 'relative',
        bottom: 15,
        marginRight: 20,
        marginLeft: 20,
  },

  footerIconBigActive: {
    width: 55,
    height: 55,
    position: 'relative',
    bottom: 15,
    marginRight: 15,
    marginLeft: 15,
  },  

  footerIconSmallActive: {
    width: 45,
    height: 45,
    position: 'relative',
    bottom: 15,
    marginRight: 25,
    marginLeft: 25,
  },

  profileCardImageContainer: {
    width: '100%',
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 1,
    flex: 1,
    flexDirection: 'row',
    borderColor: '#6320EE',
    borderWidth: 2,
    borderRadius: 20,
  },

  profileCard: {
    width: '90%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#8d8d8d',
    borderRadius: 20,
  },

  profileCardImage: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    top: 0,
  },

  profileImageNumIndicator: {
    width: '95%',
    height: '0%',
    borderBottomColor:'#8d8d8d',
    borderBottomWidth: 2,
    position: 'relative',
    top: 145,
  },

  profileImageNumIndicator2: {
    width: '95%',
    height: '0%',
    borderBottomColor:'#fff',
    borderBottomWidth: 2,
    position: 'relative',
    bottom: 410,
  },

  profileImageNumIndicatorCurrent: {
    width: '95%',
    height: '0%',
    borderBottomColor:'#fff',
    borderBottomWidth: 2,
    position: 'relative',
    top: 145,
  },

  profileImageNumIndicatorCurrent2: {
    width: '95%',
    height: '0%',
    borderBottomColor:'#8d8d8d',
    borderBottomWidth: 2,
    position: 'relative',
    bottom: 410,
  },

  profileCardInfo: {
    width: '100%',
    height: '20%',
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    textAlign: 'left',
    alignItems: 'left',
    justifyContent: 'left',
    backgroundColor: 'rgba(180, 180, 220, 1)',
    boxShadow: 'rgba(28, 28, 28, 0.2) 0px 0px 10px',
    paddingTop: 5,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#6320EE',
    borderWidth: 2,
  },

  profileCardInfoRow1: {
    flex: 1,
    flexDirection: 'row',
  },

  profileCardInfoRow2: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5
  },

  profileCardName: {
    fontSize: 40,
    fontWeight: '800',
    color: '#6320EE',
    textShadowColor: 'rgba(0, 0, 0, .25)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },

  likeOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0, 255, 0, 0.15)',
    borderRadius: 20,
    borderColor: 'rgb(0, 255, 0)',
    borderWidth: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',

  },

  likeIcon2: {
    width: 100,
    height: 100,
    shadowColor: 'rgba(0, 0, 0, .5)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },

  profileCardVerified: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginLeft: 5,
  },

  profileCardVerified2: {
    width: 40,
    height: 40,
    marginTop: 10,
  },

  profileAge: {
    fontSize: 25,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: '500'
  },

  profileLastName: {
    fontSize: 20,
    marginRight: 10
  },

  profilePronouns: {
    marginTop: 5,
    color: '#4d4d4d',
    fontSize: 15
  },

  infoIcon: {
    width: 50,
    height: 50,
  },

  infoIconButton: {
    position: 'relative',
    left: 120,
    top: 115,
  },

  likeContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 110,
  },

  likeIcon: {
    width: 75,
    height: 75,
    marginLeft: 50,
    textShadowColor: 'rgba(0, 0, 0, .25)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },

  dislikeIcon: {
    width: 77,
    height: 77,
    marginRight: 50,
  },

  fullProfileImage: {
    width: '100%',
    height: 450,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fullProfileImageContainer: {
    width: '100%',
    height: 450,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fullProfileInfoContainer: {
    width: '100%',
    padding: 0,
  },

  fullProfileName: {
    fontSize: 60,
    fontWeight: '800',
    color: '#6320EE',
    textShadowColor: 'rgba(0, 0, 0, .25)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
    marginRight: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  backIcon: {
    width: 50,
    height: 50,
  },

  backIconContainer: {
    backgroundColor: '#6320EE',
    width: 50,
    height: 50,
    position: 'relative',
    bottom: 27,
    borderRadius: 50,
    right: 160,
  },

  fullProfileInfoRow1: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  fullProfileInfoRow2: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  fullProfileInfoRow3: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    alignContent: 'left',
    alignItems: 'left',
    justifyContent: 'left',
    textAlign: 'left',
    marginLeft: 30,
    paddingRight: 30,
  },

  fullProfileInfoRow4: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'column',
    alignContent: 'left',
    alignItems: 'left',
    justifyContent: 'left',
    textAlign: 'left',
    marginLeft: 30,
    paddingRight: 30,
  },

  fullProfileAge: {
    fontSize: 30,
    marginRight: 10,
    fontWeight: '800'
  },

  fullProfilePronouns: {
    color: '#4d4d4d',
    fontSize: 20
  },

  jobIcon: {
    width: 30,
    height: 30,
  },

  fullProfileJob: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 5,
  },

  aboutMeHeader: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '800',
    color: '#8075FF'
  },

  fullProfileQuestionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 5,
  },

  accountProfileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    marginTop: 90,
    borderColor: '#6320EE',
    borderWidth: 4,
  },

  accountProfileImageContainer: {
    width: '100%',
    height: 300,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  editProfileIcon: {
    width: 50,
    height: 50,
  },

  editProfileButton: {
    shadowColor: 'rgba(0, 0, 0, .5)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    width: 90,
    height: 90,
    backgroundColor: '#DBDBDB',
    borderRadius: 50,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  settingsProfileIcon: {
    width: 35,
    height: 35,
  },

  settingsProfileButton: {
    shadowColor: 'rgba(0, 0, 0, .5)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    width: 60,
    height: 60,
    backgroundColor: '#DBDBDB',
    borderRadius: 50,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 40,
    marginLeft: 40,
  },

  accountButtonRow: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  settingsProfileText: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 10,
    textAlign: 'center',
  },

  logoutButton: {
    width: '80%',
    height: 50,
    backgroundColor: "rgba(230, 2, 2, 0.25)",
    borderRadius: 15,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 40,
    marginLeft: 40,
  },

  logoutButtonText: {
    fontSize: 25,
    fontWeight: '800',
    color: 'rgba(230, 2, 2, 1)',
    textAlign: 'center',
  }
  
});

export default mainStyles