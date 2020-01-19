import React, { useEffect, useState } from 'react';

import swal from 'sweetalert';

import './global.css';
import './App.css';

import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
import api from './services/api';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleDeleteDev(dev) {
    try {
      await api.delete(`/devs/${dev._id}`);
      const devsResult = devs.filter(devDel => {
        return devDel !== dev;
      });

      setDevs(devsResult);
    } catch (error) {
      console.log(error);
    }
  }

  function confirmDelete(dev) {
    swal({
      text: `Deseja excluir o Dev: ${dev.name} ?`,
      icon: 'warning',
      dangerMode: true,
      buttons: ['Não', 'Sim'],
    }).then(async willDelete => {
      if (willDelete) {
        try {
          handleDeleteDev(dev);
          console.log('Dev excluído com sucesso');
        } catch (error) {
          console.log('Falha ao excluir, entre em contato com o suporte');
        }
      }
    });
  }

  async function handleAddDev(data) {
    const response = await api.post('/devs', { data });
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} deleteDev={confirmDelete} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
