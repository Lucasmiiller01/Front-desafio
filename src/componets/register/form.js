import React, { Component } from 'react'
import {Message, Form } from 'semantic-ui-react'
import MaskedInput from 'react-text-mask'


class form extends Component {
    constructor(props) {
       super(props);
       this.state = {
            nameClient: '',
            nameClientError: false,
            createDeliveryError: false,
            formError: false,
            dateDelivery: '',
            dateDeliveryError: false,
            zipStart: '',
            zipStartError: false,
            numberStart: '',
            numberStartError: false,
            zipEnd: '',
            zipEndError: false,
            numberEnd: '',
            numberEndError: false,
            deliverySubmit: {},
        }
    }
    handleChange(e) {
        let change = {}
        change[ e.target.name] = e.target.value
        this.setState(change)
    }
    

    SubmitForm = (e) =>  {
        e.preventDefault();
        
        let error = false;

        if(this.state.nameClient.replace(/\D+/g, '') !== "") {
           this.setState({nameClientError: false})
        }
        else {
            error = true;
            this.setState({nameClientError: true})
        }

        if(this.state.dateDelivery !== "" && this.state.dateDelivery.replace(/\D+/g, '').length > 7) {
            this.setState({dateDeliveryError: false})
        }
        else {
            error = true;
            this.setState({dateDeliveryError: true})
        }

        
        if(this.state.zipStart.replace(/\D+/g, '') !== "" && this.state.zipStart.replace(/\D+/g, '').length > 7) {
            this.setState({zipStartError: false})
        }
        else {
            error = true;
            this.setState({zipStartError: true})
        }
        

        if(this.state.numberStart.replace(/\D+/g, '') !== "") {
            this.setState({numberStartError: false})
        }
        else {
            error = true;
            this.setState({numberStartError: true})
        }
        
        if(this.state.zipEnd.replace(/\D+/g, '') !== "" && this.state.zipEnd.replace(/\D+/g, '').length > 7) {
            this.setState({zipEndError: false})
        }
        else {
            error = true;
            this.setState({zipEndError: true})
        }

        if(this.state.numberEnd.replace(/\D+/g, '') !== "") {
            this.setState({numberEndError: false})
        }
        else {
            error = true;
            this.setState({numberEndError: true})
        }
        

        if(error) {
            this.setState({formError: true});
            return;
        }

        this.setState({formError: false});

      
    }

    render() {
        const { nameClient, dateDelivery, zipStart, numberStart, zipEnd,numberEnd } = this.state
       return (
        <div style={style.container}>
        <Form onSubmit={(event) => { this.SubmitForm(event); }} error={this.state.createDeliveryError || this.state.formError}>
            <Message
             error
             header="Erro ao tentar criar pedido"
             content="Preencher o Formúlario corretamente."/>


            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Nome do cliente </label>
                    <Form.Input error={this.state.nameClientError ? true : false} placeholder='Digite o nome do Cliente ...' name="nameClient"  value={nameClient}  onChange={this.handleChange.bind(this)}>
                    </Form.Input>
                </Form.Field>
                <Form.Field>
                    <label>Data de Entrega</label>
                    <Form.Input error={this.state.dateDeliveryError ? true : false} children={
                        <MaskedInput
                            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                            onChange={this.handleChange.bind(this)} 
                            name='dateDelivery'
                            value={dateDelivery} 
                            placeholder="99/99/9999"
                              
                        />}>
                    </Form.Input>
                </Form.Field>
            </Form.Group>
            <h4> Endereço Inicial </h4>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>CEP </label>
                    <Form.Input  error={this.state.zipStartError ? true : false} children={
                        <MaskedInput
                            onChange={this.handleChange.bind(this)}  
                            value={zipStart} 
                            name="zipStart"
                            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                            placeholder="99999-999"
                        />}>
                    </Form.Input>
                </Form.Field>
                <Form.Field>
                    <label>Número</label>
                    <Form.Input error={this.state.numberStartError ? true : false} children={
                        <MaskedInput
                            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                            placeholder="99999999"
                            onChange={this.handleChange.bind(this)}  
                            value={numberStart}
                            name="numberStart"
                        />}>
                    </Form.Input>
                </Form.Field>
            </Form.Group>
            <h4> Endereço Final </h4>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>CEP </label>
                    <Form.Input error={this.state.zipEndError ? true : false} children={
                        <MaskedInput
                            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                            placeholder="99999-999"
                            onChange={this.handleChange.bind(this)}  
                            value={zipEnd}
                            name="zipEnd"
                        />}>
                        
                    </Form.Input>
                </Form.Field>
                <Form.Field>
                    <label>Número</label>
                    <Form.Input error={this.state.numberEndError ? true : false} children={
                        <MaskedInput
                            autoFocus={true}
                            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                            placeholder="99999999"
                            onChange={this.handleChange.bind(this)}  
                            value={numberEnd}
                            name="numberEnd"
                        />}>
                    </Form.Input>
                </Form.Field>
            </Form.Group>
           
            <Form.Button  color="blue" disabled={!nameClient || !dateDelivery || !zipStart || !numberStart || !zipEnd || !numberEnd} type='submit'>Cadastrar </Form.Button>
           
        </Form>
        </div>
       );
    }
 }
 export default form;




const style = {
    container: {
        margin: '5%',
    },
  
   
}

