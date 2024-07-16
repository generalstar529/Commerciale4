import React, { Component } from "react";
import "./index.css";
import DetailOverview from "../Overview";
import DetailProduct from "../Product";
import DetailContacts from "../Contacts";
import { stringWithUnitFromNumber, getCompanyTypeText, getAtecoStringWithCode } from "../../../utils";
import { LangConsumer } from "../../../utils/LanguageContext";
import { STRINGS } from "../../../utils/strings";

export default class DetailBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMenu: 0,
            isMobile: false,
            panelHeightMax: 0,
        };

        this.menuPanel = React.createRef();

        this.aboutUsPanel = React.createRef();
        this.productsPanel = React.createRef();
        this.contactsPanel = React.createRef();
    }

    componentDidMount = () => {
        this.handleWindowResize();
        window.addEventListener("resize", this.handleWindowResize);
        if (window.innerWidth <= 576) {
            window.addEventListener("scroll", this.handleWindowScroll);
        }
        this.aboutUsPanel.current.style.display = "block";
        this.productsPanel.current.style.display = "none";
        this.contactsPanel.current.style.display = "none";
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
        if (window.innerWidth <= 576) {
            window.removeEventListener("scroll", this.handleWindowScroll);
        }
    }

    // componentWillReceiveProps = (props) => {
    //     let panels = [this.aboutUsPanel.current, this.productsPanel.current, this.contactsPanel.current];
    //     panels.forEach((panel) => {
    //         if (panel) {
    //             panel.style.width = "auto";
    //             console.log(panel.clientHeight);
    //         }
    //     });
    // };

    componentDidUpdate = () => {
        let maxHeight = 0;
        let panels = [this.aboutUsPanel.current, this.productsPanel.current, this.contactsPanel.current];
        panels.forEach((panel) => {
            panel.style.display = "block";
            panel.style.height = "auto";
        });
        maxHeight = Math.max(panels[0].clientHeight, panels[1].clientHeight, panels[2].clientHeight);
        panels.forEach((panel, index) => {
            if (window.innerWidth > 576) {
                panel.style.height = maxHeight + "px";
            }
            if (this.state.selectedMenu !== index) {
                panel.style.display = "none";
            }
        });
    };

    handleWindowResize = () => {
        this.setState({ isMobile: window.innerWidth <= 576 });
    };

    handleWindowScroll = () => {
        const currentScrollPos = window.pageYOffset;

        let leftPanel = document.querySelector(".detail-body .left-panel");

        if (currentScrollPos > 259) {
            this.menuPanel.current.style.position = "fixed";
            this.menuPanel.current.style.top = "87px";
            leftPanel.style.marginBottom = "41px";
        } else {
            this.menuPanel.current.style.position = "relative";
            this.menuPanel.current.style.top = 0;
            leftPanel.style.marginBottom = 0;
        }

        this.setState({ prevScrollpos: currentScrollPos });
    };

    handleChangeMenu = (selectedMenu) => {
        this.setState({ selectedMenu });
    };

    render() {
        const { company } = this.props;
        const { selectedMenu, isMobile } = this.state;

        const MENUS = [
            { id: 0, title: STRINGS.aboutUs, icon: "fa-user" },
            { id: 1, title: STRINGS.productSearvice, icon: "fa-cogs" },
            {
                id: 2,
                title: isMobile ? STRINGS.contactsInfo : STRINGS.contacts,
                icon: "fa-info-circle",
            },
        ];
        const menuPanel = (
            <div className="menu-panel" ref={this.menuPanel}>
                {MENUS.map((menu) => (
                    <div key={menu.id} className={`menu ${selectedMenu === menu.id ? "active" : ""}`} onClick={() => this.handleChangeMenu(menu.id)}>
                        {!isMobile && <i className={`fa ${menu.icon} pr-3`} />}
                        {menu.title}
                    </div>
                ))}
                <hr />
            </div>
        );

        const tagsPanel = !isMobile && (
            <div className="multi-values">
                <i className="fa fa-tags" />
                <div>
                    <LangConsumer>
                        {(value) =>
                            company &&
                            company.profile &&
                            (value.lang === "en"
                                ? company.profile.tags.en && company.profile.tags.en.map((tag, index) => <label key={index}>{tag}</label>)
                                : company.profile.tags.it && company.profile.tags.it.map((tagIt, index) => <label key={index}>{tagIt}</label>))
                        }
                    </LangConsumer>
                </div>
            </div>
        );

        const isoPanel = !isMobile && (
            <div className="multi-values">
                <span>{STRINGS.iso}</span>
                <div className="font-size-style">
                    {company &&
                        company.profile &&
                        company.profile.iso &&
                        company.profile.iso.map((item, index) => (
                            <label key={index} className="no-bg" style={{ textDecoration: "underline" }}>
                                {item}
                            </label>
                        ))}
                </div>
            </div>
        );

        const infoPanel = (
            <div className="info-panel">
                <div className="row-on-mobile">
                    <p className={isMobile ? "" : "font-size-style"}>
                        <i className="fa fa-users" />
                        {company && company.profile && stringWithUnitFromNumber(company.profile.employees)}
                    </p>
                    <p className={isMobile ? "" : "font-size-style"}>
                        <i className="fa fa-line-chart" />
                        {company && company.profile && stringWithUnitFromNumber(company.profile.revenues)}
                    </p>
                    {isoPanel}
                    <div className="multi-values">
                        <span className="pt-0">{STRINGS.ateco}</span>
                        <div className={isMobile ? "" : "font-size-style"}>
                            {company && company.profile && company.profile.ateco ? (
                                isMobile ? (
                                    company.profile.ateco
                                ) : (
                                    getAtecoStringWithCode(company.profile.ateco)
                                )
                            ) : (
                                <div />
                            )}
                        </div>
                    </div>
                </div>
                <p className="-type mb-0">
                    <span className="text-uppercase">{STRINGS.type}</span>
                    {company && company.profile && getCompanyTypeText(company.profile.type)}
                </p>
                {tagsPanel}
            </div>
        );

        return (
            <div className="detail-body">
                <div className="left-panel">
                    {isMobile ? infoPanel : menuPanel}
                    {isMobile ? menuPanel : infoPanel}
                </div>
                <div className="right-panel">
                    <div ref={this.aboutUsPanel}>
                        <DetailOverview company={company} />
                    </div>
                    <div ref={this.productsPanel}>
                        <DetailProduct product={company && company.profile && company.profile.product} />
                    </div>
                    <div ref={this.contactsPanel}>
                        <DetailContacts profile={company && company.profile} />
                    </div>
                    {/* <div className={selectedMenu === 0 ? "d-block" : "d-none"} ref={this.aboutUsPanel}>
						<DetailOverview profile={profile} />
					</div>
					<div className={selectedMenu === 1 ? "d-block" : "d-none"} ref={this.productsPanel}>
						<DetailProduct profile={profile} />
					</div>
					<div className={selectedMenu === 2 ? "d-block" : "d-none"} ref={this.contactsPanel}>
						<DetailContacts profile={profile} />
					</div> */}
                </div>
            </div>
        );
    }
}
