import React, { Component } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import ReactTags from "react-tag-autocomplete";
import { Row, Col } from "react-bootstrap";

import "./index.css";
import { N_EMPOYEES, REVENUES, COMPANY_TYPES, REGIONS, maxsFromMin, minsFromMax, CITIES } from "../../utils";
import MySelect from "../Custom/MySelect";
// import SearchInput from "../SearchInput";
import { STRINGS } from "../../utils/strings";

const MAX_TAGS = 5;

export default class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            radius: 0,
            tags: [],
            suggestions: [],
            cities: [],
            types: COMPANY_TYPES(),
            minEmployees: N_EMPOYEES(),
            maxEmployees: N_EMPOYEES(),
            minRevenues: REVENUES(),
            maxRevenues: REVENUES(),
            atecoCodes: STRINGS.atecoList,
            tagsPlaceholder: STRINGS.searchWithTags,

            selectedRegion: null,
            selectedCity: null,
            selectedType: null,
            selectedEmployeeMin: null,
            selectedEmployeeMax: null,
            selectedRevenueMin: null,
            selectedRevenueMax: null,
            selectedCode: null,

            isEnableRadius: false,
        };

        this.refTags = React.createRef();
        // this.refKey = React.createRef();
    }

    componentWillReceiveProps = (props) => {
        const { initialFilter, update } = props;
        let {
            cities,
            tags,
            selectedCity,
            selectedRegion,
            selectedCode,
            selectedType,
            selectedEmployeeMin,
            selectedEmployeeMax,
            selectedRevenueMin,
            selectedRevenueMax,
            radius,
            isEnableRadius,
        } = this.state;

        if (initialFilter && update) {
            if (initialFilter.region) {
                cities = this.getCitiesInRegion(initialFilter.region);
                if (initialFilter.city && initialFilter.city.value) {
                    isEnableRadius = true;
                }
            }

            selectedCity = initialFilter.city;
            selectedRegion = initialFilter.region;
            selectedCode = initialFilter.ateco;
            radius = initialFilter.radius;
            selectedType = initialFilter.type;
            selectedEmployeeMin = initialFilter.employeeMin;
            selectedEmployeeMax = initialFilter.employeeMax;
            selectedRevenueMin = initialFilter.revenueMin;
            selectedRevenueMax = initialFilter.revenueMax;
            tags = initialFilter.tags ? initialFilter.tags : [];
        }

        const types = COMPANY_TYPES();
        const minEmployees = N_EMPOYEES();
        const maxEmployees = N_EMPOYEES();
        const minRevenues = REVENUES();
        const maxRevenues = REVENUES();
        const atecoCodes = STRINGS.atecoList;

        this.resetTagsPlaceholder(tags);

        types.forEach((elem) => {
            if (selectedType && elem.value === selectedType.value) {
                selectedType = elem;
            }
        });
        minEmployees.forEach((elem) => {
            if (selectedEmployeeMin && elem.value === selectedEmployeeMin.value) {
                selectedEmployeeMin = elem;
            }
        });
        maxEmployees.forEach((elem) => {
            if (selectedEmployeeMax && elem.value === selectedEmployeeMax.value) {
                selectedEmployeeMax = elem;
            }
        });
        minRevenues.forEach((elem) => {
            if (selectedRevenueMin && elem.value === selectedRevenueMin.value) {
                selectedRevenueMin = elem;
            }
        });
        maxRevenues.forEach((elem) => {
            if (selectedRevenueMax && elem.value === selectedRevenueMax.value) {
                selectedRevenueMax = elem;
            }
        });
        atecoCodes.forEach((elem) => {
            if (selectedCode && elem.value === selectedCode.value) {
                selectedCode = elem;
            }
        });

        this.setState({
            cities,
            types,
            tags,
            minEmployees,
            maxEmployees,
            minRevenues,
            maxRevenues,
            atecoCodes,
            selectedRegion,
            selectedCity,
            selectedType,
            selectedEmployeeMin,
            selectedEmployeeMax,
            selectedRevenueMin,
            selectedRevenueMax,
            selectedCode,
            radius,
            isEnableRadius,
        });
    };

    getCitiesInRegion = (region) => {
        if (region) {
            return CITIES.filter((city) => city.region === region.value);
        }
        return [];
    };

    handleSliderChange = (radius) => {
        this.setState({ radius });
    };

    handleTypeChange = (selectedType) => {
        this.setState({ selectedType });
    };

    handleRegionChange = (selectedRegion) => {
        this.setState({ selectedRegion });
        let cities = this.getCitiesInRegion(selectedRegion);
        this.setState({
            selectedCity: null,
            cities: cities,
            isEnableRadius: false,
        });
    };

    handleCityChange = (selectedCity) => {
        this.setState({ selectedCity, isEnableRadius: selectedCity != null });
    };

    resetTagsPlaceholder = (tags) => {
        let elem = document.querySelector(".react-tags__search-input");
        if (!elem) {
            return;
        }

        let placeholder = STRINGS.searchWithTags;
        if (tags && tags.length) {
            placeholder = `${STRINGS.max}:${MAX_TAGS}(${STRINGS.left}:${MAX_TAGS - tags.length})`;
        }
        elem.style.width = placeholder.length * 7 + "px";
        this.setState({ tagsPlaceholder: placeholder });
    };

    handleTagDelete = (i) => {
        const tags = this.state.tags.slice(0);
        tags.splice(i, 1);
        this.setState({ tags });
        let elem = document.querySelector(".react-tags__search-input");
        if (elem) {
            elem.style.display = "block";
            elem.focus();
        }
        this.resetTagsPlaceholder(tags);
    };

    handleTagAddition = (tag) => {
        const { tags } = this.state;
        if (!tag.name.trim().length || tags.filter((elem) => elem.name === tag.name).length) {
            return;
        }

        if (tags.length === MAX_TAGS - 1) {
            let elem = document.querySelector(".react-tags__search-input");
            if (elem) {
                elem.style.display = "none";
            }
        }

        const newTags = [].concat(tags, tag);
        this.setState({ tags: newTags });
        this.resetTagsPlaceholder(newTags);
    };

    handleEmployeeMinChange = (selectedEmployeeMin) => {
        this.setState({ selectedEmployeeMin });

        let values = maxsFromMin(selectedEmployeeMin ? selectedEmployeeMin.value : 0, N_EMPOYEES());
        this.setState({
            maxEmployees: values,
        });
    };

    handleEmployeeMaxChange = (selectedEmployeeMax) => {
        this.setState({ selectedEmployeeMax });

        let values = minsFromMax(selectedEmployeeMax ? selectedEmployeeMax.value : 0, N_EMPOYEES());
        this.setState({
            minEmployees: values,
        });
    };

    handleRevenueMinChange = (selectedRevenueMin) => {
        this.setState({ selectedRevenueMin });

        let values = maxsFromMin(selectedRevenueMin ? selectedRevenueMin.value : 0, REVENUES());
        this.setState({
            maxRevenues: values,
        });
    };

    handleRevenueMaxChange = (selectedRevenueMax) => {
        this.setState({ selectedRevenueMax });

        let values = minsFromMax(selectedRevenueMax ? selectedRevenueMax.value : 0, REVENUES());
        this.setState({
            minRevenues: values,
        });
    };

    handleCodeChange = (selectedCode) => {
        this.setState({ selectedCode });
    };

    handleClickSearch = () => {
        let elem = document.querySelector(".react-tags__search-input");
        let tags = this.state.tags.slice(0);

        if (elem) {
            if (elem.value.trim().length) {
                let newTag = { name: elem.value };
                this.handleTagAddition(newTag);
                if (!tags.filter((tag) => tag.name === newTag.name).length) {
                    tags.push(newTag);
                }
            }
            this.refTags.current.state.query = "";
        }

        this.props.handleSearch({
            city: this.state.selectedCity,
            region: this.state.selectedRegion,
            radius: this.state.radius,
            ateco: this.state.selectedCode,
            type: this.state.selectedType,
            employeeMin: this.state.selectedEmployeeMin,
            employeeMax: this.state.selectedEmployeeMax,
            revenueMin: this.state.selectedRevenueMin,
            revenueMax: this.state.selectedRevenueMax,
            tags: tags,
        });
    };

    render() {
        const {
            radius,
            tags,
            suggestions,
            cities,
            minEmployees,
            maxEmployees,
            minRevenues,
            maxRevenues,
            atecoCodes,
            selectedRegion,
            selectedCity,
            selectedEmployeeMin,
            selectedEmployeeMax,
            selectedRevenueMin,
            selectedRevenueMax,
            selectedCode,
            tagsPlaceholder,
            isEnableRadius,
        } = this.state;

        const { isInDashboard } = this.props;

        return (
            <div className="my-form search-form">
                {/* <div className="search-bar-field">
                    <SearchInput ref={this.refKey} />
                </div> */}
                <Row className="mb-2">
                    <Col className="group-title">
                        <i className="fa fa-map-marker pr-2" /> {STRINGS.area}
                    </Col>
                </Row>
                <Row className="px-2 mb-1">
                    <Col sm={isInDashboard ? 12 : 6} xs={12} className="mb-2">
                        <MySelect value={selectedRegion} onChange={this.handleRegionChange} options={REGIONS} placeholder={STRINGS.region} />
                    </Col>
                    <Col sm={isInDashboard ? 12 : 6} xs={12} className="mb-2">
                        <MySelect value={selectedCity} onChange={this.handleCityChange} options={cities} placeholder={STRINGS.city} />
                    </Col>
                </Row>
                <Row
                    className="px-2"
                    style={{
                        opacity: isEnableRadius ? 1 : 0.5,
                    }}
                >
                    <Col xs={6}>{STRINGS.radius}</Col>
                    <Col xs={6}>{radius} km</Col>
                    <Col className="mt-1">
                        <Slider min={0} max={200} value={radius} onChange={isEnableRadius ? this.handleSliderChange : () => {}} />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="mb-2 group-title">
                        <i className="fa fa-info-circle pr-2" /> {STRINGS.companyInfo}
                    </Col>
                </Row>
                {/* <Row className="px-2">
                    <Col>
                        <MySelect value={selectedType} onChange={this.handleTypeChange} options={types} placeholder={STRINGS.typeOfCompany} />
                    </Col>
                </Row> */}
                <Row className="mt-2 px-2">
                    <Col>
                        <div>
                            <ReactTags
                                tags={tags}
                                suggestions={suggestions}
                                placeholderText={tagsPlaceholder}
                                onDelete={this.handleTagDelete.bind(this)}
                                onAddition={this.handleTagAddition.bind(this)}
                                allowNew
                                ref={this.refTags}
                            />
                        </div>
                        <div className="tag-hint">
                            <div className="d-flex">
                                {STRINGS.examples}
                                <span className="ml-1 mr-1">:</span>
                            </div>
                            <div>
                                <label>VERNICIATURA</label>
                                <label>SALDATURA</label>
                                <label>ALLUMINIO</label>
                            </div>

                            {/* <span style={{ float: "right" }}>(Max:7)</span>
                            (Max:5) */}
                        </div>
                    </Col>
                </Row>
                <Row className="mt-2 px-2 align-items-center">
                    <Col className="mb-1" xs={isInDashboard ? 12 : 4}>
                        {STRINGS.nEmployees}
                    </Col>
                    <Col xs={isInDashboard ? 6 : 4}>
                        <MySelect value={selectedEmployeeMin} onChange={this.handleEmployeeMinChange} options={minEmployees} placeholder={STRINGS.min} />
                    </Col>
                    <Col xs={isInDashboard ? 6 : 4}>
                        <MySelect value={selectedEmployeeMax} onChange={this.handleEmployeeMaxChange} options={maxEmployees} placeholder={STRINGS.max} />
                    </Col>
                </Row>
                <Row className="mt-2 px-2 align-items-center">
                    <Col className="mb-1" xs={isInDashboard ? 12 : 4}>
                        {STRINGS.revenues}
                    </Col>
                    <Col xs={isInDashboard ? 6 : 4}>
                        <MySelect value={selectedRevenueMin} onChange={this.handleRevenueMinChange} options={minRevenues} placeholder={STRINGS.min} />
                    </Col>
                    <Col xs={isInDashboard ? 6 : 4}>
                        <MySelect value={selectedRevenueMax} onChange={this.handleRevenueMaxChange} options={maxRevenues} placeholder={STRINGS.max} />
                    </Col>
                </Row>
                <Row className="mt-2 px-2 align-items-center">
                    <Col>
                        <MySelect value={selectedCode} onChange={this.handleCodeChange} options={atecoCodes} placeholder={STRINGS.atecoCode} />
                    </Col>
                </Row>
                <Row className="mt-3 px-2 justify-content-end">
                    <Col sm={isInDashboard ? 12 : 4} xs={12}>
                        <button className="txt-upper w-100" onClick={this.handleClickSearch}>
                            {STRINGS.search}
                        </button>
                    </Col>
                </Row>
            </div>
        );
    }
}
