import axios from 'axios';
import React from 'react';

export default class TelaCadastro extends React.Component{
    state = {
      nome: "",
      email:""
    }

    randNome = (event) => {
        this.setState({nome: event.target.value}) 
    }

    randEmail = (event) => {
        this.setState({email: event.target.value})
    }

    postUsers = () => {
      const baseURL = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users";
      const body = {
          name: this.state.nome,
          email: this.state.email
      }
      axios.post(baseURL, body, {
          headers: {
            Authorization: "graziela-queiroz-silveira"
          }
      })
      .then((res) => {
        alert("Usuario(a) cadastrado(a) com sucesso!")
        this.setState({nome: "", email: ""})
      })
      .catch((err) => {
        alert(err.response.data.message, 'erro')
      })
    }

    render(){
      return(
           <div>
              <button onClick={this.props.irParaLista}>Ir para Lista</button>
              <h2>Cadastro</h2>
              <input 
                  placeholder={"Nome"}
                  value={this.state.nome}
                  onChange={this.randNome}   
               />
              <input 
                   placeholder={"Email"}
                   value={this.state.email}
                   onChange={this.randEmail}
                />
              <button onClick={this.postUsers}>Cadastrar</button>
           </div>
           
      )
    }
}
