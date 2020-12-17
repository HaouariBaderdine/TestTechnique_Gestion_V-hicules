import mongoose from 'mongoose';

const marqueSchema = new mongoose.Schema({
  nom: { type: String, required: true },
});

const marqueModel = mongoose.model('Marque', marqueSchema);

export default marqueModel;
