import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function DetailsScreen() {
  let { items } = useLocalSearchParams();
  if(items){
    items = items.split(",")
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {items.map((item)=>{
        return <Text key = {item}>{item}</Text>
      })}
    </View>
  );
}