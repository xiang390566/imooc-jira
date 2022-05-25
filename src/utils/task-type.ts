import {useHttp} from "./http";
import {TaskType} from "../types/task-type";
import {useQuery} from "react-query";


//获取tasktype 的列表
export const useTaskTypes = () => {
    const client = useHttp();

    return useQuery<TaskType[]>(["taskTypes"],
        () => client("taskTypes"));
};
