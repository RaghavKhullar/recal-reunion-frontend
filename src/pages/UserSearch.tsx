//data
//react imports
import { useEffect,useState } from "react";
import { CSSProperties } from "react";
import Select from "react-select";

import facebook from "../assets/facebook.svg";
import filter from "../assets/filter.svg";
import linkedIn from "../assets/linkedIn.svg";
//images
import searchLight from "../assets/Search_light.svg";
import sort from "../assets/sort.svg";
import twitter from "../assets/twitter.svg";
import vector from "../assets/vector.svg";
import { searchUsers } from "../utils/getUserDetails";
import { getUserDetails } from "../utils/getUserDetails";
//css
import style from "./userSearch.module.css";

// import reactSelect from "react-select";

interface UserDataItem {
	user: {
		name: string;
		email: string;
		department: string;
		roll: string;
		section: string;
	};
	imagePath: string;
}

interface RadioButtonOption {
	value: string;
	label: string;
}

interface RadioButtonGroupProps {
	options: RadioButtonOption[];
	selectedOption: string;
	onOptionChange: (value: string) => void;
}

const SearchBar: React.FC<{
	onSearch: (query: string) => void;
	setUserData: React.Dispatch<React.SetStateAction<UserDataItem[]>>;
}> = ({ onSearch, setUserData }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [department, setDepartment] = useState("");

	const handleSearch = async () => {
		const data = await searchUsers(searchQuery, department);
		setDepartment(department);
		onSearch(data);

		const userDataArray: UserDataItem[] = data.data;

		setUserData(userDataArray);
	};

	return (
		<div className={style.searchBar}>
			<img
				src={searchLight}
				alt="Search"
				onClick={handleSearch}
				className={style.searchButton}
			/>
			<div className={style.searchInput}>
				<input
					type="text"
					placeholder="SEARCH FOR FRIENDS"
					value={searchQuery}
					className={style.searchInput}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
		</div>
	);
};

const DepartmentBar: React.FC<{ onSearch: (query: string) => void }> = ({
	onSearch,
}) => {
	// import Select from reactSelect
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = async () => {
		setSearchQuery(searchQuery);
		onSearch(searchQuery);
	};

	const departments = [
		{ value: "CSE", label: "CSE" },
		{ value: "Mech", label: "Mech" },
		{ value: "Civil", label: "Civil" },
		{ value: "ECE", label: "ECE" },
		{ value: "EEE", label: "EEE" },
		{ value: "ICE", label: "ICE" },
		{ value: "Prod", label: "Prod" },
		{ value: "MME", label: "MME" },
	];

	const customStyles: {
		[key: string]: (base: CSSProperties) => CSSProperties;
	} = {
		control: (provided: CSSProperties) => ({
			...provided,
			borderRadius: "5rem",
			backgroundColor: "var(--creme-yellow, #e7e6b6)",

			display: "flex",
			position: "relative",
			// padding:"16px",
			width: "200%",
			border: "2px solild black",
			height: "1.75rem",
			alignItems: "center",
			justifyContent: "center",
		}),
		// Add more styles as needed
	};

	return (
		<div
			className={style.searchBar}
			style={{ justifyContent: "space-between", height: "1rem" }}
		>
			<div className={style.searchInput}>
				<Select
					options={departments}
					onChange={(selectedOption) => {
						if (selectedOption) {
							onSearch(selectedOption.value);
						}
					}}
					// className={style.searchBar}
					styles={customStyles}
				/>
			</div>
			<img
				src={vector}
				alt="Search"
				onClick={handleSearch}
				className={style.searchButton}
			/>
		</div>
	);
};

const SectionBar: React.FC<{ onSearch: (query: string) => void }> = ({
	onSearch,
}) => {
	const [searchQuery, setSearchQuery] = useState("");
	const handleSearch = () => {
		onSearch(searchQuery);
	};

	return (
		<div
			className={style.searchBar}
			style={{
				justifyContent: "space-between",
				height: "1rem",
				margin: "auto",
			}}
		>
			<div className={style.searchInput}>
				<input
					type="text"
					placeholder="Section"
					value={searchQuery}
					className={style.searchInput}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
			<img
				src={vector}
				alt="Search"
				onClick={handleSearch}
				className={style.searchButton}
			/>
		</div>
	);
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
	options,
	selectedOption,
	onOptionChange,
}) => (
	<div>
		{options.map((option) => (
			<label key={option.value}>
				<input
					type="radio"
					value={option.value}
					checked={selectedOption === option.value}
					onChange={(e) => onOptionChange(e.target.value)}
				/>
				{option.label}
			</label>
		))}
	</div>
);

