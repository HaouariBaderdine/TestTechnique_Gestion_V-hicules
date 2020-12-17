import mongoose from 'mongoose';

const modeleSchema = new mongoose.Schema({
  nom: { type: String, required: true },
});

const modeleModel = mongoose.model('Modele', modeleSchema);

export default modeleModel;
