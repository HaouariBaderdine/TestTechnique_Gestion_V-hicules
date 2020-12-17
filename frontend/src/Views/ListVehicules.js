import React, { useState, useEffect } from "react";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";
import { Button, Card, Row } from "reactstrap";
import ReactTable from "react-table";
import DataTablePagination from "../utils/DatatablePagination";
import axios from 'axios'


const ListVehicules = ({ history, match }) => {
  const [vehiculeList, setVehiculeList] = useState([])
  const [deleteItem, setdeleteItem] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:5000/api/vehicules').then((res) => {
      setVehiculeList(res.data);
    })
  }, [deleteItem])
  const deleteVehicule = (id) => {
    axios.delete(`http://localhost:5000/api/vehicules/${id}`).then(()=>setdeleteItem(!deleteItem))
  }
  console.log('data', vehiculeList)
  return (
    <div>
      <Row>
        <div className="col-md-12 mt-12">
          <Card style={{ padding: 20 }}>
            <h1 className="mt-3 text-center">Véhicule</h1>

            <Row>
              <Button
                onClick={() => history.push(`/addVehicule`)}
                style={{ margin: "10px auto" }}
              >
                Add Véhicule
              </Button>
              <div className="col-md-12 mt-12">
                <Card>
                  <h3 className="mt-3 text-center">Liste des véhicules</h3>
                  <ReactTable
                    columns={[
                      {
                        Header: "Nom Véhicule",
                        accessor: "nom",
                      },

                      {
                        Header: "Supprimer",
                        Cell: (row) => {
                          return (
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img
                              src={deleteIcon}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                deleteVehicule(row.original._id);
                              }}
                            />
                          );
                        },
                      },
                      {
                        Header: "Modifier",
                        Cell: (row) => {
                          return (
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img
                              src={editIcon}
                              style={{ cursor: "pointer" }}
                              onClick={() => history.push(`/modifyVehicule/${row.original._id}`)}
                            />
                          );
                        },
                      },
                    ]}
                    data={vehiculeList}
                    defaultPageSize={5}
                    showPageJump={false}
                    showPageSizeOptions={false}
                    PaginationComponent={DataTablePagination}
                  />
                </Card>
              </div>
            </Row>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default ListVehicules;
