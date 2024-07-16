import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { requestAPI } from "../../utils/api";
import SpinnerView from "../../components/SpinnerView";
import { STRINGS } from "../../utils/strings";

function Pending() {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [pageRangeDisplayed] = useState(5);
    const [itemsToShow, setItemsToShow] = useState([]);
    const [isProcessing, setProcessing] = useState(false);

    useEffect(() => {
        getPendingUsers();
    }, []);

    const getPendingUsers = async () => {
        setProcessing(true);
        let response = await requestAPI("/admin/pending", "GET");
        let result = await response.json();
        setProcessing(false);
        if (result.error) {
            alert(STRINGS[result.error]);
            return;
        }
        refreshPendingUsers(result);
    };

    const refreshPendingUsers = (users) => {
        setPendingUsers(users);
        setItemsToShow(users.slice(0, itemsPerPage));
        setActivePage(1);
    };

    const removeUserFromList = (id) => {
        pendingUsers.splice(
            pendingUsers.findIndex((user) => user.id === id),
            1
        );
        refreshPendingUsers(pendingUsers);
    };

    const handlePageChange = (pageNumber) => {
        let startIndex = (pageNumber - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        setItemsToShow(pendingUsers.slice(startIndex, endIndex));
        setActivePage(pageNumber);
    };

    const handleClickAccept = async (id) => {
        setProcessing(true);
        let response = await requestAPI(`/admin/${id}/approve`, "POST");
        let result = await response.json();
        setProcessing(false);
        if (result.error) {
            alert(STRINGS[result.error]);
            return;
        }
        removeUserFromList(id);
    };

    const handleClickDelete = async (id) => {
        if (window.confirm("Do you really want to delete?")) {
            setProcessing(true);
            let response = await requestAPI(`/companies/${id}`, "DELETE");
            let result = await response.json();
            setProcessing(false);
            if (result.error) {
                alert(STRINGS[result.error]);
                return;
            }
            removeUserFromList(id);
        }
    };

    return (
        <div className="table-form">
            <div className="des-table">
                <div style={{ fontSize: 18 }}>Pending User List</div>
                <div style={{ fontSize: 22 }}>Total : {pendingUsers.length} </div>
            </div>

            <div className="body-table">
                {/* <InputGroup className="search-input">
                    <FormControl aria-describedby="basic-addon1" />
                </InputGroup> */}
                <div className="pagination-container">
                    <Pagination
                        prevPageText="prev"
                        nextPageText="next"
                        firstPageText={<i className="fa fa-long-arrow-left"></i>}
                        lastPageText={<i className="fa fa-long-arrow-right"></i>}
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={pendingUsers.length}
                        pageRangeDisplayed={pageRangeDisplayed}
                        onChange={handlePageChange}
                        activeLinkClass="active-color"
                    />
                </div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Official name</th>
                            <th>City</th>
                            <th>Vat number</th>
                            <th>ATECO</th>
                            <th>PEC</th>
                            <th>Email</th>
                            <th style={{ width: 180 }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!itemsToShow || !itemsToShow.length ? (
                            <tr>
                                <td colSpan={8} className="text-center">
                                    No pending users
                                </td>
                            </tr>
                        ) : (
                            itemsToShow.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{itemsPerPage * (activePage - 1) + index + 1}</td>
                                    {/* <td>{user.officialName.substr(0, 5) + "..."}</td> */}
                                    <td>{user.profile.officialName}</td>
                                    <td>{user.profile.contact.city}</td>
                                    <td>{user.profile.vat}</td>
                                    <td>{user.profile.ateco}</td>
                                    <td>{user.profile.pec}</td>
                                    <td>{user.account.email}</td>
                                    <td>
                                        <button type="button" className="btn btn-outline-success btn-sm btn-size mr-2" onClick={() => handleClickAccept(user._id)}>
                                            Accept
                                        </button>
                                        <button type="button" className="btn btn-outline-danger btn-sm btn-size" onClick={() => handleClickDelete(user._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
            {isProcessing && <SpinnerView />}
        </div>
    );
}

export default Pending;
