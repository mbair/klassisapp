const React = require("react-native");
import Colors from '../../constants/Colors';

export default {
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
      },
      formContent:{
        flexDirection: 'row',
        marginTop:10,
      },
      inputContainer: {
          borderBottomColor: '#F5FCFF',
          backgroundColor: '#FFFFFF',
          borderRadius:30,
          borderBottomWidth: 1,
          height:45,
          flexDirection: 'row',
          alignItems:'center',
          flex:1,
          margin:10,
      },
      icon:{
        width:30,
        height:30,
      },
      iconBtnSearch:{
        alignSelf:'center'
      },
      inputs:{
          height:45,
          marginLeft:16,
          borderBottomColor: '#FFFFFF',
          flex:1,
      },
      inputIcon:{
        marginLeft:15,
        justifyContent: 'center'
      },
      saveButton: {
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
        width:70,
        alignSelf: 'flex-end',
        backgroundColor: Colors.tintColor,
        borderRadius:30,
      },
      saveButtonText: {
        color: 'white',
      },
      questionList:{
        // backgroundColor: 'yellow',
        padding:10,
      },
      questionBox: {
        padding:20,
        marginTop:5,
        marginBottom:5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius:10,
        alignItems: 'flex-start'
      },
      content: {
        flex: 1,
        marginLeft: 16,
        marginRight: 0
      },
      title:{
        fontSize:16,
        color: Colors.tintColor,
        marginLeft:0,
      },
      users_nev: {
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 10,
      },
      modalHeader:{
        backgroundColor: Colors.tintColor,
      }
}