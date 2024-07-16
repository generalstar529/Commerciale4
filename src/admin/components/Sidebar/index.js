import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

function Sidebar() {
    let getPathName = window.location.pathname;
    const pathName = ["/admin", "/admin/verified", "/admin/account"];
    if (getPathName === pathName[0]) {
        getPathName = 1;
    } else if (getPathName === pathName[1]) {
        getPathName = 2;
    } else if (getPathName === pathName[2]) {
        getPathName = 3;
    }
    const [isActive, setActive] = useState(getPathName);
    const menuArray = [
        {
            id: 1,
            to: pathName[0],
            title: "Pending",
            icon: "fa fa-address-card mr-4",
        },
        {
            id: 2,
            to: pathName[1],
            title: "Verified",
            icon: "fa fa-check mr-4",
        },
        { id: 3, to: pathName[2], title: "Account", icon: "fa fa-user mr-4" },
    ];
    return (
        <div className="sidebar-main container">
            <div className="d-flex pt-4 h-line" style={{ height: "75px" }}>
                <Image
                    src="/images/logo.svg"
                    roundedCircle
                    className="mr-2"
                    // style={{ width: "30px", height: "30px" }}
                />
                {/* <h4>Commericale</h4> */}
            </div>
            <div>
                <ul className="tab-flex-column mt-3">
                    {menuArray.map((item) => (
                        <li key={item.id}>
                            <Link
                                className={isActive === item.id ? "menu-active" : ""}
                                to={item.to}
                                onClick={() => {
                                    setActive(item.id);
                                }}
                            >
                                <i className={item.icon}></i>
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
