import React, { useEffect } from 'react'
import * as Thistate from '../src'
import { renderHook } from '@testing-library/react-hooks'
import { render } from '@testing-library/react'

const stateListener = Thistate.create({ key: 'state', defaultValue: 'initialValue' })

const Component = () => {
	const [state, setState] = Thistate.useState('state')
	useEffect(() => setState('test'), [])
	return <p>{state}</p>
}

describe('useState', () => {
	it('Should load by state listener', () => {
		const [state] = renderHook(() => Thistate.useState(stateListener)).result.current
		expect(state).toEqual('initialValue')
	})

	it('Should load with a initial value', () => {
		const [state] = renderHook(() => Thistate.useState('state')).result.current
		expect(state).toEqual('initialValue')
	})

	it('Should all states have been notified', () => {
		const { queryAllByText } = render(<>
			<Component />
			<Component />
		</>)
		expect(queryAllByText(/test/)).toHaveLength(2)
	})

	it('Should error when invalid arguments', () => {
		const message = renderHook(() => Thistate.useState()).result.error.message
		expect(message).toEqual('Invalid arguments')
	})

	it('Should error when state is not declared', () => {
		const message = renderHook(() => Thistate.useState('test')).result.error.message
		expect(message).toEqual('Global state was not declared')
	})
})
