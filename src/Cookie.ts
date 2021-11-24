/**
 * Returns all currently set cookes as an array.
 *
 * @returns The cookies array
 */
export function getCookies(): string[] {

    const cookies: string[] = document.cookie.split(';')

    if (cookies.length === 1 && cookies[0] === '') {
        return []
    }

    return cookies
}

/**
 * Create a cookie with the given values.
 *
 * @param name Name of the cookie
 * @param value Value for the cookie
 * @param time Time in milliseconds until the cooke expires
 * @param path URL path for the cookie
 */
export function createCookie(name: string, value: string, time: number = 0, path: string = ''): void {

    if (name === '') {
        return
    }

    const cookies: string[] = getCookies()

    /* Create the cookie string */
    let cookie: string = name + '=' + value

    /* If no time is given the cookie expires on session close */
    if (time !== 0) {

        /* The time is now */
        const now: Date = new Date()

        /* Add given time to current time */
        now.setTime(now.getTime() + time)

        /* Apply to cookie string */
        cookie += '; expires=' + now.toUTCString()
    }

    /* Check if a path is given */
    if (path !== '') {

        /* Set path for cookie */
        cookie += '; path=' + path
    }

    for (let i = 0; i < cookies.length; i++) {
        const index: number | undefined = cookies[i]?.indexOf(name)

        if (index !== -1 || index !== undefined) {
            cookies[i] = cookie
            document.cookie = cookies.join(';')
            return
        }
    }

    cookies.push(cookie)

    document.cookie = cookies.join(';')
}

/**
 * Delete a cookie.
 *
 * @param name Name of the cookie to delete
 */
export function removeCookie(name: string): void {

    const cookies: string[] = getCookies()

    for (let i = 0; i < cookies.length; i++) {

        const index = cookies[i]?.indexOf(name)

        if (index !== -1 || index !== undefined) {

            /* Create a new timestamp */
            const now: Date = new Date(0)

            /*
            * Delete the cookie by setting it without value and
            * setting expires time far before now.
            */
            cookies[i] = name + '=; expires=' + now.toUTCString()
        }
    }

    document.cookie = cookies.join(';')
}

/**
 * Checks if the given cookie exists.
 *
 * @param name The cookie name to check
 * @returns False if no cookie is found
 */
export function cookieExists(name: string): boolean {

    if (name === '') {
        return false
    }

    const cookies: string[] = getCookies()

    for (const cookie of cookies) {

        const index: number = cookie.indexOf(name)

        if (index !== -1) {
            return true
        }
    }

    return false
}
