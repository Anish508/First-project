import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useThemes";

export default function TodoApp() {
  const { toggleDarkMode } = useTheme();
  const todos = useQuery(api.todos.getTodos);
  const addTodo = useMutation(api.todos.addTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const editTodo = useMutation(api.todos.editTodo);
  const clearAll = useMutation(api.todos.clearAll);

  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  if (!todos) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleAdd = async () => {
    if (newTodo.trim() === "") return;
    await addTodo({ text: newTodo });
    setNewTodo("");
  };

  const handleEditSave = async (id: string) => {
    await editTodo({ id, newText: editText });
    setEditingId(null);
    setEditText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Todos</Text>

      {/* Add New Todo */}
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new todo..."
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Ionicons name="add-circle" size={32} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Todo List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            {editingId === item._id ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={editText}
                  onChangeText={setEditText}
                />
                <TouchableOpacity
                  onPress={() => handleEditSave(item._id)}
                  style={styles.saveButton}
                >
                  <Ionicons name="checkmark" size={22} color="green" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() =>
                    toggleTodo({
                      id: item._id,
                      iscompleted: !item.iscompleted,
                    })
                  }
                >
                  <Ionicons
                    name={
                      item.iscompleted ? "checkmark-circle" : "ellipse-outline"
                    }
                    size={26}
                    color={item.iscompleted ? "green" : "#777"}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.todoText,
                    item.iscompleted && styles.completedText,
                  ]}
                >
                  {item.text}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setEditingId(item._id);
                    setEditText(item.text);
                  }}
                >
                  <Ionicons name="pencil" size={20} color="#007bff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTodo({ id: item._id })}>
                  <Ionicons name="trash" size={20} color="red" />
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      />

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => clearAll()} style={styles.clearButton}>
          <Ionicons name="trash-bin" size={20} color="white" />
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleDarkMode}>
          <Ionicons name="moon" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 32, fontWeight: "bold", marginVertical: 16 },
  addContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  addButton: { marginLeft: 8 },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    gap: 10,
  },
  todoText: { flex: 1, fontSize: 18 },
  completedText: { textDecorationLine: "line-through", color: "#777" },
  editInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#007bff",
    paddingVertical: 4,
  },
  saveButton: { marginLeft: 6 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  clearButton: {
    flexDirection: "row",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    gap: 5,
  },
  clearText: { color: "white", fontWeight: "600" },
});
