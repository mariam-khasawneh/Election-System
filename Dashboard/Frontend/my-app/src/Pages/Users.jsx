import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Tooltip,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    IconButton,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

const TABS = [
    { label: "عرض الكل", value: "all" },
    { label: "مفوض", value: "organizers" },
    { label: "غير مفوض", value: "non-organizers" },
];

const TABLE_HEAD = ["الأسم", "البريد الالكتروني", "الجنس", "العمر", "المدينة", "الديانة", "العنوان الاقتراع", "الوضع", "تعديل"];

function Users() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(15);
    const [editingUser, setEditingUser] = useState(null);
    const [editedEmail, setEditedEmail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers(activeTab);
    }, [activeTab, users]);

    const fetchUsers = () => {
        axios.get("http://localhost:3000/api/users")
            .then(response => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    };

    const filterUsers = (tab) => {
        if (tab === "organizers") {
            setFilteredUsers(users.filter(user => user.isOrganizer));
        } else if (tab === "non-organizers") {
            setFilteredUsers(users.filter(user => !user.isOrganizer));
        } else {
            setFilteredUsers(users);
        }
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.city.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    };

    const openModal = (user) => {
        setEditingUser(user);
        setEditedEmail(user.email);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setEditedEmail("");
    };

    const saveEditedEmail = () => {
        if (editingUser) {
            axios.put(`http://localhost:3000/api/users/${editingUser.N_Id}/email`, { email: editedEmail })
                .then(() => {
                    const updatedUsers = users.map(user =>
                        user.N_Id === editingUser.N_Id ? { ...user, email: editedEmail } : user
                    );
                    setUsers(updatedUsers);
                    setFilteredUsers(updatedUsers);
                    closeModal();
                })
                .catch(error => {
                    console.error("Error updating email:", error);
                });
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="h-full w-full p-16">
            <Card>
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                قائمة الأعضاء
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                اطلع على معلومات حول جميع الأعضاء
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value={activeTab} className="w-full md:w-max">
                            <TabsHeader className="flex">
                                {TABS.map(({ label, value }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        onClick={() => setActiveTab(value)}
                                        className={`w-20 p-2 ml-3 text-center rounded-md ${activeTab === value ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                                            } hover:bg-blue-400 hover:text-white transition-all duration-300 ease-in-out`}
                                    >
                                        {label}
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                onChange={handleSearch}
                                placeholder="بحث"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map(
                                ({ N_Id, name, email, gender, age, city, religion, polling_address, isOrganizer }, index) => {
                                    const isLast = index === currentUsers.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={N_Id}>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {email}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {gender}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {age}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {city}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {religion}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {polling_address}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={isOrganizer ? "Organizer" : "Non-Organizer"}
                                                    color={isOrganizer ? "green" : "blue-gray"}
                                                />
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="Edit">
                                                    <IconButton variant="text" size="sm" color="blue" onClick={() => openModal({ N_Id, email })}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Button
                        variant="outlined"
                        size="sm"
                        color="blue-gray"
                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map((page) => (
                            <IconButton
                                key={page + 1}
                                variant="text"
                                color="blue-gray"
                                size="sm"
                                onClick={() => paginate(page + 1)}
                                className={currentPage === page + 1 ? "bg-blue-500 text-white" : ""}
                            >
                                {page + 1}
                            </IconButton>
                        ))}
                    </div>
                    <Button
                        variant="outlined"
                        size="sm"
                        color="blue-gray"
                        onClick={() => currentPage < Math.ceil(filteredUsers.length / usersPerPage) && paginate(currentPage + 1)}
                    >
                        Next
                    </Button>
                </CardFooter>
            </Card>

            {/* Modal */}
            <Dialog open={isModalOpen} onClose={closeModal}>
                <DialogHeader>تعديل البريد الإلكتروني</DialogHeader>
                <DialogBody divider>
                    <label htmlFor="email" className="text-gray-700">
                        البريد الإلكتروني
                    </label>
                    <Input
                        id="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        className="w-full"
                    />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        className="bg-red-600 text-white w-12 m-3"
                        onClick={closeModal}
                    >
                        <span>الغاء</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="blue"
                        className="bg-blue-600 text-white w-20 m-3"
                        onClick={saveEditedEmail}
                    >
                        <span>حفظ</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default Users;
