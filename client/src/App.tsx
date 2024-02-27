import useSWR from 'swr';
import { Box, Button, List, ThemeIcon } from '@mantine/core';
import AddToDo from './components/AddTodo';
import { CheckCircleFillIcon } from '@primer/octicons-react';

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export const ENDPOINT = 'http://localhost:4000';
const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {
  const { data, mutate } = useSWR<Todo[]>('api/todos', fetcher);
 
  async function markTodoAsDone(id: number) {
    try {
        const response = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
            method: "PATCH",
        });

        if (!response.ok) {
            throw new Error(`Error marking todo ${id} as done: ${response.statusText}`);
        }

        const updatedTodo = await response.json();
        mutate((data) => {
    if (data) {
        return data.map((todo) => (todo.id === id ? updatedTodo : todo));
    } else {
        return []
    }
});
    } catch (error) {
        console.error("Error marking todo as done:", error);
    }
}

  async function deleteTodo(id: number) {
    const update = await fetch(`${ENDPOINT}/api/todos/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
    mutate(update);
  }

  return (
    <Box
      style={() => ({
        padding: '2rem',
        width: '100%',
        maxWidth: '40rem',
        margin: '0 auto',
      })}
    >
      <List spacing="xs" size="sm" mb={12} center>
        {data?.map((todo) => (
          <List.Item
            key={`todo_list__${todo.id}`}
            onClick={() => markTodoAsDone(todo.id)}
            icon={
              todo.done ? (
                <ThemeIcon color="teal" size={24} radius="xl">
                  <CheckCircleFillIcon size={20} />
                </ThemeIcon>
              ) : (
                <ThemeIcon color="gray" size={24} radius="xl">
                  <CheckCircleFillIcon size={20} />
                </ThemeIcon>
              )
            }
          >
            <div>
              <div>{todo.title}</div>
              <div>{todo.body}</div> {/* Display both title and body */}
            </div>
            <Button onClick={() => markTodoAsDone(todo.id)}>Mark as Done</Button>
            <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
          </List.Item>
        ))}
      </List>

      <AddToDo mutate={mutate} />
    </Box>
  );
}

export default App;