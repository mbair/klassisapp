const React = require("react-native");
import Colors from "../../constants/Colors";

export default {
    root: {
        backgroundColor: "#FFFFFF"
      },
      container: {
        // padding: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "#FFFFFF",
        alignItems: 'flex-start'
      },
      avatar: {
        width:55,
        height:55,
        borderRadius:25,
      },
      text: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap:'wrap'
      },
      content: {
        flex: 1,
        margin: 16,
      },
      mainContent: {
        marginRight: 60
      },
      memberImage: {
        height: 30,
        width: 30,
        marginRight:4,
        borderRadius:10,
      },
      separator: {
        height: 1,
        backgroundColor: Colors.tintColor,
      },
      countMembers:{
        color:"#20B2AA"
      },
      timeAgo:{
        fontSize:12,
        color: Colors.boldTextColor,
      },
      groupName:{
        fontSize:23,
        color: Colors.tintColor
      },
      groupMembersContent:{
        flexDirection:'row',
        marginTop:10
      },
      fab:{
        backgroundColor: Colors.tintColor,
      },
      modalHeader:{
        backgroundColor: Colors.tintColor,
      },
      activeButton:{
        backgroundColor: Colors.tintColor,
        marginTop: 10,
      },
      inactiveButton:{
        backgroundColor: 'silver',
        marginTop: 10,
      }
}