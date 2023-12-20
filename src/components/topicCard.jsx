import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
const TopicCard = ({ topicName, handleTopicPress, selectedTopic }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={[styles.topicCard(colors), selectedTopic === topicName && {backgroundColor: colors.secondaryColor}]} onPress={() => handleTopicPress(topicName)}>
      <Text style={selectedTopic === topicName ?{color: "#fff", fontWeight: 'bold'} :{color: "#000"}} >{topicName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  topicCard: (colors) => ({
    minWidth: 50,
    marginHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.secondaryColor,
  }),
})

export default TopicCard;