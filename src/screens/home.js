import { SafeAreaView, Text, ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";
import TopicCard from "../components/topicCard";
import BlogCard from "../components/blogCard";
import { useTheme } from "@react-navigation/native";
const Home = () => {
  const { colors } = useTheme()
  const [selectedTopic, setSelectedTopic] = useState('All')
  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 40}}>Discover Latest Blogs</Text>
      <View style={{flexDirection: 'column', gap: 10, marginTop: 10}}>
        <Text style={{fontSize: 20}}>Topics</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TopicCard topicName={"All"} handleTopicPress={setSelectedTopic} selectedTopic={selectedTopic} />
          <TopicCard topicName={"Technology"} handleTopicPress={setSelectedTopic} selectedTopic={selectedTopic}/>
          <TopicCard topicName={"Drama"} handleTopicPress={setSelectedTopic} selectedTopic={selectedTopic}/>
          <TopicCard topicName={"Game"} handleTopicPress={setSelectedTopic} selectedTopic={selectedTopic}/>
          <TopicCard topicName={"Sport"} handleTopicPress={setSelectedTopic} selectedTopic={selectedTopic}/>
          <TopicCard topicName={"Football"} handleTopicPress={setSelectedTopic} selectedTopic={selectedTopic}/>
          <TopicCard topicName={"Basketball"} handleTopicPress={setSelectedTopic} selectedTopic={selectedTopic}/>
        </ScrollView>
      </View>
      <BlogCard 
        blogImage={"https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png"}
        userProfileImage={"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
        topic={"Technology"}
        title={"How netflix brings safer and faster streaming experience"}
        userName={"John Doe"}
        date={"12.12.2020"}
        likeCount={32}
      />
      <BlogCard 
        blogImage={"https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png"}
        userProfileImage={"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
        topic={"Technology"}
        title={"How netflix brings safer and faster streaming experience"}
        userName={"John Doe"}
        date={"12.12.2020"}
        likeCount={32}
      />
    </ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  }
})
export default Home;