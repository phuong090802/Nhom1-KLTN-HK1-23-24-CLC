import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../../constant";

export const NotificationItem = ({ notification }) => {
  const { content, createdAt, read } = notification;

  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <View style={[styles.container, read ? styles.read : styles.unread]}>
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  read: {
    borderColor: colors.primary,
  },
  unread: {
    borderColor: colors.error,
  },
  content: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
});
