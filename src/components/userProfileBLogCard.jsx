import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

const UserProfileBlogCard = ({ title, blog, blogId, topic, navigation }) => {
  const { colors } = useTheme();
  const handlePress = () => {
    navigation.navigate('BlogDetail', { blogId, topic })
  }
  return (
    <TouchableOpacity onPress={handlePress} style={{ position: 'relative', marginRight: 10}}>
      <View style={styles.blogContainer}>
        <Image source={{ uri: blog.image }} style={styles.blogImg} />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)']}
          style={styles.overlay}
        />
      <Text style={styles.overlayText} numberOfLines={2} ellipsizeMode="tail">
        {blog.title}
      </Text>
      <View style={styles.heartIconContainer}>
      <Ionicons
          name={"heart"}
          size={20}
          color={colors.secondaryColor}
        />
        <Text style={{color: 'white'}}>{blog.likes.length}</Text>
      </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
    marginLeft: 5,
    marginBottom: 10,
  },
  blogContainer: {
    position: 'relative',
  },
  blogImg: {
    width: 190,
    height: 250,
    borderRadius: 10
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: 250,
    borderRadius: 10
  },
  overlayText: {
    position: 'absolute',
    bottom: 15,
    left: 10,
    right: 3,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 100,
    textAlign: 'center',
    alignItems: 'center',
    padding: 2,
  },
});

export default UserProfileBlogCard;