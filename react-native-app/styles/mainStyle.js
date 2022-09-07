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
        top: -70,
        flex: 1,
        flexDirection: 'row',
    },

    footer: {
      width: '100%',
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 10,
      flex: 1,
      flexDirection: 'row',
  },

    headerTitle: {
        fontSize: 40,
        fontWeight: '800',
        color: '#6320EE',
        alignItems: 'center',
        textAlign: 'center',
    },

    footerIcon: {
        width: 50,
        height: 50,
        position: 'relative',
        bottom: 15,
        marginRight: 15,
        marginLeft: 15,
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
    marginRight: 15,
    marginLeft: 15,
},
  
});

export default mainStyles