import React, {ReactNode, useCallback} from 'react'
import {useDocumentTitle} from "../../utils";
import {useKanbans, useReorderKanban} from "../../utils/kanban";
import {Spin} from "antd";

import {
    useKanbanSearchParams,
    useKanbansQueryKey,
    useProjectInUrl,
    useTasksQueryKey,
    useTasksSearchParams
} from "./util";
import { KanbanColumn } from './kanban-column';
import styled from "@emotion/styled";
import { SearchPanel } from './search-panel';
import {ScreenContainer} from "../../components/lib";
import {useReorderTask, useTasks} from "../../utils/task";
import {TaskModal} from "./task-modal";
import {CreateKanban} from "./create-kanban";


export const KanbanScreen = () => {
    useDocumentTitle("看板列表");

    const { data: currentProject } = useProjectInUrl();
    const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
        useKanbanSearchParams()
    );
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
    const isLoading = taskIsLoading || kanbanIsLoading;
    return (
        <ScreenContainer>
            <h1>{currentProject?.name}看板</h1>
            <SearchPanel />
            {isLoading ? (
                <Spin size={"large"} />
            ) : (
                <ColumnsContainer>
                    {kanbans?.map((kanban) => (
                        <KanbanColumn kanban={kanban} key={kanban.id} />
                    ))}
                    <CreateKanban />
                </ColumnsContainer>
            )}
            <TaskModal />
        </ScreenContainer>
    );
};

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
