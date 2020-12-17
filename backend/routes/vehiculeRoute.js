import express from 'express';
import Vehicule from '../models/vehiculeModel';

const router = express.Router();

router.get('/', async (req, res) => {
  const vehicules = await Vehicule.find().populate([
    { path: 'marque' },
    { path: 'modele' },
  ]);
  res.send(vehicules);
});

router.get('/:id', async (req, res) => {
  const vehicule = await Vehicule.findOne({ _id: req.params.id }).populate([
    { path: 'marque' },
    { path: 'modele' },
  ]);
  if (vehicule) {
    res.send(vehicule);
  } else {
    res.status(404).send({ message: 'Vehicule Not Found.' });
  }
});

router.put('/:id', async (req, res) => {
  const vehiculeId = req.params.id;
  const vehicule = await Vehicule.findById(vehiculeId);
  if (vehicule) {
    vehicule.nom = req.body.nom;
    vehicule.marque = req.body.marque;
    vehicule.modele = req.body.modele;
    const updatedVehicule = await vehicule.save();
    if (updatedVehicule) {
      return res
        .status(200)
        .send({ message: 'Vehicule Modifiée', data: updatedVehicule });
    }
  }
  return res.status(500).send({ message: ' Erreur en modifiant vehicule.' });
});

router.delete('/:id', async (req, res) => {
  const deletedVehicule = await Vehicule.findById(req.params.id);
  if (deletedVehicule) {
    await deletedVehicule.remove();
    res.send({ message: 'Vehicule Supprimée' });
  } else {
    res.send('Erreur en Suppression vehicule.');
  }
});

router.post('/', async (req, res) => {
  const vehicule = new Vehicule({
    nom: req.body.nom,
    marque: req.body.marque,
    modele: req.body.modele,
  });

  const newVehicule = await vehicule.save();
  if (newVehicule) {
    return res
      .status(201)
      .send({ message: 'Nouvelle vehicule crée', data: newVehicule });
  }
  return res.status(500).send({ message: ' Erreur en création vehicule.' });
});

export default router;
