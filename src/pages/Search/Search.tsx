import {
  Box,
  Button,
  Center,
  Group,
  Loader,
  Radio,
  Select,
  SimpleGrid,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import { ProfileCard } from "../../components";
import {
  IconSearch,
  IconArrowsSort,
  IconFilter,
  IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store/hooks";
import { searchUser } from "../../redux/actions";
import { BACKEND_URL } from "../../../config";
import { showNotification } from "../../helpers/helpers";
import { useMediaQuery } from "@mantine/hooks";

type Friend = {
  id: string;
  name: string;
  department: string;
  imageURL: string;
  socials: {
    name: string;
    link: string;
  }[];
};

const Search = () => {
  const [activeTab, setActiveTab] = useState<"sort" | "filter">("sort");
  const [sortMethod, setSortMethod] = useState<
    "name-asc" | "name-desc" | "rollNo-asc" | "rollNo-desc"
  >("name-asc");
  const [filterDepartment, setFilterDepartment] = useState<string | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [visibleFriends, setVisibleFriends] = useState<Friend[]>([]);

  const dispatch = useAppDispatch();

  const fetchAllFriends = async (name: string) => {
    setError(null);
    setLoading(true);
    const searchUserDispatch = await dispatch(searchUser(name));
    if (searchUser.fulfilled.match(searchUserDispatch)) {
      if (searchUserDispatch.payload.status === 200) {
        const friends = searchUserDispatch.payload.data.data.map(
          (friend: any) => {
            const socials = [];

            if (friend.x && friend.x.length !== 0) {
              socials.push({
                name: "X",
                link: friend.x.includes("twitter.com")
                  ? friend.x
                  : "https://twitter.com/" + friend.x,
              });
            }

            if (friend.linkedin && friend.linkedin.length !== 0) {
              socials.push({
                name: "LinkedIn",
                link: friend.linkedin.includes("linkedin.com")
                  ? friend.linkedin
                  : "https://linkedin.com/in/" + friend.linkedin,
              });
            }

            if (friend.facebook && friend.facebook.length !== 0) {
              socials.push({
                name: "Facebook",
                link: friend.facebook.includes("facebook.com")
                  ? friend.facebook
                  : "https://facebook.com/" + friend.facebook,
              });
            }

            return {
              id: friend._id,
              name: friend.name,
              department: friend.department,
              // if friend.image is null we should display the default image, which will be handled by this case
              imageURL: BACKEND_URL + "/images/profiles/" + friend.image,
              socials: socials,
            };
          }
        );
        setFriends(friends);
        setVisibleFriends(friends);
      }
    } else {
      setError("Some error occured");
    }
    setLoading(false);
  };

  useEffect(() => {
    const sortedFriends = [...friends];
    switch (sortMethod) {
      case "name-asc":
        sortedFriends.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedFriends.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    setVisibleFriends(sortedFriends);
  }, [sortMethod]);

  useEffect(() => {
    let filteredFriends = [...friends];
    if (filterDepartment) {
      filteredFriends = filteredFriends.filter(
        (friend) => friend.department === filterDepartment
      );
    }
    setVisibleFriends(filteredFriends);
  }, [filterDepartment]);

  useEffect(() => {
    setVisibleFriends([...friends]);
  }, [activeTab]);
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box className="h-full w-full px-[5%] flex flex-col-reverse sm:flex-row">
      <SimpleGrid className="grid-cols-2 xl:grid-cols-3 h-full w-full sm:h-[95%] sm:w-[60%] overflow-y-auto scrollbar-hide">
        {loading && (
          <Center className="w-full h-full">
            <Loader />
          </Center>
        )}
        {error && (
          <Center className="w-full h-full">
            <Text className="text-xl sm:text-2xl font-bebus">
              Some Error Occured
            </Text>
          </Center>
        )}
        {visibleFriends &&
          (visibleFriends.length === 0 && !loading ? (
            <Center className="w-full h-full pl-10">
              <p className="pl-44 text-3xl sm:text-2xl font-bebus">
                Search for Friends
              </p>
            </Center>
          ) : (
            visibleFriends.map((friend) => (
              <ProfileCard key={friend.id} user={friend} />
            ))
          ))}
      </SimpleGrid>
      <Center
        style={{
          boxShadow: "-8px 8px 40px 0px rgba(0, 0, 0, 0.20)",
        }}
        className="flex h-[100%] w-full sm:h-[95%] sm:w-[40%] mb-4 mt-4 rounded-[20px] border-[1px] border-opacity-40 border-black"
      >
        <Center className="h-[90%] w-[90%] flex flex-col">
          <Center className="w-full h-[20%] mb-8 items-start">
            <TextInput
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              classNames={{
                root: "w-full",
                input:
                  "bg-transparent w-full rounded-full text-xl sm:text-3xl font-bebus border-[2px] border-black py-2 px-2 pl-16 h-[70px] placeholder:text-black placeholder:opacity-25",
                section: "bg-transparent w-[100px] pr-4",
              }}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  fetchAllFriends(name);
                }
              }}
              leftSection={
                <IconSearch
                  onClick={() => fetchAllFriends(name)}
                  opacity={0.7}
                  color="#000000"
                  size={40}
                  cursor={"pointer"}
                />
              }
              placeholder="SEARCH FOR FRIENDS"
            />
          </Center>
          <Tabs
            value={activeTab}
            onChange={(value) =>
              setActiveTab(value === "sort" ? "sort" : "filter")
            }
            className="w-full h-[50%]"
            variant="unstyled"
            defaultValue="sort"
          >
            <Tabs.List className="w-full flex flex-row justify-between items-center h-[50px]">
              <Tabs.Tab
                value="sort"
                className={
                  "rounded-full w-[45%] border-solid border-black border-2 p-0 pt-1" +
                  (activeTab === "sort" ? " bg-white" : "")
                }
                leftSection={<IconArrowsSort />}
              >
                <Text className="text-xl sm:text-2xl font-bebus">Sort</Text>
              </Tabs.Tab>
              <Box className="h-[50%] rounded-lg w-[2px] bg-black bg-opacity-40"></Box>
              <Tabs.Tab
                value="filter"
                className={
                  "rounded-full w-[45%] border-solid border-black border-2 p-0 pt-1" +
                  (activeTab === "filter" ? " bg-white" : "")
                }
                leftSection={<IconFilter />}
              >
                <Text className="text-xl sm:text-2xl font-bebus">Filter</Text>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel
              className="h-[calc(100%-50px)] pt-5 w-full"
              value="sort"
            >
              <Radio.Group
                value={sortMethod}
                onChange={(value) => setSortMethod(value as any)}
              >
                <Center
                  className={
                    `w-full justify-start cursor-pointer` +
                    (isMobile ? "" : " h-[75px]")
                  }
                >
                  <Radio
                    value="name-asc"
                    classNames={{
                      label: "text-xl sm:text-2xl font-fira",
                      body: "flex flex-row items-center",
                    }}
                    label="Name - Ascending"
                  />
                </Center>
                <Center
                  className={
                    "w-full justify-start cursor-pointer" +
                    (isMobile ? "" : " h-[75px]")
                  }
                >
                  <Radio
                    classNames={{
                      label: "text-xl sm:text-2xl font-fira",
                      body: "flex flex-row items-center",
                    }}
                    value="name-desc"
                    label="Name - Descending"
                  />
                </Center>
              </Radio.Group>
            </Tabs.Panel>
            <Tabs.Panel
              className="h-[calc(100%-50px)] pt-5 w-full"
              value="filter"
            >
              <SimpleGrid cols={1}>
                <Select
                  value={filterDepartment}
                  onChange={(value) => setFilterDepartment(value as any)}
                  classNames={{
                    wrapper: "rounded-full px-5 py-3 border-[2px] border-black",
                    input:
                      "text-[1.25rem] sm:text-3xl font-fira placeholder:text-black",
                    section: "text-black pr-4",
                    dropdown:
                      "rounded-b-lg translate-y-3 border-[2px] border-black bg-[#e7e6b6]",
                    option:
                      "text-[1.25rem] sm:text-2xl font-fira hover:bg-[#f5f5bd] hover:text-black",
                  }}
                  variant="unstyled"
                  rightSection={
                    <IconTriangleInvertedFilled size={20} color="#000000" />
                  }
                  placeholder="Department"
                  data={["CSE", "ECE", "EEE", "ME", "CE", "CHE", "MME", "PE"]}
                />
              </SimpleGrid>
            </Tabs.Panel>
            <Center>
              <Button
                className="bg-black text-white border-2 border-black font-bebus text-2xl h-[45px] px-4 py-2 rounded-full w-[150px]"
                onClick={() => fetchAllFriends(name)}
              >
                Search
              </Button>
            </Center>
          </Tabs>
        </Center>
      </Center>
    </Box>
  );
};

export default Search;
