import React, { PureComponent } from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";







// import {
//   Text,
//   StyleSheet,
//   View,
//   TouchableOpacity,
// } from 'react-native';
// import { PureComponent} from 'react';

// Screen 1: Fetch and Display Star Wars Characters
// * 		Fetch a list of Star Wars characters from an API endpoint.
// * 		Display the fetched characters in a scrollable list, showing their names and other relevant information.
// * 		Provide an option to bookmark/unbookmark each character in the list.
// Screen 2: Display Bookmarked Characters
// * 		Create a separate screen that shows all the characters that have been bookmarked from the previous screen.
// * 		Display the bookmarked characters in a scrollable list, showing their names and relevant information.
// Persistent Header:
// * 		Create a header component that stays across all screens.
// * 		Display the number of characters currently bookmarked in the header.
// * 		Ensure the header updates dynamically whenever a character is bookmarked or unbookmarked.
// or any files within the Snack

// https://swapi.py4e.com/api/people/

// export default function App() {
//   const [response, setResponse] = useState({});
//   const [starwarslist, setStarwarslist] = useState({});
//   const [reponseLoading, setReponseLoading] = useState(false);
//   const [reponseSuccess, setReponseSuccess] = useState(false);
//   const [bookmarkMap, setBookmarkMap] = useState({});
//   const router = useRouter();
//   useEffect(() => {
//     callApi();
//   }, []);

//   const callApi = async (url) => {
//     try {
//       setReponseLoading(true);
//       setReponseSuccess(false);
//       const _response = await fetch(url || `https://swapi.py4e.com/api/people/`);
//       const result = await _response.json();
//       const existingItems = url?response.results:[]
//       setStarwarslist([...existingItems, ...result.results])
//       setResponse(result)
//       setReponseLoading(false);
//       setReponseSuccess(true);
//     } catch (err) {
//       setReponseLoading(false);
//       setReponseSuccess(false);
//     }
//   };
//   const renderItem = ({ item, index }) => {
//     if (!item) {
//       return null;
//     }
//     return (
//       <View style={{ flex: 1, alignItems: 'center', height: 100,flexDirection:"row",padding:16 }}>
//         <Text>{item.name}</Text>

//         {bookmarkMap[item.name]?<Text style={{marginLeft:8}} onPress={()=>{
//           const newBookmarkmap= {
//             ...bookmarkMap,
//             [item.name]: false
//           }
//           setBookmarkMap(newBookmarkmap);
//         }}>
//           {"Bookmarked"}
//         </Text>:<Text style={{color:"green"}}
//         onPress={()=>{
//            const newBookmarkmap= {
//             ...bookmarkMap,
//             [item.name]: true
//           }
//           setBookmarkMap(newBookmarkmap);
//         }}
//         >
//           {"Bookmark"}
//         </Text>}
//       </View>
//     );
//   };
//   // return <View style={{height:200,width:200,backgroundColor:"red"}}/>
//   if (reponseLoading && !Object.keys(response)?.length) {
//     return <ActivityIndicator />;
//   }
//   return (
//     <SafeAreaView style={{flex:1}}>

//       {/* <Link to="Post"
//       href="/Pages/article"
//       > */}
//       <Text style={{color:"red"}} 
      
//       onPress={() => {
//       const map = Object.keys(bookmarkMap)
//         router.push('/Pages/article?items='+map.join(","))
//       }}
//       >
//         bookmarkpage
//       </Text>
//       {/* </Link> */}
//       <FlatList
//         data={starwarslist || []}
//         renderItem={renderItem}
//         keyExtractor={(item, index) =>  item.homeworld ||index.toString()}
//         onEndReached={() => {
//           // if(reponse.next){
//             callApi(response.next)
//           // }
//         }}
//         ListFooterComponent={reponseLoading?<ActivityIndicator/>:null}
//       />
//     </SafeAreaView>
//   );
// }
export default class Feeds extends PureComponent {
  render() {
    const { data } = this.props;
    if (!data) return null;
    
    const { creator, profilePicUrl, postUrl, caption } = data;
    return (
      
      <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.profileImageWrapper}>
            <Image style={styles.profileImage} source={{ uri: profilePicUrl }} />
          </TouchableOpacity>
          <Text style={styles.creatorName}>{creator}</Text>
        </View>

        {/* Post Image */}
        <Image source={{ uri: postUrl }} style={styles.postImage} resizeMode="cover" />

        {/* Caption */}
        <Text style={styles.caption}>{caption}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageWrapper: {
    marginRight: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
    marginTop: 8,
    borderRadius: 8,
  },
  caption: {
    marginTop: 4,
    fontSize: 14,
  },
});


// aditya@wishlink.com