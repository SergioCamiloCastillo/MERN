import {
  basePath,
  apiVersion
} from "./config";
export function signUpApi(data) {
  const url = `${basePath}/${apiVersion}/signUp`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.user) {
        return {
          ok: 200,
          message: "Usuario creado correctamente",
        };
      }
      return {
        ok: false,
        message: result.message,
      };
    })
    .catch((err) => {
      return {
        ok: false,
        message: err.message,
      };
    });
}
export function signInApi(data) {
  const url = `${basePath}/${apiVersion}/signIn`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);

      return result;
    })
    .catch((err) => {
      return err.message;
    });
}
export function getUserApi(token) {
  const url = `${basePath}/${apiVersion}/users`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(url, params).then((response) => {
    return response
      .json()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.message;
      });
  });
}
export function getUserActiveApi(token, status) {
  const url = `${basePath}/${apiVersion}/users-active?active=${status}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(url, params).then((response) => {
    return response
      .json()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err.message;
      });
  });
}
export function uploadAvatarApi(token, avatar, userId) {
  const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;
  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);
  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token
    }
  }
  return fetch(url, params).then(response => {
    return response.json()
  }).then(result => {
    return result;
  }).catch(err => {
    return err.message
  });
}
export function getAvatarApi(avatarName) {
  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;
  return fetch(url).then(response => {
    return response.url;
  }).catch(err => {
    return err.message
  });
}
export function updateUserApi(token, user, userId) {
  const url = `${basePath}/${apiVersion}/update-user/${userId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(user)
  }
  return fetch(url, params).then(response => {
    return response.json()
  }).then(result => {
    return result;
  }).catch(err => {
    return err.message
  });
}