import React, { Component } from "react";
import Select from "react-select";

export default class MySelect extends Component {
    render() {
        const { value, onChange, options, placeholder, checkValid, width, borderColor, menuHeight, isMulti, valueBg } = this.props;

        const styles = {
            control: (provided, state) => ({
                ...provided,
                borderRadius: 4,
                background: borderColor ? "#f9f9f9" : "#eee",
                width: width ? width : "auto",
                borderColor: state.isFocused ? "var(--colorPrimary)" : checkValid !== true || value ? (borderColor ? borderColor : "transparent") : "red",
                "&:hover": {
                    borderColor: state.isFocused ? "var(--colorPrimary)" : checkValid !== true || value ? (borderColor ? borderColor : "transparent") : "red",
                },
            }),
            multiValueLabel: (provided) => ({
                ...provided,
                background: valueBg ? valueBg : provided.background,
                borderTopRightRadius: valueBg ? 0 : provided.borderTopRightRadius,
                borderBottomRightRadius: valueBg ? 0 : provided.borderBottomRightRadius,
            }),
            multiValueRemove: (provided) => ({
                ...provided,
                background: valueBg ? valueBg : provided.background,
                borderTopLeftRadius: valueBg ? 0 : provided.borderTopLeftRadius,
                borderBottomLeftRadius: valueBg ? 0 : provided.borderBottomLeftRadius,
            }),

            indicatorSeparator: () => ({
                display: "none",
            }),
            // menu: provided => ({
            // 	...provided,
            // 	position: extendMenu ? "relative" : "absolute"
            // }),
            menuList: (provided) => ({
                ...provided,
                // maxHeight: menuHeight ? menuHeight : provided.maxHeight
                maxHeight: menuHeight ? menuHeight : 200,
            }),
        };

        return (
            <Select
                styles={styles}
                value={value}
                onChange={onChange}
                options={options}
                isMulti={isMulti}
                isClearable={true}
                placeholder={placeholder}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary: "var(--colorPrimary)",
                    },
                })}
            />
        );
    }
}
