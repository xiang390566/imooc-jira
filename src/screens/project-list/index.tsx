import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject, useDebounce, useDocumentTitle, useMount} from "../../utils";
import * as qs from "qs";
import {useHttp} from "../../utils/http";
import styled from "@emotion/styled";
import {useAsync} from "../../utils/use-async";
import {Typography} from "antd";
import { Project } from "./list";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {useUrlQueryParam} from "../../utils/url";
import {useProjectsSearchParams} from "./util";


const apiUrl = process.env.REACT_APP_API_URL


export const ProjectListScreen = () => {
    useDocumentTitle("项目列表",false)

    const [param, setParam] = useProjectsSearchParams()
    const { isLoading , error, data: list, retry} =useProjects(useDebounce(param,200))
    const {data:users} = useUsers();

    return (
    <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setParam}/>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <List  refresh={retry} loading={isLoading} users={users || []} dataSource={list || []}/>
    </Container>)
}

const Container = styled.div`
padding: 3.2rem
`