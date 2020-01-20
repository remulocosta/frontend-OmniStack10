import React, { useEffect, useState } from 'react';

import swal from 'sweetalert';

import './global.css';
import './App.css';

import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevFormEdit from './components/DevFormEdit';
import DevItem from './components/DevItem';
import api from './services/api';

function App() {
  const [devEdit, setDevEdit] = useState(null);
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

  async function handleEditedDev(data) {
    const response = await api.put(`/devs/${data.id}`, { data });

    const { name, techs, location } = response.data;
    console.log(name, techs, location);
    //const devIndex = devs.findIndex(d => d._id === data.id);

    const devsResult = devs.map(dev => {
      if (dev._id === data.id) {
        dev.name = data.name;
        dev.techs = data.techs.split(',').map(arrS => arrS.trim());
        dev.location.coordinates = [
          Number(data.longitude),
          Number(data.latitude),
        ];
      }
      return { ...dev };
    });

    setDevs(devsResult);
    setDevEdit(null);
  }

  function handleEditDev(dev) {
    setDevEdit(dev);
  }

  function handlerCancel() {
    setDevEdit(null);
  }

  return (
    <div id="app">
      <aside>
        {devEdit ? (
          <DevFormEdit
            dev={devEdit}
            onSubmit={handleEditedDev}
            cancelDev={handlerCancel}
          />
        ) : (
          <DevForm onSubmit={handleAddDev} />
        )}
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem
              key={dev._id}
              dev={dev}
              deleteDev={confirmDelete}
              editDev={handleEditDev}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
