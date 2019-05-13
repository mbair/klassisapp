const React = require("react-native");
import Colors from '../../constants/Colors';

export default {
  container:{
    backgroundColor: Colors.backgroundColor,  
  },
  box:{
    padding:15,
    margin:10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderRadius:10,
  },
  boxText:{
    color: Colors.tintColor,
  },
  flatlist: {
    backgroundColor: "#ffffff",
    marginTop:5,
  },
  listItem: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 0,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    alignSelf: 'stretch',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.tintColor,
  },
  time:{
    fontSize:12,
    right: 0,
    color:"#808080",
    textAlign: 'right', 
  },
  name:{
    fontSize:14,
    fontWeight:"bold",
  },
  text:{
    color: Colors.tintColor,
  },
  fab:{
    backgroundColor: Colors.tintColor,
  },
  modalHeader:{
    backgroundColor: Colors.tintColor,
  }
}