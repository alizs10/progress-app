export const deadlineToMoment = (deadline) => {
    let momentDateType = deadline.split('-')
    momentDateType[1] = parseInt(momentDateType[1]) - 1
    momentDateType[1] = momentDateType[1].toString()

    return momentDateType;
}

export const zValidate = (schema, data) => {

    let validationErrors = {};
    let hasError = false;

    let validationRes = schema.safeParse(data)

    if (!validationRes.success) {
        hasError = true;
        let errors = validationRes.error.errors

        for (let index in errors) {
            let errorObj = errors[index];
            validationErrors[errorObj.path[0]] = errorObj.message
        }

        return { hasError, errors: validationErrors }
    }


    return { hasError, values: validationRes.data, errors: validationErrors }
}