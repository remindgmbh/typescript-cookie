import { expect } from 'chai'
import { createCookie, cookieExists, getCookies, removeCookie } from '..'
import jsdomGlobal = require('jsdom-global')

describe('Cookie', () => {

    beforeEach(() => {
        jsdomGlobal()
    })

    it('should return an empty array when no cookies are set', () => {
        const cookies: string[] = getCookies()

        expect(cookies).to.be.empty
        expect(cookies.length).to.equal(0)
    })

    it('should return all cookies as an array', () => {
        createCookie('multi1', 'multi1')
        createCookie('multi2', 'multi2')
        createCookie('multi3', 'multi3')
        createCookie('multi4', 'multi4')

        const cookies: string[] = getCookies()

        expect(cookies.length).to.equal(4)
    })

    it('should create a cookie', () => {

        createCookie('test1', 'test1')

        expect(cookieExists('test1')).to.be.true
    })

    it('should not create a cookie without a name', () => {

        createCookie('', 'test2')

        expect(cookieExists('')).to.be.false
    })

    it('should create a cookie with all parameters', () => {

        createCookie('test3', 'test3', 30000, '/')

        expect(cookieExists('test3')).to.be.true
    })

    it('should return true for an existing cookie', () => {

        createCookie('cookie-exists', 'cookie-exists')

        expect(cookieExists('cookie-exists')).to.be.true
    })

    it('should return false for a non existing cookie', () => {
        expect(cookieExists('cookie-does-not-exist')).to.be.false
    })

    it('should remove a cookie that exists', () => {

        createCookie('create-a-cookie-to-delete', 'delete-me', 5050)

        const cookiesBefore = getCookies()

        expect(cookiesBefore.length).to.equal(1)

        expect(cookieExists('create-a-cookie-to-delete')).to.be.true

        removeCookie('create-a-cookie-to-delete')

        const cookiesAfter = getCookies()

        expect(cookiesAfter.length).to.equal(0)

        expect(cookieExists('create-a-cookie-to-delete')).to.be.false
    })

    it('should not remove a cookie when the cookie name is wrong', () => {

        createCookie('the-real-cookie', 'cookie-value', 6666)

        const cookiesBefore = getCookies()

        expect(cookiesBefore.length).to.equal(1)

        removeCookie('wrong-cookie')

        const cookiesAfter: string[] = getCookies()

        expect(cookiesAfter.length).to.equal(1)

        expect(cookieExists('the-real-cookie')).to.be.true
    })

    it('should do nothing when removing a non existing cookie', () => {

        const cookiesBefore = getCookies()

        expect(cookiesBefore.length).to.equal(0)

        removeCookie('this-cookie-does-not-exist')

        const cookiesAfter: string[] = getCookies()

        expect(cookiesAfter.length).to.equal(0)
    })

    it('should return false when the requested cookie does not exist', () => {
        expect(cookieExists('unknown-cookie')).to.be.false
    })

    it('should return false when the requested cookie name is empty', () => {
        expect(cookieExists('')).to.be.false
    })
})
