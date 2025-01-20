// generateCSV.js
import fs from "fs"; //fs: È il modulo nativo di Node.js per interagire con il filesystem. Viene utilizzato per scrivere i file CSV sul disco
import { faker } from "@faker-js/faker";//faker: Viene utilizzato per generare dati casuali (nomi, email, date di nascita, ecc.). @faker-js/faker è una versione aggiornata della libreria faker
import { Parser } from "json2csv";//json2csv: È una libreria che converte oggetti JSON in formato CSV. Viene usato il Parser per convertire gli array di oggetti in formato CSV


//funzione genera e restituisce un oggetto che rappresenta un autore
const newRandomUser = () => {
  return {
    nome: faker.person.firstName(),
    cognome: faker.person.lastName(),
    email: faker.internet.email(),
    data_di_nascita: faker.date.birthdate(),
    avatar: faker.image.avatar(),
  };
};

//funzione genera un oggetto che rappresenta un blog post
const newBlogPost = (num, authors) => {
  const author =
    authors[Math.floor(Math.random() * authors.length)];
  return {
    categoria: faker.commerce.department(),
    titolo: faker.lorem.sentence(),
    cover: faker.image.url(),
    readTime: {
      value: faker.number.int({ min: 1, max: 20 }),
      unit: "minutes",
    },
    author: `${author.email}`, //email di un autore selezionato casualmente dall'array authors. Ogni blog post ha un autore associato
    content: faker.lorem.paragraphs(),//restituisce un numero casuale di paragrafi
  };
};

//funzione genera un array di autori casuali
const generateAuthors = (num) => {//parametro num, che indica il numero di autori da generare
  const authors = [];
  for (let i = 0; i < num; i++) {
    authors.push(newRandomUser());//Per ogni autore, viene chiamata la funzione newRandomUser() e l'autore viene aggiunto all'array authors
  }
  return authors;//la funzione restituisce l'array di autori
};


//funzione genera un array di blog post
const generateBlogPosts = (num, authors) => {//num: Il numero di blog post da generare - authors: array di autori (generato dalla funzione generateAuthors)
  const blogPosts = [];
  for (let i = 0; i < num; i++) {
    blogPosts.push(newBlogPost(i, authors));//Per ogni blog post, viene chiamata la funzione newBlogPost() che crea un post con un autore scelto casualmente tra gli autori passati. I blog post vengono aggiunti all'array blogPosts
  }
  return blogPosts;//la funzione restituisce l'array di blog post
};


//Generazione di autori e blog post
const authors = generateAuthors(50);//Viene chiamata la funzione generateAuthors(50) per generare 50 autori casuali
const blogPosts = generateBlogPosts(100, authors);//Viene chiamata la funzione generateBlogPosts(100, authors) per generare 100 blog post, utilizzando gli autori generati in precedenza.

//Creazione dei file CSV
const authorCsv = new Parser().parse(authors);//Viene creato il file CSV per gli autori. Utilizzando la libreria json2csv, l'array di autori (authors) viene convertito in formato CSV
const blogPostCsv = new Parser().parse(blogPosts);//Viene creato il file CSV per i blog post. L'array di blog post (blogPosts) viene convertito in formato CSV

//Entrambi i file vengono poi scritti nel filesystem nella cartella default_files con i nomi authors.csv e blogPosts.csv
fs.writeFileSync("./default_files/authors.csv", authorCsv);
fs.writeFileSync(
  "./default_files/blogPosts.csv",
  blogPostCsv
);

console.log("CSV files generated successfully.");
