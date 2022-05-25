import { useLocation } from "react-router";
import { useProject } from "../../utils/project";
import {useUrlQueryParam} from "../../utils/url";
import {useDebounce} from "../../utils";
import {useCallback, useMemo } from "react";
import {useTask} from "../../utils/task";


export const useProjectIdInUrl = () => {
    const { pathname } = useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1];
    return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
    const [param, setParam] = useUrlQueryParam([
        "name",
        "typeId",
        "processorId", //负责人
        "tagId",
    ]);
    const projectId = useProjectIdInUrl();
    //任务框内部搜索时设置间隔时间
    const debouncedName = useDebounce(param.name, 200);
    return useMemo(
        () => ({
            projectId,
            typeId: Number(param.typeId) || undefined,
            processorId: Number(param.processorId) || undefined,
            tagId: Number(param.tagId) || undefined,
            name: debouncedName,
        }),
        [projectId, param, debouncedName]
    );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTasksModal = () => {
    const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
        "editingTaskId",
    ]);
    const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
    const startEdit = useCallback(
        (id: number) => {
            setEditingTaskId({ editingTaskId: id });
        },
        [setEditingTaskId]
    );
    const close = useCallback(() => {
        setEditingTaskId({ editingTaskId: "" });
    }, [setEditingTaskId]);
    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading,
    };
};
