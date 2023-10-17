export const deadlineToMoment = (deadline) => {
    let momentDateType = deadline.split('-')
    momentDateType[1] = parseInt(momentDateType[1]) - 1
    momentDateType[1] = momentDateType[1].toString()

    return momentDateType;
}