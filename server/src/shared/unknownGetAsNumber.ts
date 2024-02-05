const unknownGetAsNumber = (value: unknown) => {
    const casted = Number(value)

    if (Number.isNaN(casted)) {
        throw new Error(`Value ${value} is not a number`)
    }

    return casted
}

export default unknownGetAsNumber
