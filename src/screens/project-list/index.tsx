import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject, useDebounce, useDocumentTitle, useMount} from "../../utils";
import * as qs from "qs";
import {useHttp} from "../../utils/http";
import styled from "@emotion/styled";
import {useAsync} from "../../utils/use-async";
import {Button,  Typography} from "antd";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {useUrlQueryParam} from "../../utils/url";
import {useProjectModal, useProjectsSearchParams} from "./util";
import {ButtonNoPadding, ErrorBox, Row} from "../../components/lib";
import {Project} from "../../types/project";


const apiUrl = process.env.REACT_APP_API_URL


export const ProjectListScreen = () => {
    useDocumentTitle("项目列表",false)

    const { open } = useProjectModal();
    const [param, setParam] = useProjectsSearchParams()
    const { isLoading , error, data: list,} =useProjects(useDebounce(param,200))
    const {data:users} = useUsers();

    return (
    <Container>
        <Row between={true}>
            <h1>项目列表</h1>
            <ButtonNoPadding
                onClick={open}
                type={"link"}>
                创建项目
            </ButtonNoPadding>
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam}/>
        <ErrorBox error={error} />
        <List
            loading={isLoading}
            users={users || []}
            dataSource={list || []}
        />
    </Container>)
}

const Container = styled.div`
padding: 3.2rem
`