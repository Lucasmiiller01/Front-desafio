import React, { Component } from 'react'
import { Modal, Button  } from 'semantic-ui-react'

class ModalMessage extends Component {
    state = {
        open: true,
    }
    render() {
        return (
        <div>
            <Modal size={this.props.size} open={this.state.open}>
            <Modal.Header>{this.props.title}</Modal.Header>
            <Modal.Content>
                <p>{this.props.text}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={ () => this.setState({ open: false })}>Fechar</Button>
            </Modal.Actions>
            </Modal>
        </div>
        )
    }
}

export default ModalMessage