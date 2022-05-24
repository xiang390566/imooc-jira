import { useMemo } from "react";
import { useUrlQueryParam } from "../../utils/url";
//import { useProject } from "../utils/project";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
    // 下面四行代码不使用useMemo 会导致页面无限渲染。
    // const [ param,setParam ] = useUrlQueryParam(['name','personId'])
    // return [ {...param, personId: Number(param.personId) || undefined},
    //     setParam
    // ] as const



    const [param, setParam] = useUrlQueryParam(["name", "personId"]);
    return [
        useMemo(
            () => ({ ...param, personId: Number(param.personId) || undefined }),
            [param]
        ),
        setParam,
    ] as const;
};

export const useProjectsQueryKey = () => {
    const [params] = useProjectsSearchParams();
    return ["projects", params];
};

// export const useProjectModal = () => {
//     const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
//         "projectCreate",
//     ]);
//     const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
//         "editingProjectId",
//     ]);
//     const setUrlParams = useSetUrlSearchParam();
//     const { data: editingProject, isLoading } = useProject(
//         Number(editingProjectId)
//     );

//     const open = () => setProjectCreate({ projectCreate: true });
//     const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
//     const startEdit = (id: number) =>
//         setEditingProjectId({ editingProjectId: id });
//
//     return {
//         projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
//         open,
//         close,
//         startEdit,
//         editingProject,
//         isLoading,
//     };
// };
