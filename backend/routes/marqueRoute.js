import express from 'express';
import Marque from '../models/marqueModel';

const router = express.Router();

router.get('/', async (req, res) => {
  const marques = await Marque.find();
  res.send(marques);
});

router.get('/:id', async (req, res) => {
  const marque = await Marque.findOne({ _id: req.params.id });
  if (marque) {
    res.send(marque);
  } else {
    res.status(404).send({ message: 'marque Not Found.' });
  }
});

router.put('/:id', async (req, res) => {
  const marqueId = req.params.id;
  const marque = await Marque.findById(marqueId);
  if (marque) {
    marque.nom = req.body.nom;
    const updatedMarque = await marque.save();
    if (updatedMarque) {
      return res
        .status(200)
        .send({ message: 'Marque Modifiée', data: updatedMarque });
    }
  }
  return res.status(500).send({ message: ' Erreur en modifiant marque.' });
});

router.delete('/:id', async (req, res) => {
  const deletedMarque = await Marque.findById(req.params.id);
  if (deletedMarque) {
    await deletedMarque.remove();
    res.send({ message: 'Marque Supprimée' });
  } else {
    res.send('Erreur en Suppression marque.');
  }
});

router.post('/', async (req, res) => {
  const marque = new Marque({
    nom: req.body.nom,
  });

  const newMarque = await marque.save();
  if (newMarque) {
    return res
      .status(201)
      .send({ message: 'Nouvelle marque crée', data: newMarque });
  }
  return res.status(500).send({ message: ' Erreur en création marque.' });
});

export default router;
