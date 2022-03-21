const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8100;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/:id', function(req, res) {
  const id = String(req.params.id);

  // si l'on est sur une page on redirigie sur la home
  if (id === 'home') {
    res.sendFile(path.join(__dirname, '/index.html'));
  } else {
    // on récupère le début et l'extension du fichier
    const dirCont = fs.readdirSync('/home/ubuntu/loginMTG/front/');
    let idPoint = id.indexOf('.');
    const debutFile = id.slice(0, idPoint);
    idPoint = id.lastIndexOf('.');
    const extension = id.slice(idPoint, id.length);
    const regex = new RegExp(debutFile + '.?[0-9a-zA-Z]*' + extension, "g");
    // on compare le resultat au contenu du dossier source
    const files = dirCont.filter( function( elm ) {return elm.match(regex);});

    // si le fichier existe, on le retourne
    if (files.length > 0) {
      res.sendFile('/home/ubuntu/' + ((files[0].length === id.length) ? files[0] : files[1]));
    }
  }
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
