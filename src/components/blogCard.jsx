import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme, } from '@react-navigation/native';
import { AuthContext } from '../contexts/authContext'

const BlogCard = ({ blogImage, userProfileImage, topic, title, userName, date, likeCount, blogId, navigation }) => {
  const { colors } = useTheme();

  const handlePress = () => {
    navigation.navigate('BlogDetail', { blogId, topic })
  }

  return (
    <TouchableOpacity style={styles.content} onPress={handlePress}>
    <Image source={{ uri: blogImage }} style={{ width: '30%', height: '100%', borderRadius: 3 }} />
    <View style={styles.contentText}>
      <Text style={styles.topicText}>{topic}</Text>
      <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
      <View style={styles.footer}>
        <View style={styles.topFooter}>
          <Image source={{ uri: userProfileImage }} style={{ width: 32, height: 32, borderRadius: 100, borderWidth: 2, borderColor: colors.primaryColor }}/>
          <Text>By</Text>
          <Text style={styles.userNameText}>{userName}</Text>
        </View>
        <View style={styles.bottomFooter}>
          <Text style={styles.dateText}>{date}</Text>
          <AntDesign name="star" size={15} color={colors.secondaryColor} />
          <Text style={styles.likeText(colors)}>{likeCount}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    gap: 10,
  },
  contentText: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
  },
  topicText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#bfbfbf'
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'column',
  },
  topFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  userNameText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  bottomFooter: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#bfbfbf'
  },
  likeText: (colors) => ({
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
    color: colors.secondaryColor
  }),
});

export default BlogCard;
