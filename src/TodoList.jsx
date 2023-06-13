import React, {useState, useEffect} from 'react';
import Icon from './assets/unnamed.png'
import './TodoList.css'

function TodoList(){

const listaStorage = localStorage.getItem('Lista');

const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);//para converter para objeto
const [novoItem, setNovoItem] = useState('') 

useEffect(()=>{
  localStorage.setItem('Lista', JSON.stringify(lista))
}, [lista])

function adicionaItem(form){
  form.preventDefault();
  if(!novoItem){
    return;//para nao acontecer nada
  }
    setLista([...lista, {text: novoItem, isCompleted: false}])//os tres pontos servem para recuperar o que já está na lista//array com varios objetos
    setNovoItem("");
    document.getElementById('input-entrada').focus()//Quando falamos em "direcionar o foco para um elemento", estamos nos referindo a fazer com que esse elemento seja o alvo principal para eventos de teclado ou interações do usuário. Isso significa que, após direcionar o foco para um elemento, qualquer entrada de teclado ou ações do usuário serão aplicadas a esse elemento específico.
}

function clicou(index){
    const listaAux = [...lista]//poe tudo o que tem na lista oficial na auxiliar
    listaAux[index].isCompleted = !listaAux[index].isCompleted//inverte
    setLista(listaAux)
}
function deleta(index){
    const listaAux = [...lista]
    listaAux.splice(index, 1)//para so eliminar um item a partir do item com a chave index
    setLista(listaAux)
}
function deletaTodas(){
    setLista([])
}
    return(
        <>
          <div>
            <h1>Lista de tarefas</h1>
            <form onSubmit={adicionaItem}>{/*Se você usasse parênteses no primeiro caso, ou seja, se escrevesse `<form onSubmit={adicionaItem()}>`, isso causaria um erro porque você estaria chamando a função `adicionaItem` imediatamente e atribuindo seu resultado à propriedade `onSubmit`.

Quando você escreve `<form onSubmit={adicionaItem}>`, está passando a referência da função `adicionaItem` como propriedade `onSubmit`. Dessa forma, quando o evento de envio do formulário ocorrer, a função `adicionaItem` será chamada automaticamente.

Ao adicionar os parênteses, como em `<form onSubmit={adicionaItem()}>`, você está executando a função `adicionaItem` imediatamente e passando seu resultado (se houver) para a propriedade `onSubmit`. Se a função não retornar uma função manipuladora de evento, ocorrerá um erro porque você estará tentando atribuir algo que não é uma função a uma propriedade que espera uma função.

Portanto, é importante passar apenas a referência da função (sem os parênteses) quando atribuída a eventos como `onSubmit` ou `onClick`, para que a função seja chamada no momento apropriado, quando o evento ocorrer.*/}
                <input id="input-entrada" type="text" placeholder='Adicione uma tarefa' value={novoItem} onChange={(e)=>setNovoItem(e.target.value)}/>
                <button type='submit' className='add'>Add</button>
            </form>
            <div className='listaTarefas'>
            <div style={{textAlign: 'center'}}>
                {
                    lista.length < 1
                    ? <img className="icone" src={Icon}/>
                    : 
                    lista.map((item, index)=>{//index começa em 0
                        return(//é uma função por isso tem de ter o retorno
                        <div className={item.isCompleted ? 'item completo': 'item'} key={index}>
                        <span onClick={()=>{clicou(index)}}>{item.text}</span>
                        <button className='del' onClick={(index)=>deleta(index)}>Deletar</button>  
                        </div>//repete a div para cada item da lista
                        )
                    })
                }
                </div>
                {
                    lista.length > 0 && <button className='deleteAll' onClick={()=>deletaTodas()}>Deletar Todas</button>
                }
              
            </div>
          </div>
        </>
    )
}
export default TodoList