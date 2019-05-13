const React = require("react-native");
import Colors from '../../constants/Colors';

export default {
    header:{
        backgroundColor: Colors.tintColor,
        height:100,
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:35
      },
      body:{
        marginTop:40,
      },
      bodyContent: {
        alignItems: 'center',
        padding:30,
      },
      name:{
        fontSize:28,
        color: Colors.tintColor,
        fontWeight: "600"
      },
      tipus:{
        fontSize:16,
        fontWeight: 'bold',
        color: Colors.boldTextColor,
        marginTop:10,
        marginBottom: 20,
        alignSelf: 'center',
      },
      row:{
        fontSize:16,
        color: Colors.boldTextColor,
        marginTop:10,
        textAlign: 'center',
        fontFamily: 'Roboto',
      },
      bold:{
        fontWeight: 'bold',
        color: Colors.boldTextColor,
      },
}