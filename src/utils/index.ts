import {useEffect, useRef, useState} from "react";

export const isFalsy = (value: unknown) => value === 0 ? false : !value
 
export const isVoid = (value: unknown) => value === undefined || value === null || value===''
export const cleanObject = (object: {[key: string]: unknown}) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        if(isVoid(value)) {
            delete result[key]
        }
    })
    return result
};

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        // TODO 依赖项里加上callback会造成无限循环
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[] )
};

// export const useDebounce = <V>(valyue: V, delay?: number) => {
//     const [debouncedValue, setDebouncedValue] = useState(value);
//
//     useEffect(() => {
//         // 每次在value变化以后，设置一个定时器
//         const timeout = setTimeout(() => setDebouncedValue(value), delay);
//         // 每次在上一个useEffect处理完以后再运行
//         return () => clearTimeout(timeout);
//     }, [value, delay]);
//
//     return debouncedValue;
// };

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        // 每次在value变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        // 每次在上一个useEffect处理完以后再运行,清理定时器。只有最后的一个定时器可以存活
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}

export const useDocumentTitle = (title:string, keepOnUnmount=true) => {
    const oldTitle = useRef(document.title).current;


    useEffect(() => {
        document.title = title
    },[title])

    useEffect(() => {
        return () =>{
            if(!keepOnUnmount){
                document.title = oldTitle
            }
        }
    },[keepOnUnmount, oldTitle])

}
  // 设置点击左上角图标返回主页面的方法
export const resetRoute = () => (window.location.href = window.location.origin)

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    });

    return mountedRef;
};
