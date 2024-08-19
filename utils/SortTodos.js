export default function SortTodos(todos) {
  const sortedData = {};

  todos.forEach((todo) => {
    if (!sortedData[todo.status]) {
      sortedData[todo.status] = [];
    }

    sortedData[todo.status].push(todo);
  });

  return sortedData;
}
