import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "./index.css";
import { SESSION_ADMIN } from "../../../utils";
function Header() {
    let getSession = JSON.parse(sessionStorage.getItem(SESSION_ADMIN));
    const handleLogout = () => {
        sessionStorage.removeItem(SESSION_ADMIN);
        window.location.href = "/admin";
    };
    return (
        <div>
            <div className="header">
                <DropdownButton id="dropdown-basic-button" title={getSession.username} className="float-right mr-3" style={{ border: "1px solid #eee", borderRadius: 4 }}>
                    <Dropdown.Item onClick={handleLogout}> Log out </Dropdown.Item>
                </DropdownButton>
            </div>
        </div>
    );
}

export default Header;
