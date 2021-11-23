/**
 * Create a cookie with the given values.
 *
 * @param name Name of the cookie
 * @param value Value for the cookie
 * @param time Time in milliseconds until the cooke expires
 * @param path URL path for the cookie
 */
export function create(name: string, value: string, time: number = 0, path: string = ''): void {

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

    /* Create the actual cookie */
    document.cookie = cookie
}

/**
 * Delete a cookie.
 *
 * @param name Name of the cookie to delete
 */
export function remove(name: string): void {

    const cookies: string[] = document.cookie.split(';')

    for (const cookie of cookies) {

        const index = cookie.indexOf(name)

        if (index !== -1) {

            /* Create a new timestamp */
            const now: Date = new Date(0)

            /*
            * Delete the cookie by setting it without value and
            * setting expires time far before now.
            */
            cookies[index] = name + '=; expires=' + now.toUTCString()
        }
    }

    document.cookie = cookies.join(';')
}

/**
 * Checks if the given cookie exists.
 *
 * @param name The cookie name to check
 */
export function exists(name: string): boolean {
    return document.cookie.indexOf(name + '=') !== -1
}
