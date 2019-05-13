const React = require("react-native");
const { Dimensions, Platform } = React;
import Colors from '../../constants/Colors';

export default {
    container:{
        flex:1,
      },
      searchBar:{
        backgroundColor: Colors.tintColor,
      },
      userList:{
        flex:1,
        backgroundColor: Colors.backgroundColor,
      },
      cardContent: {
        width: '100%',
        textAlign: 'center',
        padding: 10,
      },
      card:{
        shadowColor: '#00000021',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        marginVertical: 10,
        marginHorizontal:20,
        backgroundColor:"white",
        // flexBasis: '46%',
        flexDirection:'row'
      },
    
      name:{
        fontSize:18,
        flex:1,
        alignSelf:'center',
        color: Colors.tintColor,
        fontWeight:'bold'
      },
      uzletkoto_tipus:{
        fontWeight:'bold',
        fontSize:14,
        flex:1,
        alignSelf:'center',
        color: Colors.boldTextColor,
        marginBottom: 10,
      },
      info:{
        fontSize:14,
        flex:1,
        alignSelf:'flex-start',
        color: Colors.boldTextColor,
      },
      bold:{
        fontWeight: 'bold',
        color: Colors.boldTextColor,
        fontSize: 14
      }
}