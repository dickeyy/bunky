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
  
});

export default mainStyles