import {useAsync} from "./use-async";
import {useCallback, useEffect} from "react";
import {cleanObject} from "./index";
import {useHttp} from "./http";
import {QueryKey, useMutation, useQuery, useQueryClient} from "react-query";
import {Project} from "../types/project";

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();

    return useQuery<Project[]>(['projects',param],
        () => client('projects',{data:param})
    )
}

export const useEditProject = (queryKey: QueryKey) => {
    const client = useHttp()
    const queryClient = useQueryClient();

    return useMutation(
        (params: Partial<Project>) =>
            client(`projects/${params.id}`, {
                method: "PATCH",
                data: params,
            }),
        {
            onSuccess: () => queryClient.invalidateQueries("projects"),
        }
    );
}

export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp()
    const queryClient = useQueryClient();


    return useMutation(
        (params: Partial<Project>) =>
            client(`projects`, {
                data: params,
                method: "POST",
            }),
        {
            onSuccess: () => queryClient.invalidateQueries("projects"),
        }
    );


}

export const useProject = (id?: number) => {
    const client = useHttp();
    return useQuery<Project>(
        ["project", { id }],
        () => client(`projects/${id}`),
        { //配置参数
            enabled: Boolean(id),
        }
    );
};
