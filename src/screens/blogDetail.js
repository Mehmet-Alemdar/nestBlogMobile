import {View, Text} from 'react-native';

const BlogDetail = ({route}) => {
  console.log(route.params);
  return (
    <View>
      <Text>Blog Detail, {route.params.blogId}</Text>
    </View>
  )
}

export default BlogDetail