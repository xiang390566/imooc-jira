import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";

export const ProjectModal = (props: {
    projectModalOpen: boolean;
    onClose: () => void;
}) => {
    return (<Drawer
            onClose={props.onClose}
            visible={props.projectModalOpen}
            width={"100%"}
        >
            <h1>Project Modal</h1>
            <Button onClick={props.onClose}>关闭</Button>
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
