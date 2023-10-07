import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const TodoItem = ({ item, onViewTodo }) => {
  return (
    <Pressable onPress={onViewTodo.bind(this,item)}>
      <View style={styles.todoItem}>
        <Text style={styles.todoText}>{item.text}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    width: "100%",
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    backgroundColor: "#141861",
    borderRadius: 4,
  },
  todoText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default TodoItem;
