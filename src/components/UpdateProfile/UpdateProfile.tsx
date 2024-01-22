import {
  BackgroundImage,
  Box,
  Button,
  Center,
  FileInput,
  Modal,
  Select,
  Tabs,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import classes from "./styles.module.css";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/reducer";
import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconEdit,
  IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import { BACKEND_URL } from "../../../config";
import { updateUserProfile } from "../../redux/actions";
import { useAppDispatch } from "../../redux/store/hooks";
import { showNotification } from "../../helpers/helpers";
import { DatePickerInput } from "@mantine/dates";

const getNextTab = (activeTab: string | null) => {
  if (activeTab === "first") return "second";
  if (activeTab === "second") return "third";
  if (activeTab === "third") return "fourth";
  return null;
};

const getPrevTab = (activeTab: string | null) => {
  if (activeTab === "fourth") return "third";
  if (activeTab === "third") return "second";
  if (activeTab === "second") return "first";
  return null;
};

const UpdateProfile = ({
  close,
  opened,
}: {
  close: () => void;
  opened: boolean;
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const {
    currentUser: { user },
  } = useSelector(userSelector);
  const dispatch = useAppDispatch();
  const form = useForm<{
    name: string;
    department: string;
    section: string;
    email: string;
    image: string;
    newImageFile: null | File;
    linkedin: string;
    instagram: string;
    facebook: string;
    x: string;
    aboutMe: string;
    dateOfBirth: Date;
  }>({
    initialValues: {
      name: user?.name || "",
      department: user?.department || "",
      section: user?.section || "",
      email: user?.email || "",
      image: user?.image || "",
      newImageFile: null,
      linkedin: user?.linkedin || "",
      instagram: user?.instagram || "",
      facebook: user?.facebook || "",
      x: user?.x || "",
      aboutMe: user?.aboutMe || "",
      dateOfBirth: user?.dateOfBirth
        ? new Date(
          parseInt(user?.dateOfBirth.split("-")[2]),
          parseInt(user?.dateOfBirth.split("-")[1]) - 1,
          parseInt(user?.dateOfBirth.split("-")[0])
        )
        : new Date(),
    },
  });

  return (
    <Modal
      classNames={{
        inner: "flex justify-center items-center",
        root: "flex justify-center items-center",
        content:
          (!isMobile
            ? "w-[60vw] flex-none h-[70vh] max-w-[600px] "
            : "flex-none h-[70vh] max-w-[600px] ") +
          classes.updateProfileContainer,
        body: "w-full h-full",
      }}
      opened={opened}
      onClose={close}
      withCloseButton={false}
    >
      <Tabs
        className="w-full h-full flex flex-col"
        value={activeTab}
        onChange={setActiveTab}
      >
        <Box className="w-full h-[25%] rounded-tr-[12px] flex flex-col justify-end items-center rounded-tl-[12px] bg-[#A72343] px-3 py-4">
          <Text className="text-5xl font-bebus text-center text-white mb-7">
            Update Profile
          </Text>
          <Tabs.List className="before:h-0 before:border-none">
            <Tabs.Tab
              className={
                "bg-transparent h-0 p-0 before:h-1 before:bg-[#D9D9D9] before:w-16 mr-2 before:border-[#D9D9D9]" +
                (activeTab === "first" ? " before:bg-black" : "")
              }
              value="first"
            ></Tabs.Tab>
            <Tabs.Tab
              className={
                "bg-transparent h-0 p-0 before:h-1 before:bg-[#D9D9D9] before:w-16 mr-2 before:border-[#D9D9D9]" +
                (activeTab === "second" ? " before:bg-black" : "")
              }
              value="second"
            ></Tabs.Tab>
            <Tabs.Tab
              className={
                "bg-transparent h-0 p-0 before:h-1 before:bg-[#D9D9D9] before:w-16 mr-2 before:border-[#D9D9D9]" +
                (activeTab === "third" ? " before:bg-black" : "")
              }
              value="third"
            ></Tabs.Tab>
            <Tabs.Tab
              className={
                "bg-transparent h-0 p-0 before:h-1 before:bg-[#D9D9D9] before:w-16 before:border-[#D9D9D9]" +
                (activeTab === "fourth" ? " before:bg-black" : "")
              }
              value="fourth"
            ></Tabs.Tab>
          </Tabs.List>
        </Box>
        <Tabs.Panel className="h-[65%]" value="first">
          <Center className="w-full h-full flex-col">
            <BackgroundImage
              className="h-[25vh] w-[25vh] rounded-full border-black border-[1px] flex flex-col justify-end items-center overflow-hidden"
              src={
                form.values.newImageFile === null
                  ? BACKEND_URL + "/images/profiles/" + (user?.image || "temp")
                  : URL.createObjectURL(form.values.newImageFile)
              }
            >
              <Center className="w-full bg-black bg-opacity-50 h-[70px]">
                <FileInput
                  leftSection={<IconEdit size={20} color="white" />}
                  classNames={{
                    input:
                      "text-xl ml-1 font-bebus text-white bg-transparent border-none",
                  }}
                  placeholder="EDIT PICTURE"
                  accept="image/*"
                  onChange={(file) => {
                    if (file) form.setFieldValue("newImageFile", file);
                  }}
                />
              </Center>
            </BackgroundImage>
          </Center>
        </Tabs.Panel>
        <Tabs.Panel className="h-[65%]" value="second">
          <Center className="w-full h-full flex-col">
            <TextInput
              classNames={{
                label:
                  "text-white font-fira text-lg relative z-10 top-[15px] left-[20px]",
                input:
                  "w-full bg-transparent border-2 border-black text-xl py-3 text-white font-fira pl-10 h-[60px] px-4 py-2 rounded-full w-[150px]",
              }}
              className="w-full"
              label="Name"
              {...form.getInputProps("name")}
            />
            <Select
              classNames={{
                root: "w-full",
                label:
                  "text-white font-fira text-lg relative z-10 top-[15px] left-[20px]",
                wrapper:
                  "rounded-full px-5 py-3 border-[2px] border-black w-full",
                input: "text-xl text-white font-fira px-4 py-2",
                section: "text-black pr-4",
                dropdown:
                  "rounded-b-lg translate-y-3 border-[2px] border-black bg-[#e7e6b6]",
                option:
                  "text-2xl font-fira hover:bg-[#f5f5bd] hover:text-black",
              }}
              variant="unstyled"
              rightSection={
                <IconTriangleInvertedFilled size={20} color="#000000" />
              }
              label="Department"
              data={["ARCH", "CHEM", "CIV", "CSE", "EEE", "ECE", "ICE", "MECH", "META", "PROD"]}
              {...form.getInputProps("department")}
            />
            <Select
              classNames={{
                root: "w-full",
                label:
                  "text-white font-fira text-lg relative z-10 top-[15px] left-[20px]",
                wrapper:
                  "rounded-full px-5 py-3 border-[2px] border-black w-full",
                input: "text-xl text-white font-fira px-4 py-2",
                section: "text-black pr-4",
                dropdown:
                  "rounded-b-lg translate-y-3 border-[2px] border-black bg-[#e7e6b6]",
                option:
                  "text-2xl font-fira hover:bg-[#f5f5bd] hover:text-black",
              }}
              variant="unstyled"
              rightSection={
                <IconTriangleInvertedFilled size={20} color="#000000" />
              }
              label="Section"
              data={["A", "B", "NA"]}
              {...form.getInputProps("section")}
            />
            <DatePickerInput
              valueFormat="DD-MM-YYYY"
              classNames={{
                label:
                  "text-white font-fira text-lg relative z-10 top-[15px] left-[20px]",
                input:
                  "w-full bg-transparent border-2 border-black text-xl py-3 text-white font-fira pl-10 h-[60px] px-4 py-2 rounded-full w-[150px]",
              }}
              className="w-full"
              label="Date of Birth"
              {...form.getInputProps("dateOfBirth")}
            />
          </Center>
        </Tabs.Panel>
        <Tabs.Panel className="h-[65%]" value="third">
          <Center className="w-full h-full flex-col">
            <Text className="text-white font-fira text-3xl mb-5 ">
              About Me
            </Text>
            <Textarea
              minRows={4}
              autosize
              maxRows={6}
              classNames={{
                root: "w-[80%]",
                input:
                  "w-full bg-transparent border-2 border-black text-xl text-white font-fira px-4 py-2 rounded-lg",
              }}
              {...form.getInputProps("aboutMe")}
            />
          </Center>
        </Tabs.Panel>
        <Tabs.Panel className="h-[65%]" value="fourth">
          <Center className="w-full h-full flex-col gap-6">
            <TextInput
              leftSection={<IconBrandLinkedin size={50} stroke={2} />}
              classNames={{
                section: "ml-4",
                input:
                  "w-full pl-16 bg-transparent border-2 border-black text-xl py-3 text-white font-fira pl-10 h-[60px] px-4 py-2 rounded-full w-[150px]",
              }}
              className="w-full"
              {...form.getInputProps("linkedin")}
            />
            <TextInput
              leftSection={<IconBrandFacebookFilled size={50} stroke={2} />}
              classNames={{
                section: "ml-4",
                input:
                  "w-full pl-16 bg-transparent border-2 border-black text-xl py-3 text-white font-fira pl-10 h-[60px] px-4 py-2 rounded-full w-[150px]",
              }}
              className="w-full"
              {...form.getInputProps("facebook")}
            />
            <TextInput
              leftSection={<IconBrandInstagram size={50} stroke={2} />}
              classNames={{
                section: "ml-4",
                input:
                  "w-full pl-16 bg-transparent border-2 border-black text-xl py-3 text-white font-fira pl-10 h-[60px] px-4 py-2 rounded-full w-[150px]",
              }}
              className="w-full"
              {...form.getInputProps("instagram")}
            />
            <TextInput
              leftSection={<IconBrandX size={50} stroke={2} />}
              classNames={{
                section: "ml-4",
                input:
                  "w-full pl-16 bg-transparent border-2 border-black text-xl py-3 text-white font-fira pl-10 h-[60px] px-4 py-2 rounded-full w-[150px]",
              }}
              className="w-full"
              {...form.getInputProps("x")}
            />
          </Center>
        </Tabs.Panel>
        <Center className="w-full h-[10%] gap-6">
          {activeTab !== "first" && (
            <Button
              onClick={() => setActiveTab(getPrevTab(activeTab))}
              className="bg-white text-black border-2 border-black font-bebus text-2xl h-[45px] px-4 py-2 rounded-full w-[150px]"
            >
              Previous
            </Button>
          )}
          {activeTab !== "fourth" && (
            <Button
              onClick={() => setActiveTab(getNextTab(activeTab))}
              className="bg-black text-white border-2 border-black font-bebus text-2xl h-[45px] px-4 py-2 rounded-full w-[150px]"
            >
              Next
            </Button>
          )}
          {activeTab === "fourth" && (
            <Button
              onClick={async () => {
                const formData = new FormData();
                formData.append("name", form.values.name);
                formData.append("department", form.values.department);
                formData.append("section", form.values.section);
                formData.append("linkedin", form.values.linkedin);
                formData.append("facebook", form.values.facebook);
                formData.append("instagram", form.values.instagram);
                formData.append("x", form.values.x);
                formData.append("aboutMe", form.values.aboutMe);
                const date = form.values.dateOfBirth;
                const dateOfBirth = `${date.getDate()}-${date.getMonth() + 1
                  }-${date.getFullYear()}`;
                formData.append("dateOfBirth", dateOfBirth);
                if (form.values.newImageFile !== null)
                  formData.append("image", form.values.newImageFile);
                const updateUserProfileDispatch = await dispatch(
                  updateUserProfile(formData)
                );
                if (
                  updateUserProfile.fulfilled.match(updateUserProfileDispatch)
                ) {
                  if (updateUserProfileDispatch.payload.status === 200) {
                    form.reset();
                    close();
                  } else {
                    showNotification("OOPS", "Something went wrong", "error");
                  }
                }
              }}
              className="bg-black text-white border-2 border-black font-bebus text-2xl h-[45px] px-4 py-2 rounded-full w-[150px]"
            >
              Done
            </Button>
          )}
        </Center>
      </Tabs>
    </Modal>
  );
};

export default UpdateProfile;
