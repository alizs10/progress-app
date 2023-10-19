import { create } from 'zustand'

const useProgressesStore = create((set) => ({


    // 0 => undone, 1 => all, 2 => done
    showProgressesType: 0,

    data: [],

    progresses: [],

    addProgress: payload => set((state) => ({ data: [...state.data, payload] })),

    showAllProgresses: payload => set((state) => {
        return { showProgressesType: 1, progresses: state.data }
    }),

    showDoneProgresses: payload => set((state) => {
        let doneProgresses = state.data.filter(pg => {
            let passedSteps = pg.steps.filter(st => st.status)
            return passedSteps.length === pg.steps.length
        })

        return { showProgressesType: 2, progresses: doneProgresses }
    }),

    showUnDoneProgresses: payload => set((state) => {
        let unDoneProgresses = state.data.filter(pg => {
            let passedSteps = pg.steps.filter(st => st.status)
            return passedSteps.length !== pg.steps.length
        })

        return { showProgressesType: 0, progresses: unDoneProgresses }
    }),

    stepForward: payload => set((state) => {

        let pgId = payload;
        let progressesIns = [...state.progresses];
        let pgIndex = progressesIns.findIndex(pg => pg._id === pgId)
        let steps = [...progressesIns[pgIndex].steps].reverse()
        let passedSteps = steps.filter(st => st.status)
        let nextStep = steps[passedSteps.length]
        let nextStepIndex = steps.findIndex(st => st._id === nextStep._id)
        steps[nextStepIndex].status = true;

        return { progresses: progressesIns }
    }),

    stepBackward: payload => set((state) => {

        let pgId = payload;
        let progressesIns = [...state.progresses];
        let pgIndex = progressesIns.findIndex(pg => pg._id === pgId)
        let steps = [...progressesIns[pgIndex].steps].reverse()
        let passedSteps = steps.filter(st => st.status)
        let lastPassedStep = passedSteps[passedSteps.length - 1]
        let lastPassedStepIndex = steps.findIndex(st => st._id === lastPassedStep._id)
        steps[lastPassedStepIndex].status = false;

        return { progresses: progressesIns }
    }),

    editingProgress: null,
    setEditingProgress: payload => set((state) => ({ editingProgress: payload })),

    updateProgress: payload => set((state) => {

        let { _id: updatedProgressId } = payload;
        let dataIns = [...state.data]
        let updatableProgressIndex = dataIns.findIndex(pg => pg._id === updatedProgressId)
        dataIns[updatableProgressIndex] = payload

        return { data: dataIns }
    }),

    deleteProgress: payload => set(state => {

        let progressId = payload;

        let dataIns = [...state.data]
        let filteredData = dataIns.filter(pg => pg._id !== progressId)

        return { data: filteredData }
    }),


}))


export default useProgressesStore;