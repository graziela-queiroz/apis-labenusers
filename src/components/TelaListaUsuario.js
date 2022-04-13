import axios from 'axios';
import React from 'react';
import styled from "styled-components"

const DivList = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
  width: 250px;
  display: flex;
  justify-content: space-between;
`
     
export default class TelaListaUsuario extends React.Component{
    state = {
        usuario: []
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers = () => {
        const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users`
        axios.get(url, {
            headers: {
                Authorization: "graziela-queiroz-silveira"
            }
        })
            .then((res) => {
                this.setState({ usuario: res.data })
            })        
            .catch((err) => {
                alert("Ocorreu um problema, tente novamente");
            })
    }

    deleteUser = (id) => {
        const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`
        axios.delete(url, {
            headers:{
                Authorization: "graziela-queiroz-silveira"
            }
        })
        .then((res) => {
          alert("Usuario deletado(a)com sucesso!")
          this.getAllUsers()
        })
        .catch((err) => {
          alert("Ocorreu um erro, tente novamente")
       })
    }

    render(){ 
        const users = this.state.usuario.map((user) => {
           return (
                <DivList key={user.id}>
                    <label>Nome: {user.name}</label>
                    <button onClick={() => this.deleteUser(user.id)}> x </button>
                </DivList>
           ); 
        })
        
        return (
            <div>
                <button onClick={this.props.irParaCadastro}>Ir para Cadastro</button>
                <h2>Lista de Usuarios</h2>
                    {users}
            </div>
        );  
    }
}
