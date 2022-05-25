import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {projectListActions, selectProjectModalOpen} from "./project-list.slice";

export const ProjectModal = () => {
    const dispatch = useDispatch()
    const projectModalOpen = useSelector(selectProjectModalOpen)
    return (<Drawer
            onClose={() => dispatch(projectListActions.closeProjectModal())}
            visible={projectModalOpen}
            width={"100%"}
        >
            <h1>Project Modal</h1>
            <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
        </Drawer>
    )
};

// const Container = styled.div`
//   height: 80vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//`;
