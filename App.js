import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";
import CustomButton from "./components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [todo, setTodo] = useState({id: null, text: ""});

  const onTodoTextChange = (text) => {
    setTodoText(text);
  };

  const onTodoTextUpdate = (text) => {
    setTodo({...todo, text});
  };

  const onAddTodo = async () => {
    if (todoText.replace("/s/g", "").trim().length !== 0) {
      const todosJSON = JSON.stringify([
        ...todos,
        { id: Math.random().toString(), text: todoText },
      ]);
      setTodos((prev) => [
        ...prev,
        { id: Math.random().toString(), text: todoText },
      ]);
      await AsyncStorage.setItem("todos", todosJSON);
    }
    setTodoText("");
    onToggleModal();
  };

  const onViewTodo = (item)=> {
    setTodo(item);
    onToggleModal();
  }

  const onUpdateTodo = async (item)=> {
    const todosJSON = JSON.stringify([...todos].map((todoItem)=> todoItem?.id === item?.id ? item : todoItem));
    setTodos((prev)=> [...prev].map((todoItem)=> todoItem?.id === item?.id ? item : todoItem));
    await AsyncStorage.setItem("todos", todosJSON);
    onToggleModal();
    setTodo({id: null, text: ""});
  }

  const onDeleteTodo = async (id) => {
    const todosJSON = JSON.stringify(
      [...todos].filter((todo) => todo.id !== id)
    );
    setTodos(JSON.parse(todosJSON));
    await AsyncStorage.setItem("todos", todosJSON);
    onToggleModal();
    setTodo({id: null, text: ""});
  };

  const onToggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosJSON = await AsyncStorage.getItem("todos");
        if (todosJSON) {
          setTodos(JSON.parse(todosJSON));
        }
      } catch (error) {
        console.error("Error loading todos: ", error);
      }
    };

    loadTodos();
  }, []);

  return (
    <View style={styles.appContainer}>
      <TodoForm
        todo={todo}
        todoText={todoText}
        onTodoTextChange={onTodoTextChange}
        onTodoTextUpdate={onTodoTextUpdate}
        onAddTodo={onAddTodo}
        onUpdateTodo={onUpdateTodo}
        showModal={showModal}
        onToggleModal={onToggleModal}
        onDeleteTodo={onDeleteTodo}
      />
      <View style={styles.addBtnContainer}>
        <CustomButton
          text="Add Todo"
          bg="#0f1247"
          color="#fff"
          onPress={onToggleModal}
        />
      </View>
      <Todos todos={todos} onDeleteTodo={onDeleteTodo} onViewTodo={onViewTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    width: "100%",
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "rgb(5, 4, 54)",
  },
  addBtnContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(175, 164, 255)",
    backgroundColor: "transparent",
  },
});
