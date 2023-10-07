import { FlatList, StyleSheet, Text, View } from "react-native";
import TodoItem from "./TodoItem";

const Todos = ({ todos, onViewTodo }) => {
  const todoItem = ({ item }) => <TodoItem item={item} onViewTodo={onViewTodo} />;
  return (
    <View style={styles.container}>
      {todos?.length === 0 ? (
        <Text style={{ color: "#fff", fontSize: 16 }}>No todos to show</Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item, index) => item.id}
          renderItem={todoItem}
          style={{width: "100%"}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 7,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
  },
});

export default Todos;
