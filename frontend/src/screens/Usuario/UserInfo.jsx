import React, { useState, useEffect, useContext } from "react";
import "./UserInfo.css";
import * as topBarCtxt from "../../components/TopBarCtxt";
import * as usr from "../../User";
import AvatarEditor from "react-avatar-editor";
import * as api from "../../api/api";

export default function UserInfo() {
  var editor = "";
  const { topBarInfo, setTopBarInfo } = useContext(topBarCtxt.Ctxt);
  const [imagenPerfil, setImagenPerfil] = useState(usr.readUser().imagenPerfil);
  const [userInfo, setUserInfo] = useState(usr.readUser());

  const setEditorRef = (ed) => {
    editor = ed;
  };

  const handleNewImage = (img) => {
    try {
      console.log(img);
      setImagenPerfil(img.target.files[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (userInfo.googleId != undefined && userInfo.googleId != "") {
      topBarCtxt.setTopBarInfo(
        topBarCtxt.menuByGoogleUserInfo.UserInfo,
        topBarInfo,
        setTopBarInfo
      );
    } else {
      topBarCtxt.setTopBarInfo(
        topBarCtxt.menuByUserInfo.UserInfo,
        topBarInfo,
        setTopBarInfo
      );
    }
  }, []);

  return (
    <div id="userinfo-main" className="main-screen">
      <div id="info-container">
        <div id="info-columns">
          <div id="info-colmn-one" className="info-column">
            <label>
              <h2>Nombre</h2>
              <input
                type="text"
                value={userInfo.nombre}
                className="user-input"
                onChange={async (data) => {
                  await setUserInfo({ ...userInfo, nombre: data.target.value });
                }}
              />
            </label>
            <label>
              <h2>Email</h2>
              <input
                type="text"
                value={userInfo.email}
                className="user-input"
                onChange={async (data) => {
                  await setUserInfo({ ...userInfo, email: data.target.value });
                }}
              />
            </label>
            <label>
              <h2>Teléfono</h2>
              <input
                type="text"
                value={userInfo.telefono}
                className="user-input"
                onChange={async (data) => {
                  await setUserInfo({
                    ...userInfo,
                    telefono: data.target.value,
                  });
                }}
              />
            </label>
            <label>
              <h2>Direccion</h2>
              <input
                type="text"
                value={userInfo.direccion}
                className="user-input"
                onChange={async (data) => {
                  await setUserInfo({
                    ...userInfo,
                    direccion: data.target.value,
                  });
                }}
              />
            </label>
            <label>
              <h2>Ciudad</h2>
              <input
                type="text"
                value={userInfo.ciudad}
                className="user-input"
                onChange={async (data) => {
                  await setUserInfo({ ...userInfo, ciudad: data.target.value });
                }}
              />
            </label>
          </div>
          <div id="info-colmn-two" className="info-column">
            <label>
              <h2>Apellidos</h2>
              <input
                type="text"
                value={userInfo.apellidos}
                className="user-input"
                onChange={async (data) => {
                  await setUserInfo({
                    ...userInfo,
                    apellidos: data.target.value,
                  });
                }}
              />
            </label>
            <label>
              <h2>Nombre Usuario</h2>
              <input
                type="text"
                value={userInfo.username}
                className="user-input"
                onChange={async (data) => {
                  await setUserInfo({
                    ...userInfo,
                    username: data.target.value,
                  });
                }}
              />
            </label>
            <label>
              <h2>Móvil</h2>
              <input
                type="text"
                value={userInfo.movil}
                className="user-input"
                onChange={async (data) => {
                  await setUserInfo({ ...userInfo, movil: data.target.value });
                }}
              />
            </label>
            <label>
              <h2>Código Postal</h2>
              <input
                type="text"
                value={userInfo.codigoPostal}
                className="user-input"
                onChange={async (data) => {
                  await setUserInfo({
                    ...userInfo,
                    codigoPostal: data.target.value,
                  });
                }}
              />
            </label>
            <label>
              <h2>Província</h2>
              <input
                type="text"
                value={userInfo.provincia}
                className="user-input"
                onChange={async (data) => {
                  await setUserInfo({
                    ...userInfo,
                    provincia: data.target.value,
                  });
                }}
              />
            </label>
          </div>
          <div id="info-colmn-three" className="info-column">
            <div>
              <AvatarEditor
                width={300}
                height={300}
                image={imagenPerfil}
                ref={setEditorRef}
                border={0}
                borderRadius={300}
              />
            </div>
            <div id="img-buttons">
              <label htmlFor="file-upload" className="custom-file-upload">
                <i className="fa fa-cloud-upload"></i> Subir Imagen
              </label>
              <input
                id="file-upload"
                name="newImage"
                type="file"
                onChange={(e) => handleNewImage(e)}
              />
            </div>
          </div>
        </div>
        <div id="info-save-container">
          <h2
            id="info-save-button"
            onClick={async () => {
              if (setEditorRef) {
                const canvasScaled = editor.getImageScaledToCanvas();
                const croppedImg = canvasScaled.toDataURL();
                userInfo.imagenPerfil = croppedImg;

                setUserInfo(userInfo);
                await api.saveUsuario({ userInfo });
                usr.saveUser(userInfo);
                window.location.reload(false);
              }
            }}
          >
            Guardar
          </h2>
        </div>
      </div>
    </div>
  );
}
