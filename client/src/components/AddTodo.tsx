
import { useState } from "react";
import { useForm } from "@mantine/hooks";
import { Button, Modal, Group, TextInput, Textarea } from "@mantine/core";
import { ENDPOINT, Todo } from "../App";
import { KeyedMutator } from "swr";

function AddTodo() {
    const [open, setOpen] = useState(false)

    const form = useForm({
        initialValues: {
            title: '',
            body: '',
        },
    });

    async function createTodo(){}

    return (
    <>
            <Modal
                opened={open}
                onClose = {() => setOpen(false)}
                title = "basic list"
            >
                <form onSubmit={form.onSubmit(createTodo)}>

                </form>
            </Modal>

            <Group position="center">
                <Button fullWidth mb={12} onClick={() => setOpen(true)}>
                    Add to List
                </Button>
            </Group>
            
    </>)
}

export default AddTodo
