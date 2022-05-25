import {FormEvent} from "react";
import {useAuth} from "../context/auth-context";
import {Button, Form, Input} from "antd";
import {LongButton} from "./index";
import {useAsync} from "../utils/use-async";
import {useDispatch} from "react-redux";


const apiUrl = process.env.REACT_APP_API_URL

export const LoginScreen = ({onError}:{onError:(error:Error) => void }) => {
    const {login,user} = useAuth()
    const {run,isLoading} = useAsync(undefined,{throwOnError: true})
    const dispatch = useDispatch()
    // const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    //     // 阻止表单默认提交
    //     event.preventDefault()
    //     将event.currentTarget.elements[0]类型强制转换为as HTMLInputElement).value类型。
    //     const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    //     const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    //     login({username,password})
    // }
    // HTMLFormElement extends Element
    const handleSubmit = async (values: {
        username: string;
        password: string;
    }) => {
        // dispatch(loginThunk(values))
        try {
           await run(login(values));
        } catch (e :any){
            onError(e)
        }

    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                name='username'
                rules={[{ required: true, message: "请输入用户名" }]}
            >
                <Input placeholder={'用户名'} type="text" id={'username'}/>
            </Form.Item>
            <Form.Item
                name={"password"}
                rules={[{ required: true, message: "请输入密码" }]}
            >
                <Input placeholder={'密码'} type="password" id={'password'}/>
            </Form.Item>

            <Form.Item>
                <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>登录</LongButton>
            </Form.Item>

        </Form>
    );
}
