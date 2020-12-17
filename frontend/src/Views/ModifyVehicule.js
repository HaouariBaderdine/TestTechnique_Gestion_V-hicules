import React, { useState, useEffect } from "react";
import { Button, Card, Row, Label } from "reactstrap";
import { Select, MenuItem } from "@material-ui/core";
import axios from 'axios'

const ModifyVehicule = ({ history }) => {
  const [modele, setmodele] = useState('');
  const [marque, setmarque] = useState('');
  const [marqueList, setMarqueList] = useState([])
  const [modeleList, setModeleList] = useState([])

  console.log('history', history)
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/modeles').then((res) => {
      setModeleList(res.data);
    })
    axios.get('http://localhost:5000/api/marques').then((res) => {
      setMarqueList(res.data);
    })
  }, []);

  const onSubmit = () => {
    const dataVehicule = {
      nom: marque.nom +' '+ modele.nom,
      marque: marque._id,
      modele: modele._id
    }
    const _id = history.location.pathname.replace('/modifyVehicule/', '');
    axios.put(`http://localhost:5000/api/vehicules/${_id}`, dataVehicule).then(() => history.goBack())
  }

  useEffect(() => {
    const _id = history.location.pathname.replace('/modifyVehicule/', '');
    axios.get(`http://localhost:5000/api/vehicules/${_id}`).then((res) => {
      setmarque(res.data.marque);
      setmodele(res.data.modele)
    })
  }, [history.location.pathname])
  
  console.log('marque',marque,'modele',modele)
  
  return (
    <div>
      <Row>
        <div className="col-md-12 mt-12">
          <Card style={{ padding: 20, height: 500 }}>
            <h1 className="mt-3 text-center">Véhicule</h1>

            <Row>
              <Button
                onClick={() => history.goBack()}
                style={{ margin: "10px auto" }}
              >
                Retour
              </Button>
              <div className="col-md-12 mt-12">
                <h3 className="mt-3 text-center">Modifier des Véhicule</h3>
                <Row className="col-md-12">
                  <div className="col-md-6">
                    <Label className="mt-4">Marque : </Label>
                    <Select
                      style={{
                        width: "18pc",
                        border: "1px solid #d7d7d7",
                        background: "white",
                      }}
                      displayEmpty
                      value={marque}
                      name='marque'
                      id='marqueId'
                      onChange={(e) => setmarque(e.target.value)}
                    >          
                      <MenuItem value={marque}>{marque.nom}</MenuItem>
                      {marqueList.map((el, index) => (
                        <MenuItem key={index} value={el} >
                          {el.nom}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="col-md-6">
                    <Label className="mt-4">Model : </Label>
                    <Select
                      style={{
                        width: "18pc",
                        border: "1px solid #d7d7d7",
                        background: "white",
                      }}
                      value={modele}
                      name='modele'
                      id='modeleId'
                      onChange={(e) => setmodele(e.target.value)}
                    >
                      <MenuItem value={modele}>{modele.nom}</MenuItem>
                      {modeleList.map((el, index) => (
                        <MenuItem key={index} value={el}>
                          {el.nom}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <Button color="primary" style={{ margin: "15px auto" }} disabled={!marque || !modele} onClick={() => onSubmit()}>Submit</Button>
                </Row>
              </div>
            </Row>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default ModifyVehicule;



