import {
  TextInput,
  Button,
  Box,
  Space,
  Paper,
  Title,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Id, Building } from "tabler-icons-react";

const ExperienceForm = () => {
  const form = useForm({
    initialValues: {
      title: "",
      organization: "",
    },
  });

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     dispatch(register(userData));
  //   };

  return (
    <Box mx="xl">
      <Paper shadow="xl" p="md" withBorder>
        <Title order={2}>What's your most recent experience?</Title>
        <Space h="md" />
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            required
            label="Job Title"
            placeholder="Most recent job title"
            icon={<Id size={16} />}
            size="md"
            {...form.getInputProps("title")}
          />
          <Space h="sm" />
          <TextInput
            placeholder="Where do you work?"
            label="Organization"
            icon={<Building size={16} />}
            size="md"
            {...form.getInputProps("organization")}
            required
          />
          <div>
            <Stack mt="xl" align="stretch" justify="center" spacing="lg">
              <Button position="right" type="submit" size="md">
                Next
              </Button>
            </Stack>
          </div>
        </form>
      </Paper>
    </Box>
  );
};

export default ExperienceForm;
