import { useState } from "react";

import {
  TextInput,
  Button,
  Box,
  Space,
  Paper,
  Title,
  Stack,
  Select,
  NumberInput,
  MultiSelect,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Album, AddressBook, Medal } from "tabler-icons-react";

const ProfileForm = () => {
  const year = new Date().getFullYear();
  const data = Array(50)
    .fill(0)
    .map((_, index) => `Item ${index}`);

  const [value, setValue] = useState([]);

  const form = useForm({
    initialValues: {
      regNo: "",
      fullName: "",
      dept: "",
      startYear: 1985,
      endYear: 1989,
      interests: value,
    },
    validate: {
      regNo: (value) =>
        /^[0-9]{12}$/.test(value) ? null : "Invalid Registration Number",
      dept: (value) => (value !== "" ? null : "Please select your department"),
    },
  });

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     dispatch(register(userData));
  //   };

  return (
    <Box sx={{ minWidth: 200, maxWidth: 500 }} mx="xl">
      <Paper shadow="xl" p="md" withBorder>
        <Title order={2}>PROFILE SETUP</Title>
        <Space h="md" />
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            required
            label="Registration number"
            placeholder="Enter your 12-digit registration number"
            icon={<Album size={16} />}
            size="md"
            {...form.getInputProps("regNo")}
          />
          <Space h="sm" />
          <TextInput
            placeholder="Enter your full name"
            label="Full Name"
            icon={<AddressBook size={16} />}
            size="md"
            {...form.getInputProps("fullName")}
            required
          />

          <Space h="sm" />
          <Select
            size="md"
            required
            label="Department"
            placeholder="Select your department"
            data={[
              { value: "Civil Engineering", label: "Civil Engineering" },
              {
                value: "Computer Science and Engineering",
                label: "Computer Science and Engineering",
              },
              {
                value: "Electrical and Electronics Engineering",
                label: "Electrical and Electronics Engineering",
              },
              {
                value: "Electronics and Communication Engineering",
                label: "Electronics and Communication Engineering",
              },
              {
                value: "Mechanical Engineering",
                label: "Mechanical Engineering",
              },
            ]}
            {...form.getInputProps("dept")}
          />
          <Space h="sm" />
          <Group noWrap>
            <NumberInput
              size="md"
              required
              icon={<Medal size={16} />}
              label="Start year"
              max={year}
              min={1985}
              stepHoldDelay={500}
              stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
              {...form.getInputProps("startYear")}
            />
            <NumberInput
              size="md"
              required
              icon={<Medal size={16} />}
              label="End year"
              max={year + Number(4)}
              min={1989}
              stepHoldDelay={500}
              stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
              {...form.getInputProps("endYear")}
            />
          </Group>
          <Space h="sm" />
          <MultiSelect
            value={value}
            onChange={setValue}
            data={data}
            size="md"
            label="Areas of Interest"
            placeholder="Search here..."
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            searchable
            limit={10}
            {...form.getInputProps("interests")}
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

export default ProfileForm;
