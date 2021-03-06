import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }) {
  const [github_username, setgithubUserName] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 4000,
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude: Number(latitude),
      longitude: Number(longitude),
    });

    setgithubUserName('');
    setTechs('');
  }

  return (
    <>
      <strong>Cadastro</strong>
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input
            name="github_username"
            id="github_username"
            required
            value={github_username}
            onChange={e => setgithubUserName(e.target.value)}
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

        <button type="submit" className="btn-postcad">
          Salvar
        </button>
      </form>
    </>
  );
}

export default DevForm;
