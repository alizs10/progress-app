import { create } from 'zustand'
import { useNotificationsStore } from './notification-store'

const useProgressesStore = create((set) => ({

    viewMode: 0,
    toggleViewMode: payload => set((state) => ({ viewMode: state.viewMode === 1 ? 0 : 1 })),

    // 0 => undone, 1 => all, 2 => done
    showProgressesType: 0,

    // data: [
    //     {
    //         _id: 1,
    //         title: "Read Sofia's world book",
    //         pin: true,
    //         deadline: '2023-10-30',
    //         theme: 4,
    //         importance: 3,
    //         label: 1,
    //         steps: [
    //             {
    //                 _id: 12,
    //                 title: 'forth step',
    //                 status: false
    //             },
    //             {
    //                 _id: 123,
    //                 title: 'third step',
    //                 status: true
    //             },
    //             {
    //                 _id: 1234,
    //                 title: 'second step',
    //                 status: true
    //             },
    //             {
    //                 _id: 1235,
    //                 title: 'first step',
    //                 status: true
    //             },
    //         ],
    //         status: false
    //     },
    //     {
    //         _id: 2,
    //         title: "Workout",
    //         pin: false,
    //         deadline: '2023-12-30',
    //         theme: 2,
    //         importance: 1,
    //         label: 1,
    //         steps: [
    //             {
    //                 _id: 12,
    //                 title: '',
    //                 number: 1,
    //                 status: false
    //             },
    //             {
    //                 _id: 123,
    //                 title: '',
    //                 number: 2,
    //                 status: false
    //             },
    //             {
    //                 _id: 1234,
    //                 title: '',
    //                 number: 3,
    //                 status: false
    //             },
    //             {
    //                 _id: 1235,
    //                 title: '',
    //                 number: 4,
    //                 status: false
    //             },
    //             {
    //                 _id: 12354,
    //                 title: '',
    //                 number: 5,
    //                 status: false
    //             },
    //             {
    //                 _id: 12355,
    //                 title: '',
    //                 number: 6,
    //                 status: false
    //             },
    //             {
    //                 _id: 123562324234,
    //                 title: '',
    //                 number: 7,
    //                 status: false
    //             },
    //         ],
    //         status: false
    //     },
    // ],

    data: [
        {
            _id: 2,
            title: "Workout",
            pin: false,
            deadline: '2023-12-30',
            theme: 2,
            importance: 1,
            label: 1,
            steps: [
                {
                    _id: 12,
                    title: '',
                    number: 1,
                    status: false
                },
                {
                    _id: 123,
                    title: '',
                    number: 2,
                    status: false
                },
                {
                    _id: 1234,
                    title: '',
                    number: 3,
                    status: false
                },
                {
                    _id: 1235,
                    title: '',
                    number: 4,
                    status: false
                },
                {
                    _id: 12354,
                    title: '',
                    number: 5,
                    status: false
                },
                {
                    _id: 12355,
                    title: '',
                    number: 6,
                    status: false
                },
                {
                    _id: 123562324234,
                    title: '',
                    number: 7,
                    status: false
                },
            ],
            status: false
        }
    ],
    progresses: [],

    addProgress: payload => set((state) => ({ data: [payload, ...state.data] })),

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

    showProgresses: payload => set(state => {

        let { labelId, pgType } = payload;
        // 0 => undone, 1 => all, 2 => done

        let filteredProgresses;

        if (pgType === 0) {
            filteredProgresses = state.data.filter(pg => {
                let passedSteps = pg.steps.filter(st => st.status)
                return passedSteps.length !== pg.steps.length
            })
        }

        if (pgType === 1) {
            filteredProgresses = state.data;
        }

        if (pgType === 2) {
            filteredProgresses = state.data.filter(pg => {
                let passedSteps = pg.steps.filter(st => st.status)
                return passedSteps.length === pg.steps.length
            })
        }

        let progresses = filteredProgresses.filter(pg => (pg.label === labelId || labelId === 0))

        return { selectedLabel: labelId, showProgressesType: pgType, progresses }
    }),

    stepForward: payload => set((state) => {

        let pgId = payload;
        let progressesIns = [...state.progresses];
        let pgIndex = progressesIns.findIndex(pg => pg._id === pgId)
        let updatableProgress = progressesIns[pgIndex]

        let steps = [...updatableProgress.steps].sort((a, b) => a.number - b.number)
        let passedSteps = steps.filter(st => st.status)
        let nextStep = steps[passedSteps.length]
        let nextStepIndex = steps.findIndex(st => st._id === nextStep._id)
        steps[nextStepIndex].status = true;

        let unDoneProgresses = steps.filter(st => !st.status)
        if (unDoneProgresses.length === 0) {
            updatableProgress.status = true
            updatableProgress.pin = false
            let newNotify = {
                _id: Date.now(),
                index: 0,
                message: 'Progress completed!',
                status: 0
            }
            useNotificationsStore.getState().addNotification(newNotify)
            setTimeout(() => {
                useNotificationsStore.getState().removeNotification(newNotify._id)
            }, 3000)
        }

        return { progresses: progressesIns }
    }),

    stepBackward: payload => set((state) => {

        let pgId = payload;
        let progressesIns = [...state.progresses];
        let pgIndex = progressesIns.findIndex(pg => pg._id === pgId)
        let updatableProgress = progressesIns[pgIndex]
        let steps = [...updatableProgress.steps].sort((a, b) => a.number - b.number)
        let passedSteps = steps.filter(st => st.status)
        let lastPassedStep = passedSteps[passedSteps.length - 1]
        let lastPassedStepIndex = steps.findIndex(st => st._id === lastPassedStep._id)
        steps[lastPassedStepIndex].status = false;
        updatableProgress.status = false;

        return { progresses: progressesIns }
    }),

    importanceValues: [
        {
            _id: 0,
            name: 'VERY HIGH',
            short: 'VH'
        },
        {
            _id: 1,
            name: 'HIGH',
            short: 'H'
        },
        {
            _id: 2,
            name: 'MEDIUM',
            short: 'M'
        },
        {
            _id: 3,
            name: 'LOW',
            short: 'L'
        },
    ],


    labels: [
        {
            _id: 0,
            name: 'All'
        },
        {
            _id: 1,
            name: 'Work'
        }
    ],

    selectedLabel: 0,
    selectLabel: payload => set(state => ({ selectedLabel: payload })),
    addLabel: payload => set((state) => ({ labels: [...state.labels, payload] })),

    editingProgressVis: false,
    viewingProgressVis: false,
    focusMode: false,
    setEditingProgressVis: payload => set((state) => ({ editingProgressVis: payload })),
    setViewingProgressVis: payload => set((state) => ({ viewingProgressVis: payload })),
    setFocusMode: payload => set((state) => ({ focusMode: payload })),


    editingProgress: null,
    setEditingProgress: payload => set((state) => ({ editingProgress: payload })),

    viewingProgress: null,

    setViewingProgress: payload => set((state) => ({ viewingProgress: payload })),

    progressInFocus: null,
    setProgressInFocus: payload => set((state) => ({ progressInFocus: payload })),

    deleteConfirmationVis: false,
    setDeleteConfirmationVis: payload => set((state) => ({ deleteConfirmationVis: payload })),

    updateProgress: payload => set((state) => {

        let { _id: updatedProgressId } = payload;
        let dataIns = [...state.data]
        let updatableProgressIndex = dataIns.findIndex(pg => pg._id === updatedProgressId)
        dataIns[updatableProgressIndex] = { ...dataIns[updatableProgressIndex], ...payload }

        return { data: dataIns }
    }),

    deleteProgress: payload => set(state => {

        let progressId = payload;

        let dataIns = [...state.data]
        let filteredData = dataIns.filter(pg => pg._id !== progressId)

        return { data: filteredData }
    }),

    // goals and rewards

    goals: [{
        "_id": 1703089548526,
        "title": "test",
        "prize": "test",
        "isPrized": false,
        "targets": [
            {
                "_id": 1,
                "title": "Read Sofia's world book",
                "pin": true,
                "deadline": "2023-10-30",
                "theme": 4,
                "importance": 3,
                "label": 1,
                "steps": [
                    {
                        "_id": 12,
                        "title": "forth step",
                        "status": false
                    },
                    {
                        "_id": 123,
                        "title": "third step",
                        "status": true
                    },
                    {
                        "_id": 1234,
                        "title": "second step",
                        "status": true
                    },
                    {
                        "_id": 1235,
                        "title": "first step",
                        "status": true
                    }
                ],
                "status": false
            },
            {
                "_id": 2,
                "title": "Be Healthy",
                "pin": false,
                "deadline": "2023-12-30",
                "theme": 2,
                "importance": 1,
                "label": 1,
                "steps": [
                    {
                        "_id": 12,
                        "title": "forth step",
                        "status": false
                    },
                    {
                        "_id": 123,
                        "title": "third step",
                        "status": false
                    },
                    {
                        "_id": 1234,
                        "title": "second step",
                        "status": false
                    },
                    {
                        "_id": 1235,
                        "title": "first step",
                        "status": true
                    }
                ],
                "status": false
            }
        ]
    }],
    addGoal: payload => set((state) => ({ goals: [payload, ...state.goals] })),
    updateGoal: payload => set((state) => {

        let { _id: updatedGoalId } = payload;
        let goalsIns = [...state.goals]
        let updatableGoalIndex = goalsIns.findIndex(pg => pg._id === updatedGoalId)
        goalsIns[updatableGoalIndex] = { ...goalsIns[updatableGoalIndex], ...payload }

        return { goals: goalsIns }
    }),

    updatePossibleTarget: (payload) => set(state => {

        let possibleTarget = payload;
        let goalsIns = [...state.goals]
        let undoneGoals = goalsIns.filter(goal => !goal.status)

        if (undoneGoals.length > 0) {
            for (let index = 0; index < undoneGoals.length; index++) {
                let undoneGoal = undoneGoals[index];
                let unreachedTargetsCount = 0;
                undoneGoal.targets.map(target => {
                    !target.status && unreachedTargetsCount++;
                })
                let undoneGoaIndex = goalsIns.findIndex(goal => goal._id === undoneGoal._id)
                if (unreachedTargetsCount === 0) {
                    goalsIns[undoneGoaIndex].status = true;
                    let newNotify = {
                        _id: Date.now(),
                        index: 0,
                        message: 'You reached your goal!',
                        status: 0
                    }
                    useNotificationsStore.getState().addNotification(newNotify)
                    setTimeout(() => {
                        useNotificationsStore.getState().removeNotification(newNotify._id)
                    }, 3000)
                }
            }
        }

        return { goals: goalsIns }
    }),

    deleteGoal: payload => set(state => {

        let goalId = payload;

        let goalsIns = [...state.goals]
        let prizesIns = [...state.prizes]
        let filteredGoals = goalsIns.filter(goal => goal._id !== goalId)
        let filteredPrizes = prizesIns.filter(prize => prize.goal._id !== goalId)
        return { goals: filteredGoals, prizes: filteredPrizes }
    }),

    prizes: [],
    addPrize: payload => set((state) => ({ prizes: [payload, ...state.prizes] })),
}))


export default useProgressesStore;