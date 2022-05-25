import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject, useDebounce, useDocumentTitle, useMount} from "../../utils";
import * as qs from "qs";
import {useHttp} from "../../utils/http";
import styled from "@emotion/styled";
import {useAsync} from "../../utils/use-async";
import {Button,  Typography} from "antd";
import { Project } from "./list";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {useUrlQueryParam} from "../../utils/url";
import {useProjectsSearchParams} from "./util";
import { Row } from "../../components/lib";
import {useDispatch} from "react-redux";
import { projectListActions } from "./project-list.slice";


const apiUrl = process.env.REACT_APP_API_URL


export const ProjectListScreen = () => {
    useDocumentTitle("项目列表",false)

    const [param, setParam] = useProjectsSearchParams()
    const { isLoading , error, data: list, retry} =useProjects(useDebounce(param,200))
    const {data:users} = useUsers();
    const dispatch = useDispatch()

    return (
    <Container>
        <Row between={true}>
            <h1>项目列表</h1>
            <Button onClick={() => dispatch(projectListActions.openProjectModal())}>创建项目</Button>
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam}/>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <List
            refresh={retry}
            loading={isLoading}
            users={users || []}
            dataSource={list || []}
        />
    </Container>)
}

const Container = styled.div`
padding: 3.2rem
`