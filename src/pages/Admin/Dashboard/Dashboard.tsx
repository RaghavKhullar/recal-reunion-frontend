import {
  Button,
  Group,
  Text,
  Collapse,
  Box,
  TextInput,
  Checkbox,
  SimpleGrid,
  FileInput,
  Image,
  Center,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useAppDispatch } from "../../../redux/store/hooks";
import {
  addNewUser,
  addAdmin,
  getAdminDetails,
  logoutAdmin,
  editEmail,
  addOldRem,
  deleteOldRem,
} from "../../../redux/actions";
import { showNotification } from "../../../helpers/helpers";
import { useSelector } from "react-redux";
import { adminSelector } from "../../../redux/reducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconEdit } from "@tabler/icons-react";
function Dashboard() {
  const [addUserFormOpened, { toggle: toggleAddUserForm }] =
    useDisclosure(false);
  const [addAdminFormOpened, { toggle: toggleAddAdminForm }] =
    useDisclosure(false);
  const [addOldRemForUserFormOpened, { toggle: toggleAddOldRemForUserForm }] =
    useDisclosure(false);
  const [
    deleteOldRemForUserFormOpened,
    { toggle: toggleDeleteOldRemForUserForm },
  ] = useDisclosure(false);
  const [
    editEmailOfTheUserFormOpened,
    { toggle: toggleEditEmailOfTheUserForm },
  ] = useDisclosure(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const name = useSelector(adminSelector).name;

  const fetchAdminDetails = async () => {
    const loginDispatch = await dispatch(getAdminDetails());
    if (getAdminDetails.fulfilled.match(loginDispatch)) {
      if (loginDispatch.payload.status === 200) {
        return;
      }
    }
    // if loggedIn in state is true, but actually admin is not loggedin
    await dispatch(logoutAdmin());
    navigate("/admin/login");
  };
  useEffect(() => {
    fetchAdminDetails();
  }, []);

  const addUserForm = useForm<{ email: string; name: string }>({
    initialValues: {
      email: "",
      name: "",
    },

    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) ? null : "Invalid email",
    },
  });

  const addAdminForm = useForm<{ email: string; name: string }>({
    initialValues: {
      email: "",
      name: "",
    },

    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) ? null : "Invalid email",
    },
  });

  const addOldRemForUserForm = useForm<{
    email: string;
    content: string;
    file: File | undefined;
  }>({
    initialValues: {
      email: "",
      content: "",
      file: undefined,
    },
    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) ? null : "Invalid email",
      content: (value) => (value.length > 0 ? null : "Content can't be empty"),
    },
  });

  const deleteOldRemForUserForm = useForm<{ email: string }>({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) ? null : "Invalid email",
    },
  });

  const editEmailOfTheUserForm = useForm<{ email: string; newEmail: string }>({
    initialValues: {
      email: "",
      newEmail: "",
    },
    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) ? null : "Invalid email",
      newEmail: (value) =>
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) ? null : "Invalid email",
    },
  });

  const addUserSubmit = async () => {
    const addUserDispatch = await dispatch(
      addNewUser({
        email: addUserForm.values.email,
        name: addUserForm.values.name,
      })
    );
    if (addNewUser.fulfilled.match(addUserDispatch)) {
      if (addUserDispatch.payload.status === 200) {
        showNotification(
          "Success",
          addUserDispatch.payload.data.message,
          "success"
        );
        addUserForm.reset();
        toggleAddUserForm();
      } else {
        showNotification(
          "Error",
          addUserDispatch.payload.data.message,
          "error"
        );
      }
    } else if (addNewUser.rejected.match(addUserDispatch)) {
      showNotification("Error", "Error occured", "error");
    }
    return;
  };

  const addAdminSubmit = async () => {
    const addAdminDispatch = await dispatch(
      addAdmin({
        email: addAdminForm.values.email,
        name: addAdminForm.values.name,
      })
    );
    if (addAdmin.fulfilled.match(addAdminDispatch)) {
      if (addAdminDispatch.payload.status === 200) {
        showNotification(
          "Success",
          addAdminDispatch.payload.data.message,
          "success"
        );
        addAdminForm.reset();
        toggleAddAdminForm();
        return;
      } else {
        showNotification(
          "Error",
          addAdminDispatch.payload.data.message,
          "error"
        );
        return;
      }
    } else if (addAdmin.rejected.match(addAdminDispatch)) {
      showNotification("Error", "Error occured", "error");
      return;
    }
  };

  const editEmailSubmit = async () => {
    const editEmailDispatch = await dispatch(
      editEmail({
        email: editEmailOfTheUserForm.values.email,
        newEmail: editEmailOfTheUserForm.values.newEmail,
      })
    );
    if (editEmail.fulfilled.match(editEmailDispatch)) {
      if (editEmailDispatch.payload.status === 200) {
        showNotification(
          "Success",
          editEmailDispatch.payload.data.message,
          "success"
        );
        editEmailOfTheUserForm.reset();
        toggleEditEmailOfTheUserForm();
        return;
      } else {
        showNotification(
          "Error",
          editEmailDispatch.payload.data.message,
          "error"
        );
        return;
      }
    } else if (editEmail.rejected.match(editEmailDispatch)) {
      showNotification("Error", "Error occured", "error");
      return;
    }
  };

  const addOldRemSubmit = async () => {
    const addOldRemDispatch = await dispatch(
      addOldRem({
        email: addOldRemForUserForm.values.email,
        content: addOldRemForUserForm.values.content,
        file: addOldRemForUserForm.values.file,
      })
    );
    if (addOldRem.fulfilled.match(addOldRemDispatch)) {
      if (addOldRemDispatch.payload.status === 200) {
        showNotification(
          "Success",
          addOldRemDispatch.payload.data.message,
          "success"
        );
        addOldRemForUserForm.reset();
        toggleAddOldRemForUserForm();
        return;
      } else {
        showNotification(
          "Error",
          addOldRemDispatch.payload.data.message,
          "error"
        );
        return;
      }
    } else if (addOldRem.rejected.match(addOldRemDispatch)) {
      showNotification("Error", "Error occured", "error");
      return;
    }
  };

  const deleteOldRemSubmit = async () => {
    const deleteOldRemDispatch = await dispatch(
      deleteOldRem(deleteOldRemForUserForm.values.email)
    );
    if (deleteOldRem.fulfilled.match(deleteOldRemDispatch)) {
      if (deleteOldRemDispatch.payload.status === 200) {
        showNotification(
          "Success",
          deleteOldRemDispatch.payload.data.message,
          "success"
        );
        deleteOldRemForUserForm.reset();
        toggleDeleteOldRemForUserForm();
        return;
      } else {
        showNotification(
          "Error",
          deleteOldRemDispatch.payload.data.message,
          "error"
        );
        return;
      }
    } else if (deleteOldRem.rejected.match(deleteOldRemDispatch)) {
      showNotification("Error", "Error occured", "error");
      return;
    }
  };

  const adminLogout = async () => {
    const logoutDispatch = await dispatch(logoutAdmin());
    if (logoutAdmin.fulfilled.match(logoutDispatch)) {
      if (logoutDispatch.payload.status === 200) {
        showNotification("Success", "Logged out successfully", "success");
        navigate("/admin/login");
        return;
      }
    }
    // navigate('/admin/login');
  };

  return (
    <>
      <Box
        display={"flex"}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "30px",
            marginLeft: "40%",
          }}
        >
          Welcome, <b>{name}</b>
        </h2>
        <Button onClick={adminLogout} color="red" mr={"30px"}>
          Logout
        </Button>
      </Box>
      <SimpleGrid
        className="w-full overflow-x-visible justify-center"
        cols={Math.max(
          1,
          Math.floor(
            window.visualViewport ? window.visualViewport.width / 600 : 1
          )
        )}
      >
        <Box w={"60%"} mx="auto">
          <Group justify="center" mt={"15vh"}>
            <Button
              mb={"20px"}
              onClick={() => {
                toggleAddUserForm();
                if (addOldRemForUserFormOpened) toggleAddOldRemForUserForm();
                if (addAdminFormOpened) toggleAddAdminForm();
                if (deleteOldRemForUserFormOpened)
                  toggleDeleteOldRemForUserForm();
                if (editEmailOfTheUserFormOpened)
                  toggleEditEmailOfTheUserForm();
              }}
            >
              {addUserFormOpened ? "Close: " : ""}Add a new user
            </Button>
          </Group>

          <Collapse in={addUserFormOpened}>
            <Box mx="auto">
              <TextInput
                withAsterisk
                label="Add email of the user to be added"
                placeholder="yours@gmail.com"
                {...addUserForm.getInputProps("email")}
              />

              <TextInput
                withAsterisk
                label="Add name of the user"
                placeholder="John Doe"
                {...addUserForm.getInputProps("name")}
              />

              <Group justify="center" mt="md">
                <Button type="submit" onClick={addUserSubmit}>
                  Submit
                </Button>
              </Group>
            </Box>
          </Collapse>
        </Box>
        <Box w={"60%"} mx="auto">
          <Group justify="center" mt={"15vh"}>
            <Button
              mb={"20px"}
              onClick={() => {
                toggleAddAdminForm();
                if (addOldRemForUserFormOpened) toggleAddOldRemForUserForm();
                if (addUserFormOpened) toggleAddUserForm();
                if (deleteOldRemForUserFormOpened)
                  toggleDeleteOldRemForUserForm();
                if (editEmailOfTheUserFormOpened)
                  toggleEditEmailOfTheUserForm();
              }}
            >
              {addAdminFormOpened ? "Close: " : ""}Add a new admin
            </Button>
          </Group>

          <Collapse in={addAdminFormOpened}>
            <Box mx="auto">
              <TextInput
                withAsterisk
                label="Add email of the admin to be added"
                placeholder="yours@gmail.com"
                {...addAdminForm.getInputProps("email")}
              />

              <TextInput
                withAsterisk
                label="Add name of the admin"
                placeholder="John Doe"
                {...addAdminForm.getInputProps("name")}
              />

              <Group justify="center" mt="md">
                <Button type="submit" onClick={addAdminSubmit}>
                  Submit
                </Button>
              </Group>
            </Box>
          </Collapse>
        </Box>
        <Box w={"60%"} mx="auto">
          <Group justify="center" mt={"15vh"}>
            <Button
              mb={"20px"}
              onClick={() => {
                toggleAddOldRemForUserForm();
                if (addUserFormOpened) toggleAddUserForm();
                if (addAdminFormOpened) toggleAddAdminForm();
                if (deleteOldRemForUserFormOpened)
                  toggleDeleteOldRemForUserForm();
                if (editEmailOfTheUserFormOpened)
                  toggleEditEmailOfTheUserForm();
              }}
            >
              {addOldRemForUserFormOpened ? "Close: " : ""}Add a old rem for a
              user
            </Button>
          </Group>

          <Collapse in={addOldRemForUserFormOpened}>
            <Box mx="auto">
              <TextInput
                withAsterisk
                label="Add email of the user"
                placeholder="yours@gmail.com"
                {...addOldRemForUserForm.getInputProps("email")}
              />
              <Textarea
                withAsterisk
                label="Add content of the rem"
                placeholder="Hey, how you doing?"
                styles={{
                  input: {
                    height: "20vh",
                    fontFamily: "'Fira Sans', sans-serif",
                    overflowY: "auto",
                  },
                }}
                {...addOldRemForUserForm.getInputProps("content")}
              />
              <FileInput
                leftSection={<IconEdit size={20} color="black" />}
                classNames={{
                  input:
                    "text-xl ml-1 font-bebus text-black bg-transparent border-black",
                }}
                mt={"20px"}
                placeholder="Add rem picture"
                accept="image/*"
                onChange={(file) => {
                  if (file) addOldRemForUserForm.setFieldValue("file", file);
                }}
              />
              <Group justify="center" mt="md">
                <Button type="submit" onClick={addOldRemSubmit}>
                  Submit
                </Button>
              </Group>
            </Box>
          </Collapse>
        </Box>
        <Box w={"60%"} mx="auto">
          <Group justify="center" mt={"15vh"}>
            <Button
              mb={"20px"}
              onClick={() => {
                toggleDeleteOldRemForUserForm();
                if (addOldRemForUserFormOpened) toggleAddOldRemForUserForm();
                if (addAdminFormOpened) toggleAddAdminForm();
                if (addUserFormOpened) toggleAddUserForm();
                if (editEmailOfTheUserFormOpened)
                  toggleEditEmailOfTheUserForm();
              }}
            >
              {deleteOldRemForUserFormOpened ? "Close: " : ""}Delete old rem of
              the user
            </Button>
          </Group>

          <Collapse in={deleteOldRemForUserFormOpened}>
            <Box mx="auto">
              <TextInput
                withAsterisk
                label="Add email of the user"
                placeholder="yours@gmail.com"
                {...deleteOldRemForUserForm.getInputProps("email")}
              />

              <Group justify="center" mt="md">
                <Button type="submit" onClick={deleteOldRemSubmit}>
                  Submit
                </Button>
              </Group>
            </Box>
          </Collapse>
        </Box>
        <Box w={"60%"} mx="auto">
          <Group justify="center" mt={"15vh"}>
            <Button
              mb={"20px"}
              onClick={() => {
                toggleEditEmailOfTheUserForm();
                if (addOldRemForUserFormOpened) toggleAddOldRemForUserForm();
                if (addAdminFormOpened) toggleAddAdminForm();
                if (deleteOldRemForUserFormOpened)
                  toggleDeleteOldRemForUserForm();
                if (addUserFormOpened) toggleAddUserForm();
              }}
            >
              {editEmailOfTheUserFormOpened ? "Close: " : ""}Edit email of the
              user
            </Button>
          </Group>

          <Collapse in={editEmailOfTheUserFormOpened}>
            <Box mx="auto">
              <TextInput
                withAsterisk
                label="Add old email of the user"
                placeholder="yours@gmail.com"
                {...editEmailOfTheUserForm.getInputProps("email")}
              />
              <TextInput
                withAsterisk
                label="Add new email of the user"
                placeholder="yours@gmail.com"
                {...editEmailOfTheUserForm.getInputProps("newEmail")}
              />
              <Group justify="center" mt="md">
                <Button type="submit" onClick={editEmailSubmit}>
                  Submit
                </Button>
              </Group>
            </Box>
          </Collapse>
        </Box>
      </SimpleGrid>
    </>
  );
}

export default Dashboard;
