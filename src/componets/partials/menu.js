import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";

export default class menu extends Component {
    state = { activeItem: 'home' }
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
        <Menu pointing secondary>
          <Menu.Item name='Cadastrar Pedidos' as={ Link }  to='/' active={activeItem === 'Cadastrar Pedidos'} onClick={this.handleItemClick} />
          
            <Menu.Item
                name='Listar Pedidos'
                as={ Link }  to='/list'
                active={activeItem === 'Listar Pedidos'}
                onClick={this.handleItemClick}
            />
    
        </Menu>
      )
    }
  }