export const createCode = (existingCodes: string[]) => {
    do {
        let code = `${Math.floor(Math.random() * 8 + 1)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`
        if (!existingCodes.includes(code)) {
            return code
        }
    } while (1)
}