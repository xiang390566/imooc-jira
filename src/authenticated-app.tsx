import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./components/lib";
import { ReactComponent as SoftwareLogo} from './assets/software-logo.svg';
import { Dropdown,Menu,Button } from "antd";


export const AuthenticatedApp = () => {
    const {logout, user} = useAuth()
    return (
        <Container>
            <Header between={true}>
            <HeaderLeft gap={true}>
              {/* 图片渲染成SVG的方法 */}
                <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'}/>
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown overlay={<Menu>
                  <Menu.Item key={'logout'}>
                    <Button type={"link"}>登出</Button>
                  </Menu.Item>

                </Menu>}>
                  {/* 防止页面重新刷新 */}
                  <Button type={"link"} onClick={e => e.preventDefault()}>
                    Hi,{user.name}
                  </Button>

                </Dropdown>
            </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen/>
            </Main>
    </Container>
    );

};

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
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
  display: gird;
  // overflow: hidden;
`;