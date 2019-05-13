const React = require("react-native");
const { Dimensions, Platform } = React;
import Colors from '../../constants/Colors';

export default {
container:{
    flex:1,
    marginTop:20,
  },
  content:{
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  header:{
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center",
    backgroundColor: Colors.tintColor,
    color: "#f3dc97",
    fontFamily: 'space-mono'
  },
  list: {
    height: '100%',
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 5,
    // backgroundColor:"#D8D3D9",
  },
  listContainer:{
    alignItems:'center',
    height: Dimensions.get('screen').height - 180,
  },
  /******** card **************/
  card:{
    paddingTop: 37.5,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 12,
    marginVertical: 10,
    backgroundColor:"white",
    flexBasis: '42%',
    marginHorizontal: 10,
    borderRadius: 15,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardIcon:{
    color: Colors.tintColor,
    alignSelf:'center',
    fontSize: 50,
  },
  title:{
    fontSize:17,
    alignSelf:'center',
    color: Colors.tintColor
  },
}