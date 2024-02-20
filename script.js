const express = require("express");
const app = express();

const supabase = require("@supabase/supabase-js");
const db = supabase.createClient(
  "https://bmumedtpjidqooiqputa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtdW1lZHRwamlkcW9vaXFwdXRhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzIyNjYwMCwiZXhwIjoyMDIyODAyNjAwfQ.tWWyNeV4cpr4CiwR1EFhFBO_0OWq7FD1s-6gaGgpEqs"
);

app.use(express.json());

const commandes = [];
const produits = [];
const categorie = [];

// Ajouter un produit
app.post("/produit", (req, res) => {
  const produit = req.body;
  produits.push(produit);
  res.json({ message: "Produit ajouté avec succès", produit });
});
// Ajouter un produit sur supabase
app.post("/produits", async (req, res) => {
  const { error } = await db
    .from("Produits")
    .insert({ Nom: "burger", Prix: 5.0, Catégorie: 1 });

  console.log(error);

  res.send("add");
});

// Récupérer la liste des produits
app.get("/produit", (req, res) => {
  res.json(produits);
});
//Récupérer la liste des produits sur supabase
app.get("/produits", async (req, res) => {
  let { data, error } = await db.from("Produits").select();
  console.log(error);
  res.send(data);
});

//Supprimer un produit
app.delete("/produit", async (req, res) => {
  const { data, error } = await db.from("produits").delete().eq("id", 4);
  res.send("fin");
});
//Supprimer un produit sur supabase
app.delete("/produits/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("Produits")
    .delete()
    .eq("id", req.params.id);
  res.send("del");
});

// Passer une commande
app.post("/commandes", (req, res) => {
  const commande = req.body;
  commandes.push(commande);
  res.json({ message: "Commande passée avec succès", commande });
});
//Passer une commande sur supabase
app.post("/commande", async (req, res) => {
  const { error } = await db.from("Orders").insert({ name_order: "angel" });

  console.log(error);

  res.send("add");
});

// Récupérer la liste des commandes
app.get("/commandes", (req, res) => {
  res.json(commandes);
});

//Récupérer la liste des commandes sur supabase
app.get("/commande", async (req, res) => {
  let { data, error } = await db.from("Orders").select();
  console.log(error);
  res.send(data);
});

// supprimer une commande
app.delete("/commandes", async (req, res) => {
  const { data, error } = await db.from("commandes").delete().eq("id", 4);
  res.send("fin");
});
//Supprimer une commande sur supabase
app.delete("/commande/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("Orders")
    .delete()
    .eq("id", req.params.id);
  res.send("del");
});

// Ajouter une catégorie
app.post("/categories", (req, res) => {
  const categorie = req.body;
  categorie.push(categorie);
  res.json({ message: "Catégorie ajoutée avec succès", categorie });
});
// Ajouter un categorie sur supabase
app.post("/categorie", async (req, res) => {
  const { error } = await db
    .from("Categories")
    .insert({ nom_categorie: "dessert" });

  console.log(error);

  res.send("add");
});

// Récupérer la liste des catégories
app.get("/categories", (req, res) => {
  res.json(categorie);
});

//Récupérer la liste des catégories sur supabase
app.get("/categorie", async (req, res) => {
  let { data, error } = await db.from("Categories").select();
  console.log(error);
  res.send(data);
});

//Supprimer une catégorie
app.delete("/categories", async (req, res) => {
  const { data, error } = await db.from("categories").delete().eq("id", 4);
  res.send("fin");
});

//Supprimer une categorie sur supabase
app.delete("/categorie", async (req, res) => {
  const { data, error } = await supabase
    .from("Categories")
    .delete()
    .eq("id", 4);
  res.send("del");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
