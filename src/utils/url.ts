import React, {useMemo} from "react";
import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import {cleanObject} from "./index";

//返回页面url中，指定键的参数值
export const useUrlQueryParam =<K extends string>(keys: K[]) => {
    const [searchParams,setSearchParam] = useSearchParams()
    return[
        useMemo(
            () => keys.reduce((prev, key) => {
            return {...prev, [key]: searchParams.get(key) || ''}
        },{} as { [key in K] : string}),
        [searchParams]
        ),
        (params: Partial<{ [key in K]: unknown }>) => {
           const o = cleanObject({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
           return setSearchParam(o);
            // iterator
            // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
        },
    ] as const

}

export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParam] = useSearchParams();
    return (params: { [key in string]: unknown }) => {
        const o = cleanObject({
            ...Object.fromEntries(searchParams),
            ...params,
        }) as URLSearchParamsInit;
        return setSearchParam(o);
    };
};