const UserSearch: React.FC = () => {
	const [loggedInUserDepartment, setLoggedInUserDepartment] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [department, setDepartment] = useState("Civil");
	const [users, setUsers] = useState<UserDataItem[]>([]);
	const [sortOrder, setSortOrder] = useState("asc");
	const [isFilterOpen, setIsFilterOpen] = useState(true);
	const [isSortOpen, setIsSortOpen] = useState(false);

	const sortOptions = [
		{ value: "asc", label: "Name-Ascending" },
		{ value: "desc", label: "Name-Descending" },
	];

	useEffect(() => {
		const fetchLoggedInUserDepartment = async () => {
			try {
				const userDetails = await getUserDetails();
				setLoggedInUserDepartment(userDetails.department);
			} catch (error) {
				console.error("Error fetching user details", error);
			}
		};

		fetchLoggedInUserDepartment();
	}, []);

	useEffect(() => {
		const fetchUsersByDepartment = async () => {
			try {
				const data = await searchUsers("", loggedInUserDepartment);
				const userDataArray: UserDataItem[] = data.data;
				setUsers(userDataArray);
			} catch (error) {
				console.error("Error fetching users by department", error);
			}
		};

		fetchUsersByDepartment();
	}, [loggedInUserDepartment]);

	const handleSearchQueryChange = async (query: string) => {
		setSearchQuery(query);

		try {
			const data = await searchUsers(query, loggedInUserDepartment);
			const userDataArray: UserDataItem[] = data.data;
			setUsers(userDataArray);
		} catch (error) {
			console.error("Error searching users", error);
		}
	};

	const handleDepartmentChange = (dept: string) => {
		setDepartment(dept);
	};

	const handleSortChange = (value: string) => {
		setSortOrder((prevSortOrder) =>
			prevSortOrder === value ? (value === "asc" ? "desc" : "asc") : value
		);
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data = await searchUsers(searchQuery, department);
				const userDataArray: UserDataItem[] = data.data;
				userDataArray.sort((a, b) => {
					if (a.user.name.toLowerCase() < b.user.name.toLowerCase())
						return sortOrder === "asc" ? -1 : 1;
					if (a.user.name.toLowerCase() > b.user.name.toLowerCase())
						return sortOrder === "asc" ? 1 : -1;
					return 0;
				});
				setUsers(userDataArray);
			} catch (error) {
				console.error("Error fetching user data", error);
			}
		};

		fetchUserData();
	}, [searchQuery, department, sortOrder]);

	const handleSortOrderChange = () => {
		setIsSortOpen((prev) => !prev);
		setIsFilterOpen(false);
	};

	const handleFilterOrderChange = () => {
		setIsFilterOpen((prev) => !prev);
		setIsSortOpen(false);
	};

	return (
		<>
			<div className={style.searchPage}>
				<div className={style.navBar}>Navbar</div>
				<div className={style.searchContainer}>
					<div className={style.gridContainer}>
						{users.map((user, index) => (
							<div key={index} className={style.gridUser}>
								<div
									className={style.innerGrid}
									style={{
										backgroundImage: `url(${user.imagePath})`,
									}}
								>
									<div className={style.gridContent}>
										<div className={style.name}>
											{user.user.name}{" "}
										</div>
										<div className={style.name}>
											{" "}
											{user.user.roll}{" "}
										</div>
										<div className={style.socialMedia}>
											<img
												src={twitter}
												className={style.searchButton}
												alt="twitter"
											/>
											<img
												src={linkedIn}
												className={style.searchButton}
												alt="linkedin"
											/>
											<img
												src={facebook}
												className={style.searchButton}
												alt="facebook"
											/>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className={style.mainContainer}>
						<SearchBar
							onSearch={handleSearchQueryChange}
							setUserData={setUsers}
						/>

						<div className={style.sortFilterContainer}>
							<div
								className={style.sortContainer}
								style={{
									backgroundColor: isSortOpen ? "white" : "",
								}}
								onClick={handleSortOrderChange}
							>
								<img
									src={sort}
									alt="Sort"
									className={style.searchButton}
								/>
								<div className={style.sort}>SORT</div>
							</div>

							<div className={style.line}> </div>

							{/* filter */}
							<div
								className={style.sortContainer}
								style={{
									backgroundColor: isFilterOpen
										? "white"
										: "",
								}}
								onClick={handleFilterOrderChange}
							>
								<img
									src={filter}
									alt="Filter"
									className={style.searchButton}
								/>
								<div className={style.sort}> FILTER</div>
							</div>
						</div>
						{isFilterOpen && (
							<DepartmentBar onSearch={handleDepartmentChange} />
						)}
						{isFilterOpen && (
							<SectionBar onSearch={handleSearchQueryChange} />
						)}
						{isSortOpen && !isFilterOpen && (
							<RadioButtonGroup
								options={sortOptions}
								selectedOption={sortOrder}
								onOptionChange={handleSortChange}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export { UserSearch };
