import React, { Component } from 'react'
import api from '../../service/api'
import ModalMessage from '../partials/modal'


class ProfileDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalText: '',
            delivery: {},
            modalTitle: '',
            modalOpen: false,
            mapState: window.mapState,
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
            this.setState({modalOpen: true, modalTitle: 'Erro', modalText: 'Ocorreu um erro ao tentar autenticar, verifique as credenciais.'});
        }).finally(() => {
            if(error) {
                return !error
            }
            return error
        });
        return error
    }

    findDelivery = () => {
        let error;
        const { match: { params } } = this.props;
        api({
            method: 'GET',
            url: '/api/delivery/find/' + params.id,
            config: { headers: {'Content-Type': 'application/json' }}
        })
        .then((response) => {
            this.setState({delivery : response.data.deliverys});
            console.log(response.data.deliverys)
        })
        .catch((response) =>  {
            console.log(response);
            this.setState({modalOpen: true, modalTitle: 'Erro', modalText: 'Ocorreu um erro ao tentar autenticar, verifique as credenciais.'});
        }).finally(() => {
            if (this.state.mapState.initMap) { 
                var directionsService = new window.google.maps.DirectionsService();
                var directionsDisplay = new window.google.maps.DirectionsRenderer();
                var origin = !this.state.delivery.addresses[0].complent.original.erro ? (this.state.delivery.addresses[0].complent.original.logradouro + ', ' + this.state.delivery.addresses[0].number + ' - '+ this.state.delivery.addresses[0].complent.original.bairro +', '+ this.state.delivery.addresses[0].complent.original.localidade + ' - ' + this.state.delivery.addresses[0].complent.original.uf) : null;
                var destination = !this.state.delivery.addresses[1].complent.original.erro ? this.state.delivery.addresses[1].complent.original.logradouro + ', ' + this.state.delivery.addresses[1].number + ' - '+ this.state.delivery.addresses[1].complent.original.bairro +', '+ this.state.delivery.addresses[1].complent.original.localidade + ' - ' + this.state.delivery.addresses[1].complent.original.uf : null;
				let mapProp= {
					zoom: 11,
					center: {lat: -22.90, lng: -43.30}
				};
                let map = new window.google.maps.Map(document.getElementById("googleMap"), mapProp);
        
                directionsDisplay.setMap(map);
                directionsService.route({
                    origin,
                    destination,
                    travelMode: 'DRIVING'
                  }, function(response, status) {
                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                    } 
                });

                if(error || origin == null || destination == null)
                    this.setState({modalOpen: true, modalTitle: 'Erro', modalText: 'Ocorreu um erro ao tentar carregar mapa, verifique se o endereço é válido.'});
            }
           
        });
        return error
    }
    componentDidMount() {
        if(!localStorage.getItem('__tokenAccess')) {
            this.LoginPassport();
        }
        else this.findDelivery();
    }
  
    
    render() {
      
       return (
      
        <div style={style.container}>
            <div id="googleMap" style={style.map}></div>
            {this.state.modalOpen ? <ModalMessage size='mini' title={this.state.modalTitle} text={this.state.modalText}></ModalMessage> : null}

        </div>
       );
    }
    

   
}
export default ProfileDelivery;

const style = {
    container: {
        margin: '5%',
    },
    map: {
        width:'100%',
        height:'400px'
    }
   
}
