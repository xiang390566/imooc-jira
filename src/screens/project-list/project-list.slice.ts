import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Project} from "./list";
import {RootState} from "../../store";

interface State {
    projectModalOpen: boolean;
}
const initialState: State = {
    projectModalOpen: false
}

export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers:{
        openProjectModal(state) {
            state.projectModalOpen = true;
        },
        closeProjectModal(state) {
            state.projectModalOpen = false;
        },
        // setProjectList(state, action: PayloadAction<Project[]>) {
        //     state.projects = action.payload;
        // },
        // setUser(state, action) {
        //     state.user = action.payload;
        // },
    },
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) =>
    state.projectList.projectModalOpen;