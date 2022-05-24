import { useCallback, useReducer, useState } from "react";
import {useMountedRef} from "./index";
//import { useMountedRef } from "utils/index";

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> ={
    stat: "idle",
    data: null,
    error: null,
};

const defaultConfig = {
    throwOnError: false,
}

export const useAsync =<D>(initialState?:State<D>,initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig,...initialConfig}
    const [state,setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    const mountedRef = useMountedRef()
    const [retry, setRetry] = useState(() => () => {})
    const setData = useCallback((data: D) => setState({
        data,
        stat: 'success',
        error: null
    }),[])

    const setError =useCallback((error: Error) => setState({
        error,
        stat: 'error',
        data: null,

    }),[])
    //run 触发异步请求
    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if(!promise || !promise.then) {
                throw new Error('请传入 Promise 类型数据')
            }
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig);
                }
            });
            //数据成功时执行函数
            setState(prevState =>({...prevState,stat:'loading'}));
            return promise.
            then((data) => {
                if (mountedRef.current)//组件被挂载且没有卸载
                    setData(data);
                return data;
            }).catch(error => {
                // catch 会消化异常，如果不主动抛出，外面是接收不到异常的
                setError(error);
                if(config.throwOnError) return Promise.reject(error);
                return error;
            })


        }
    ,[config.throwOnError, mountedRef,setData, setError])

    return {
        isIdle: state.stat === "idle",
        isLoading: state.stat === "loading",
        isError: state.stat === "error",
        isSuccess: state.stat === "success",
        run,
        setData,
        setError,
        retry,
        ...state
    }


}