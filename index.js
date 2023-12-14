import express from "express";
const app = express();

//parsing the body when POST request
app.use(express.json());

// update this in-memory object according to the requirements
const users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
      { healthy: false },
    ],
  },
];

app.get("/", (req, res) => {
  let johnKidney = users[0].kidneys;
  // console.log(johnKidney);
  let numberOfKidneys = johnKidney.length;
  let numberofHealtyKidneys = 0;
  for (let i = 0; i < numberOfKidneys; i++) {
    if (johnKidney[i].healthy) {
      numberofHealtyKidneys++;
    }
  }
  let numberOfUnhealthyKidney = numberOfKidneys - numberofHealtyKidneys;

  res.json({
    johnKidney,
    numberofHealtyKidneys,
    numberOfUnhealthyKidney,
  });
});

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done!",
  });
});

app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }

  res.json({
    msg: "Updated data",
  });
});

app.delete("/", (req, res) => {
  const newKidney = [];
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys.healthy) {
      newKidney.push({
        healthy: true,
      });
    }
  }

  users[0].kidneys = newKidney;
  res.json({
    msg: "Data deleted",
  });
});
app.listen(3000, () => {
  console.log("Express server initialized");
});

// thisnis tyhe