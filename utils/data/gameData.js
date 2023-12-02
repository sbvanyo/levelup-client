import { clientCredentials } from '../client';

function toCamelCase(obj) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(/(_\w)/g, (k) => k[1].toUpperCase());
    newObj[newKey] = obj[key];
  });
  return newObj;
}

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleGame = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(toCamelCase(data)))
    .catch(reject);
});

const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateGame = (id, postBody) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response not ok.');
      }
      if (response.status === 204) {
        return null;
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gametypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteGame = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok && response.status !== 204) {
        return response.json();
      } if (response.ok) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    })
    .then((data) => resolve((data)))
    .catch(reject);
});
// eslint-disable-next-line import/prefer-default-export
export {
  getGames,
  getSingleGame,
  createGame,
  updateGame,
  getGameTypes,
  deleteGame,
};
