import { StyleSheet, View, TextInput, Button, Modal } from "react-native";

const TodoForm = ({
  todo,
  todoText,
  onTodoTextChange,
  onTodoTextUpdate,
  onAddTodo,
  showModal,
  onToggleModal,
  onDeleteTodo,
  onUpdateTodo,
}) => {
  return (
    <Modal visible={showModal} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter text..."
            placeholderTextColor="#fff"
            style={styles.inputStyle}
            value={todo?.id ? todo?.text : todoText}
            onChangeText={todo?.id ? onTodoTextUpdate : onTodoTextChange}
          />
        </View>
        <Button
          title={todo?.id ? "Update" : "Add Todo"}
          color="#625c8f"
          onPress={todo?.id ? onUpdateTodo.bind(this, todo) : onAddTodo}
        />
        {todo?.id && (
          <Button
            title={"Delete"}
            color="#7d0000"
            onPress={onDeleteTodo.bind(this, todo?.id)}
          />
        )}
        <Button title="Close" color="#68619b" onPress={onToggleModal} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    flex: 1,
    justifyContent: "flex-start",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(175, 164, 255)",
    backgroundColor: "rgb(5, 4, 54)",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "rgb(175, 164, 255)",
    borderRadius: 6,
  },
  inputStyle: {
    width: "100%",
    color: "#fff",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "rgb(3, 2, 30)",
    borderRadius: 6,
  },
});

export default TodoForm;
