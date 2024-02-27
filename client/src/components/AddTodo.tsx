
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Modal, Group, TextInput, Textarea } from '@mantine/core';
import { ENDPOINT, Todo } from '../App';
import { KeyedMutator } from 'swr';

function AddTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: {
        
      title: '',
      body: '',
    },
  });

  async function createTodo(values: { title: string; body: string }) {
    const update = await fetch(`${ENDPOINT}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values), // Include both title and body in request
    }).then((r) => r.json());

    mutate(update);
    form.reset();
    setOpen(false);
  }

  return (
    <>
        <Modal opened={open} onClose={() => setOpen(false)} title="Add to list">
            <form onSubmit={form.onSubmit(createTodo)}>
                <TextInput required mb={12} label="ToDo" placeholder="objective to complete" {...form.getInputProps('title')} />
                <Textarea mb={12} label="Body" placeholder="expand on objective" {...form.getInputProps('body')} />

                <Button type="submit">Add</Button> {/* Changed button text for clarity */}
            </form>
      </Modal>
             <Group align="center">
                <Button fullWidth mb={12} onClick={() => setOpen(true)}>
                    Add to List
                </Button>
            </Group>
    </>)
}

export default AddTodo
