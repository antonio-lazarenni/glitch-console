import { screen } from '@testing-library/dom'

import LogRow from '../index'
import { TestScheduler } from 'jest';

describe('row content', () => {
    customElements.define('log-row', LogRow);
    const container = document.createElement('log-row')
    container.setAttribute('log-text', 'glitch console')
    document.body.appendChild(container)

    test('row content text', async () => {
        screen.getByText(/glitch console/i)
    })

    test('set attribute doesn`t change content', async () => {
        container.setAttribute('log-text', 'glitch console is bad')
        screen.getByText(/glitch console/i)
    })
})
