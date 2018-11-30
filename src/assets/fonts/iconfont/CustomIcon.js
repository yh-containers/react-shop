import React from "react";

export const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => (

    <svg
        className={`am-icon am-icon-${type.default.id} am-icon-${size} ${className}`}
        {...restProps}
    >
        {/*<use xlinkHref={type} /> /!* svg-sprite-loader@0.3.x *!/*/}
        {/*{console.log(type)}*/}
        <use xlinkHref={`#${type.default.id}`} />
    </svg>
);