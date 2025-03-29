import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { FlatList } from "react-native";
import Feeds from "../components/Feeds";
import {
  PanGestureHandler,
  GestureEvent,
  HandlerStateChangeEvent,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useCallback, useRef, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_WIDTH = 250;
const CARD_HEIGHT = 250;
export default function HomeScreen() {
  const [data, setData] = useState(postsData);
  const colors = useRef(data.map(() => getRandomColor())).current;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const activeCardIndex = useSharedValue(0);
  const onGestureEvent = useCallback((event: GestureEvent) => {
    translateX.value = event.nativeEvent.translationX as number;
    translateY.value = event.nativeEvent.translationY as number;
  }, []);
  const onHandlerStateChange = useCallback((event: HandlerStateChangeEvent) => {
    if (event.nativeEvent.state == 5) {
      const swipeDistanceX = event.nativeEvent.translationX as number;
      const swipeDistanceY = event.nativeEvent.translationY as number;
      const swipeThreshold = 200;
      if (Math.abs(swipeDistanceX) > swipeThreshold || Math.abs(swipeDistanceY) > swipeThreshold) {
        translateX.value = withSpring(
          swipeDistanceX > 0 ? SCREEN_WIDTH+CARD_WIDTH : -1*(SCREEN_WIDTH+CARD_WIDTH)
        );
        translateY.value = withSpring(
          swipeDistanceY > 0 ? SCREEN_HEIGHT+CARD_HEIGHT : -1*(SCREEN_HEIGHT+CARD_HEIGHT)
        );
        setTimeout(()=>{
          activeCardIndex.value = (activeCardIndex.value + 1) % data.length;;
          translateX.value = 0;
          translateY.value = 0;
          offsetX.current = 0;
          offsetY.current = 0;
        },300)
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        offsetX.current = 0;
        offsetY.current = 0;
      }
    }
  }, []);
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const getCardStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const relativeIndex = (index - activeCardIndex.value + data.length) % data.length;
      const isTopCard = index === activeCardIndex.value;
      const isNextCard = index === activeCardIndex.value + 1;
      const isRemoved = index < activeCardIndex.value; // Card is "removed" if its index is behind activeCardIndex
      if (isRemoved && activeCardIndex.value > index) {
        return {
          opacity: 0, // Hide the card completely
          transform: [{ scale: 0 }], // Minimize it
          zIndex: -1, // Push it to the bottom
          backgroundColor: colors[index],
        };
      }
      const backgroundColor = colors[index];
      if (isTopCard) {
        return {
          transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            {
              rotate: `${interpolate(
                translateX.value,
                [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
                [-15, 0, 15],
                Extrapolate.CLAMP
              )}deg`,
            },
          ],
          opacity: 1,
          backgroundColor,
          zIndex: data.length - relativeIndex,
          marginTop: relativeIndex <= 3 ? 16 * relativeIndex : 0,
        };
      } else if (isNextCard) {
        // Scale up the next card as the top card movesss
        const scale = interpolate(
          Math.abs(translateX.value) + Math.abs(translateY.value),
          [0, 200],
          [0.9, 1],
          Extrapolate.CLAMP
        );
        return {
          transform: [{ scale }],
          opacity: 1,
          backgroundColor,
          zIndex: data.length - relativeIndex,
          marginTop: relativeIndex <= 3 ? 16 * relativeIndex : 0,
        };
      } else {
        // Cards futher back remain scaled down
        return {
          transform: [
            { scale: 0.9 - (index - activeCardIndex.value - 1) * 0.05 },
          ],
          opacity: 0.8,
          backgroundColor,
          zIndex: data.length - relativeIndex,
          marginTop: relativeIndex <= 3 ? 16 * relativeIndex : 0,
        };
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.cardContainer}>
          {data.map((item, index) => (
            <PanGestureHandler
              key={JSON.stringify(item)}
              onGestureEvent={
                ((index - activeCardIndex.value + data.length) % data.length) === index ? onGestureEvent : undefined
              }
              onHandlerStateChange={
                ((index - activeCardIndex.value + data.length) % data.length) === index
                  ? onHandlerStateChange
                  : undefined
              }
              enabled={((index - activeCardIndex.value + data.length) % data.length) === index} // Only the top card is draggable
            >
              <Animated.View
              style={[getCardStyle(index),styles.card]}
                // style={[
                //   styles.card,
                //   getCardStyle(index),
                //   {
                //     backgroundColor: getRandomColor(),
                //     marginTop: index <= 3 ? 16 * index : 0,
                //   },
                // ]}
              />
            </PanGestureHandler>
          ))}
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  cardContainer: {
    width: 250,
    height: 250,
    position: "relative",
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

const postsData= [
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
