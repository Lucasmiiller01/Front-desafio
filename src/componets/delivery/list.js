import React, { Component } from 'react'
import api from '../../service/api'
import ModalMessage from '../partials/modal'
import { Table, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class listDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalText: false,
            deliverys: [],
            modalTitle: false,
            modalOpen: false,
        }
    }
    LoginPassport = () => {
        const payload = {
            grant_type: 'password',
            client_id: '2',
            client_secret: 'enro8FBiENSCCYN6yaAllt8ysdJM24iHkPJ20BMZ',
            username: 'dev@mail.com',
            password: 'secret',
        };
        let error = false;
        api({
            method: 'post',
            url: '/oauth/token',
            data: payload,
            config: { headers: {'Content-Type': 'application/json' }}
        })
        .then((response) => {
            localStorage.setItem('__tokenAccess', response.data.access_token);
            console.log(response);
        })
        .catch((response) =>  {
            console.log(response);
            this.setState({modalOpen: true, modalTitle: 'Erro', modalText: 'Ocorreu um erro ao tentar autenticar, verifique as credenciais.'});
        }).finally(() => {
            if(error) {
                return !error
            }
            return error
        });
        return error
    }

    getAllDeliverys = () => {
        let error;
        api({
            method: 'GET',
            url: '/api/delivery/all',
            config: { headers: {'Content-Type': 'application/json' }}
        })
        .then((response) => {
            this.setState({deliverys : response.data.deliverys});
            console.log(response.data.deliverys)
        })
        .catch((response) =>  {
            console.log(response);
            this.setState({modalOpen: true, modalTitle: 'Erro', modalText: 'Ocorreu um erro ao tentar buscar pedidos, tente novamente mais tarde.'});
        }).finally(() => {
            if(error) {
                return !error
            }
            return error
        });
        return error
    }
    componentDidMount() {
        if(!localStorage.getItem('__tokenAccess')) {
            this.LoginPassport();
        }
        else this.getAllDeliverys();
    }
  
 
    render() {
      
       return (
        <div style={style.container}>
            {this.state.modalOpen ? <ModalMessage size='mini' title={this.state.modalTitle} text={this.state.modalText}></ModalMessage> : null}
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='1'>Nome do Cliente</Table.HeaderCell>
                        <Table.HeaderCell colSpan='1'>Data de Entrega</Table.HeaderCell>
                        <Table.HeaderCell colSpan='1'>Ponto de Partida</Table.HeaderCell>
                        <Table.HeaderCell colSpan='1'>Ponto de Destino</Table.HeaderCell>
                        <Table.HeaderCell colSpan='1'>Ação</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{this.createTable()}</Table.Body>   
            </Table>
        </div>
       );
    }
    

    createTable = () => {
        let table = []
        if(this.state.deliverys.length > 0) {
            for (let i = 0; i < this.state.deliverys.length; i++) {
                let children = []
                children.push( <Table.Cell  key={this.state.deliverys[i].client.name}>{this.state.deliverys[i].client.name}</Table.Cell>)
                children.push( <Table.Cell  key={this.state.deliverys[i].delivery_date}>{this.state.deliverys[i].delivery_date}</Table.Cell>)
                
                for (let j = 0; j < this.state.deliverys[i].addresses.length; j++) {
                    children.push( <Table.Cell  key={this.state.deliverys[i].addresses[j].zip + this.state.deliverys[i].addresses[j].pivot.type + this.state.deliverys[i].addresses[j].number}>{this.state.deliverys[i].addresses[j].zip} - {this.state.deliverys[i].addresses[j].number}</Table.Cell>)
                }
                let url = `/delivery/${this.state.deliverys[i].id}`;
                children.push(<Table.Cell key={this.state.deliverys[i].id + 'btn'}><Button as={ Link }to={url}>Acessar</Button></Table.Cell>)
                table.push(<Table.Row  key={i  + 1}>{children}</Table.Row>)
            }   
        }
      
        return table
    }
}

export default listDelivery;

const style = {
    container: {
        margin: '5%',
    },
   
}
