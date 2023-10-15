import { create } from 'zustand'

const useProgressesStore = create((set) => ({

    progresses: [
        {
            _id: 0,
            title: "Read Sofia's world book",
            theme: 0,
            deadline: null,
            steps: [
                {
                    _id: 100,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 1005,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 10055,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 100555,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 1005555,
                    title: 'done',
                    status: true
                },
                {
                    _id: 100464,
                    title: 'undone',
                    status: false
                },
                {
                    _id: 10045498,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 10054548,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 100484,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 1006487777,
                    title: 'step title',
                    status: false
                },
            ]
        },
        {
            _id: 1,
            title: 'Progress 1',
            theme: 2,
            deadline: null,
            steps: [
                {
                    _id: 115450,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 114440,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 11088787,
                    title: 'step title',
                    status: false
                },

                {
                    _id: 11077799,
                    title: 'step title',
                    status: false
                },
            ]
        },
        {
            _id: 6,
            title: 'Progress 6',
            theme: 1,
            deadline: null,
            steps: [
                {
                    _id: 4444160,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 160454545455,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 1608897997,
                    title: 'step title',
                    status: false
                },
            ]
        },
        {
            _id: 7,
            title: 'Progress 7',
            theme: 5,
            deadline: null,
            steps: [
                {
                    _id: 174440,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 1707777777,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 17045488222,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 2222170,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 170222,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 1704,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 17079,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 17044444,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 170121,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 170789,
                    title: 'step title',
                    status: false
                },
            ]
        },
        {
            _id: 8,
            title: 'Progress 8',
            theme: 4,
            deadline: null,
            steps: [
                {
                    _id: 4547180,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 1809898,
                    title: 'step title',
                    status: false
                },
            ]
        },
        {
            _id: 9,
            title: 'Progress 9',
            theme: 3,
            deadline: null,
            steps: [
                {
                    _id: 55522190,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 19048256,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 1908787878999,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 1909996633,
                    title: 'step title',
                    status: false
                },
            ]
        },
        {
            _id: 10,
            title: 'Progress 0',
            theme: 0,
            deadline: null,
            steps: [
                {
                    _id: 15555500,
                    title: 'step title',
                    status: true
                }
            ]
        },
    ],

    handleStepForward: payload => set((state) => {

        let pgId = payload;
        let progressesIns = [...state.progresses];
        let pgIndex = progressesIns.findIndex(pg => pg._id === pgId)
        let steps = [...progressesIns[pgIndex].steps]
        let passedSteps = steps.filter(st => st.status)
        let nextStep = steps[passedSteps.length]
        let nextStepIndex = steps.findIndex(st => st._id === nextStep._id)
        steps[nextStepIndex].status = true;

        return { progresses: progressesIns }
    }),


    // true
    // true
    // true
    // false
    // false

    handleStepBackward: payload => set((state) => {

        let pgId = payload;
        let progressesIns = [...state.progresses];
        let pgIndex = progressesIns.findIndex(pg => pg._id === pgId)
        let steps = [...progressesIns[pgIndex].steps]
        let passedSteps = steps.filter(st => st.status)
        let lastPassedStep = passedSteps[passedSteps.length - 1]
        let lastPassedStepIndex = steps.findIndex(st => st._id === lastPassedStep._id)
        steps[lastPassedStepIndex].status = false;

        return { progresses: progressesIns }
    })

}))


export default useProgressesStore;