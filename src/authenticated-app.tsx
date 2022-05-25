import React, { useState } from "react";
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {ButtonNoPadding, Row} from "./components/lib";
import { ReactComponent as SoftwareLogo} from './assets/software-logo.svg';
import { Dropdown,Menu,Button } from "antd";
import {  Route, Routes } from "react-router";
import {BrowserRouter as Router} from "react-router-dom";
import {ProjectScreen} from "./screens/project";
import { resetRoute } from "./utils";
import {ProjectModal} from "./screens/project-list/project-modal";
import {ProjectPopover} from "./components/project-popover";

export const AuthenticatedApp = () => {
    const [projectModalOpen, setProjectModalOpen] = useState(false);
    return (
        <Container>
            <Router>
            <PageHeader/>
            <Main>
                <Routes>
                    <Route path={"projects"} element={<ProjectListScreen />} />
                    <Route path={"projects/:projectId/*"} element={<ProjectScreen/>} />
                    <Route index element={<ProjectListScreen />} />
                </Routes>
            </Main>
            <ProjectModal/>
            </Router>
    </Container>
    );

};

const PageHeader = () => {

    return  <Header between={true}>
        <HeaderLeft gap={true}>
            {/* 图片渲染成SVG的方法 */}
            <ButtonNoPadding  type={"link"} onClick={resetRoute}>
            <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'}/>
            </ButtonNoPadding>
            <ProjectPopover />
            <span>用户</span>
        </HeaderLeft>
        <HeaderRight>
            <User />
        </HeaderRight>
    </Header>
}


const User = () => {
    const {logout, user} = useAuth()
    return   <Dropdown overlay={<Menu>
        <Menu.Item key={'logout'}>
            <Button onClick={logout} type={"link"}>登出</Button>
        </Menu.Item>
    </Menu>}>
        {/* 防止页面重新刷新 */}
        <Button type={"link"} onClick={e => e.preventDefault()}>
            Hi,{user?.name}
        </Button>
    </Dropdown>
}


// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  display: grid;
  overflow: hidden;
  
  
`;