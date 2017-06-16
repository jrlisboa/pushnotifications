import React from 'react';
import { observer, inject } from 'mobx-react';
import '../../styles/App.css';
import '../../styles/notifications.css';

export default inject(["store"]) (observer(({ store }) => (
  <div className="row">
    <div className="row">
      <div className="col s12">
        <ul className="tabs">
          <li className="tab col s3 offset-s3"><a href="#historico"> HISTÓRICO <i className="material-icons right">clear_all</i></a></li>
          <li className="tab col s3"><a href="#criar"> CRIAR <i className="material-icons right">add</i></a></li>
        </ul>
      </div>
      <div id="historico" className="col s12 notCards">

        <div className="col s12 m5 offset-m1">
          <div className="card-panel notification white">
            <div className="conteudoNotfi">
              <img src="https://verios.com.br/wp-content/uploads/2017/02/ueslei-big.png" className="col s3" alt="cardImage" />
              <span className="notTitle col s8">Temos uma atualização.</span>
              <span className="notBody col s8">I am a very simple card. I am good at containing small bits of information.</span>
              <span className="notWeb col s8">https://verios.com.br</span>
            </div>
          </div>
        </div>

      </div>
      <div id="criar" className="col s12">
        <div className="container">
          <div className="notForm col s12">
            <div className="input-field col s6">
              <input id="last_name" type="text"  data-length="35" className="validate" onChange={e => store.setTitle(e.target.value) }/>
              <label htmlFor="last_name">Título da Notificação</label>
            </div>
            <div className="input-field col s6">
              <input id="last_name" type="text"  data-length="100" className="validate" onChange={e => store.setBody(e.target.value) }/>
              <label htmlFor="last_name">Corpo da Notificação</label>
            </div>
          </div>
          <div className="notPreview col s12">
            <span className="notPreviewTitle col s12">Visualizar Notificação:</span>

            <div className="col s12 m8 offset-m2">
              <div className="card-panel notification preview white">
                <div className="conteudoNotfi">
                  <div className="notImg col s3"><img src="https://verios.com.br/wp-content/uploads/2017/02/ueslei-big.png" className="col s12" alt="icone" /></div>
                  <span className="notTitle col s8">{store.notTitle === "" ? "Temos uma atualização!" : store.notTitle}</span>
                  <span className="notBody col s8">{store.notBody === "" ? "I am a very simple card. I am good at containing small bits of information." : store.notBody}</span>
                  <span className="notWeb col s8">https://verios.com.br</span>
                </div>
              </div>
            </div>

            <div className="col s12 notSend">
              <a className="waves-effect btn col s4 offset-s4" id="enviarPush"><i className="material-icons right">cloud</i>notificar inscritos</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
))) ;
