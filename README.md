# thistate :earth_americas:
Thistate is a custom React hook that can manage states globally in the application.
<br/><br/>

**This hook works in micro-frontend enviroments!!!**

## Documentation

To use thistate follow the documentation to the some methods.

### **Thistate.useState**

Returns a statefull value and function to update it.<br/>

```javascript
function useState(initializer)
```

`initializer` - Is a key or an observable state.<br/><br/>



### **Thistate.create**

Create an state entry on the store.<br/>

```javascript
function create({ key, defaultValue })
```

`key: string` - Is the key of the state.<br/>
`defaultValue: any` - Is the initial value of the state.<br/><br/>

---

## How to use

To use thistate is really simple, just use 2 functions, `create` and `useState` (from thistate import both).

First you should create a new state, for example:

```javascript
const myStateListener = create({
  key: 'myState',
  defaultValue: 'myInitialValue'
})
```

Once created you can use the state anywhere in the application passing the state key. For example:

```javascript
const [user, setUser] = useState('myState')
```

Or a `StateListener` returned from the `create` function.

```javascript
const [user, setUser] = useState(myStateListener)
```

### Code examples

Take this simple example.

```javascript
import * as Thistate from 'thistate'

const nameState = Thistate.create({
  key: 'name',
  defaultValue: ''
})

function App() {
  return <>
    <Display listen={nameState} />
    <Input key='name' />
  </>
}

function Input({ key }) {
  const [value, setValue] = Thistate.useState(key)
  return <input onChange={evt => setValue(evt.target.value)} value={value} />
}

function Display({ listen }) {
  const [value] = Thistate.useState(listen)
  return <h2>{value}</h2>
}
```