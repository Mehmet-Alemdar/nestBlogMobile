import { SafeAreaView, Text, ScrollView, StyleSheet, View, Animated, Easing } from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import TopicCard from "../components/topicCard";
import BlogCard from "../components/blogCard";
import { useTheme, useFocusEffect } from "@react-navigation/native";
import { fetchBlogPosts } from "../lib/apiConnection";
import moment from 'moment';
const Home = ({navigation}) => {
  const { colors } = useTheme()
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [topicData, setTopicData] = useState([])
  const [isLoading, setIsLoading] = useState(true)



  useFocusEffect(
    useCallback(() => {
      fetchBlogPosts().then((res) => {
        if(!res.error) {
          setData(res)
          setFilteredData(res)
          let t = res.map((blog) => blog.topic)
          const uniqueTopic = [...new Set(t)]
          if(uniqueTopic.length == 1) {
            setSelectedTopic(uniqueTopic[0])
          } else {
            setSelectedTopic('All')
          }
          setTopicData(uniqueTopic)
          setIsLoading(false)
        }
      })
    }, [])
  )
  const animatedValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if(selectedTopic == 'All') {
      setFilteredData(data)
    } else {
      const dataF = data.filter((blog) => blog.topic == selectedTopic)
      setFilteredData(dataF)
    }
  }, [selectedTopic])

  useEffect(() => {
    if (!isLoading) {
      startAnimation();
    }
  }, [isLoading]);
  
  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading 
        ? 
        <Text>Loading...</Text> 
        : 
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={{fontWeight: 'bold', fontSize: 40}}>Discover Latest Blogs</Text>
        <View style={{flexDirection: 'column', gap: 10, marginTop: 10}}>
          <Text style={{fontSize: 20}}>Topics</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {topicData.length > 1 && <TopicCard topicName={"All"} handleTopicPress={setSelectedTopic} selectedTopic={selectedTopic} />}
            {topicData.map((topic, i) => (
              <TopicCard key={i} topicName={topic} handleTopicPress={setSelectedTopic} selectedTopic={selectedTopic}/>
            ))}
          </ScrollView>
        </View>
        <Text style={{fontSize: 19, marginTop: 20, fontWeight: 'bold'}}>Blogs, {filteredData.length}</Text>
        <View style={{flexDirection: 'column', gap: 20, marginBottom: 50, marginTop: 20}}>
        {filteredData.map((blog, i) => {
        const translateY = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [100 * i, 0]
        });

        return (
          <Animated.View
            key={i}
            style={{ transform: [{ translateY }] }}
          >
            <BlogCard
              blogImage={blog.image}
              userProfileImage={blog.user.profilePicture}
              topic={blog.topic}
              title={blog.title}
              userName={blog.user.name}
              date={moment(blog.createdAt).format('DD MMM, YYYY')}
              likeCount={blog.likes.length}
              navigation={navigation}
              blogId={blog._id}
            />
          </Animated.View>
        );
      })}
        </View>
      </ScrollView>
    }
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  }
})
export default Home;