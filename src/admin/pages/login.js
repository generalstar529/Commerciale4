import React, { useState, useRef } from "react";
import { requestAPI } from "../../utils/api";
import SpinnerView from "../../components/SpinnerView";
import { STRINGS } from "../../utils/strings";
import { SESSION_ADMIN } from "../../utils";
function Login() {
    const refUserName = useRef();
    const refPassword = useRef();
    const [isProcessing, setProcessing] = useState(false);

    const handleClickLogin = async () => {
        let userName = refUserName.current.value;
        let password = refPassword.current.value;
        if (!userName || !password) {
            alert("Please enter username or password");
            return;
        }
        setProcessing(true);
        let response = await requestAPI("/admin/login", "POST", { username: userName, password: password });
        let result = await response.json();
        setProcessing(false);
        if (result.error) {
            alert(STRINGS[result.error]);
            return;
        }

        sessionStorage.setItem(SESSION_ADMIN, JSON.stringify(result));
        window.location.href = "/admin";
    };

    return (
        <div className="login_wrapper">
            <div className="login_content">
                <h2>
                    <span>Commerciale4.0</span>
                </h2>
                <div className="pt-5">
                    <input type="text" className="form-control" placeholder="Username" ref={refUserName} />
                </div>
                <div className="pt-3">
                    <input type="password" className="form-control" placeholder="Password" ref={refPassword} />
                </div>
                <div className="pt-3">
                    <button className="btn btn-default" onClick={handleClickLogin}>
                        Log in
                    </button>
                </div>
                <hr></hr>
            </div>
            {isProcessing && <SpinnerView />}
        </div>
    );
}

export default Login;
