import { expect } from 'chai'
import { create, exists, remove } from '../src/Cookie'
import jsdomGlobal = require('jsdom-global')

describe('Cookie', () => {

    beforeEach(() => {
        jsdomGlobal()
    })

    it('should create', () => {

        create('test', 'test', 30000, '/')

        expect(exists('test')).to.be.true
    })

    it('should exist', () => {

        const result: boolean = exists('test')

        expect(result).to.be.false
    })

    it('should remove', () => {

        create('test', 'test', 101010, '/')

        remove('test')

        expect(exists('test')).to.be.false
    })
})
