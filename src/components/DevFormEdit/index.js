import React, { useState, useEffect } from 'react';

function DevForm({ dev, onSubmit, cancelDev }) {
  const [github_username, setgithubUserName] = useState('');
  const [name, setName] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    if (dev) {
      setgithubUserName(dev.github_username);
      setName(dev.name);
      setTechs(dev.techs.join(', '));
      setLatitude(dev.location.coordinates[1]);
      setLongitude(dev.location.coordinates[0]);
    }
  }, [dev]);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      id: dev._id,
      github_username,
      name,
      techs,
      latitude: Number(latitude),
      longitude: Number(longitude),
    });
  }

  return (
    <>
      <strong>Edição</strong>
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input
            name="github_username"
            id="github_username"
            readOnly
            value={github_username}
            onChange={e => setgithubUserName(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="name">Nome</label>
          <input
            name="name"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs"
            id="techs"
            required
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              name="latitude"
              id="latitude"
              required
              type="number"
              step="any"
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              name="longitude"
              id="longitude"
              required
              type="number"
              step="any"
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>
        <div className="formfooter">
          <button type="button" className="btn-cancel" onClick={cancelDev}>
            Cancelar
          </button>
          <button type="submit" className="btn-post">
            Salvar
          </button>
        </div>
      </form>
    </>
  );
}

export default DevForm;
