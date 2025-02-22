import { SafeAreaView, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import Feeds from "../components/Feeds";
export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return <Feeds data={item} key={index.toString()} />;
        }}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

const data = [
  {
    creator: "Alice Johnson",
    profilePicUrl: "https://picsum.photos/200/200",
    postUrl: "https://picsum.photos/800/600",
    caption: "Enjoying a beautiful day!",
  },
  {
    creator: "Bob Smith",
    profilePicUrl: "https://picsum.photos/210/210",
    postUrl: "https://picsum.photos/801/601",
    caption: "Adventure awaits!",
  },
  {
    creator: "Charlie Brown",
    profilePicUrl: "https://picsum.photos/220/220",
    postUrl: "https://picsum.photos/802/602",
    caption: "Life is better with friends.",
  },
  {
    creator: "Diana Prince",
    profilePicUrl: "https://picsum.photos/230/230",
    postUrl: "https://picsum.photos/803/603",
    caption: "Finding joy in the little things.",
  },
  {
    creator: "Ethan Hunt",
    profilePicUrl: "https://picsum.photos/240/240",
    postUrl: "https://picsum.photos/804/604",
    caption: "Chasing dreams!",
  },
  {
    creator: "Fiona Apple",
    profilePicUrl: "https://picsum.photos/250/250",
    postUrl: "https://picsum.photos/805/605",
    caption: "Nature's beauty is breathtaking.",
  },
  {
    creator: "George Clooney",
    profilePicUrl: "https://picsum.photos/260/260",
    postUrl: "https://picsum.photos/806/606",
    caption: "Making memories one step at a time.",
  },
  {
    creator: "Hannah Montana",
    profilePicUrl: "https://picsum.photos/270/270",
    postUrl: "https://picsum.photos/807/607",
    caption: "Living my best life!",
  },
  {
    creator: "Ian Fleming",
    profilePicUrl: "https://picsum.photos/280/280",
    postUrl: "https://picsum.photos/808/608",
    caption: "Every moment is a story.",
  },
  {
    creator: "Julia Roberts",
    profilePicUrl: "https://picsum.photos/290/290",
    postUrl: "https://picsum.photos/809/609",
    caption: "Happiness is contagious.",
  },
];
