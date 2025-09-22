
import './App.css'
import Card from './components/Card'
import Input from './components/Input'

function App() {

  return (
    <>
      <main>
        <header id = 'buscador'>
          <Input/>
        </header>
        <section id = 'contenedor'>
            <Card/>
        </section>
      </main>
    </>
  )
}

export default App
