const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion DB
let db;
async function connectDB() {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  console.log('✅ Connecté à la base de données jj');
}
connectDB();

// Route d'inscription mise à jour avec date de naissance
app.post('/api/signup', async (req, res) => {
  try {
    const { nom, prenom, dateNaissance, email, motDePasse, userType, specialite, annee, grade } = req.body;

    // Vérifier si l'email existe
    const [existingUsers] = await db.execute('SELECT * FROM USERS WHERE Email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    // Validation de l'âge (optionnel côté serveur aussi)
    if (dateNaissance) {
      const birthDate = new Date(dateNaissance);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age < 16) {
        return res.status(400).json({ error: 'Vous devez avoir au moins 16 ans pour vous inscrire' });
      }
    }

    // Hasher mot de passe
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // Nouvel ID
    const [maxId] = await db.execute('SELECT MAX(idUser) as maxId FROM USERS');
    const newId = (maxId[0].maxId || 0) + 1;

    // Ajouter à USERS avec date de naissance
    await db.execute(
      'INSERT INTO USERS (idUser, Nom, Prenom, DateNaissance, Email, motDePasse) VALUES (?, ?, ?, ?, ?, ?)',
      [newId, nom, prenom, dateNaissance, email, hashedPassword]
    );

    // Ajouter à ETUDIANT ou ENSEIGNANT
    if (userType === 'etudiant') {
      await db.execute(
        'INSERT INTO ETUDIANT (idUser, Specialite, Annee) VALUES (?, ?, ?)',
        [newId, specialite, annee]
      );
    } else if (userType === 'enseignant') {
      await db.execute(
        'INSERT INTO ENSEIGNANT (idUser, Specialite, Grade) VALUES (?, ?, ?)',
        [newId, specialite, grade]
      );
    }

    res.json({ success: true, message: 'Compte créé avec succès !' });

  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'inscription' });
  }
});

// CONNEXION
app.post('/api/login', async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Chercher utilisateur
    const [users] = await db.execute(
      `SELECT u.*, e.Specialite, 'etudiant' as role 
       FROM USERS u 
       LEFT JOIN ETUDIANT e ON u.idUser = e.idUser 
       WHERE u.Email = ?
       UNION
       SELECT u.*, ens.Specialite, 'enseignant' as role 
       FROM USERS u 
       LEFT JOIN ENSEIGNANT ens ON u.idUser = ens.idUser 
       WHERE u.Email = ?`,
      [email, email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const user = users[0];

    // Vérifier mot de passe
    const validPassword = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Retourner info utilisateur
    const userInfo = {
      id: user.idUser,
      nom: user.Nom,
      prenom: user.Prenom,
      email: user.Email,
      role: user.role,
      specialite: user.Specialite
    };

    res.json({ success: true, user: userInfo });

  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${process.env.PORT}`);
});