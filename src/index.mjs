import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(201).send({msg:"Hello!"});
})

app.get('/api/users', (req, res) => {
  res.status(200).send([
    {
      id:1,
      username:"admin",
      displayName:"Admin",
    },
    {
      id:2,
      username:"user",
      displayName:"User",
    },
    {
      id:3,
      username:"profile",
      displayName:"Profile",
    },
  ])
})
const pupils = [
  {id:1,mentorId: 'Sherzod', pupil:'Salim', coin:'100', telnumber:'991234567'},
  {id:2,mentorId: 'Sherzod', pupil:'Salmon', coin:'100', telnumber:'991234567'},
  {id:3,mentorId: 'Sherzod', pupil:'Abdulloh', coin:'100', telnumber:'991234567'},
  {id:4,mentorId: 'Sherzod', pupil:'Abdulhamid', coin:'100', telnumber:'991234567'},
  {id:5,mentorId: 'Sherzod', pupil:'Hurshid', coin:'100', telnumber:'991234567'},
  {id:6,mentorId: 'Sherzod', pupil:'Hudoyor', coin:'100', telnumber:'991234567'},
  {id:7,mentorId: 'Sherzod', pupil:'Husanbek', coin:'100', telnumber:'991234567'},
  {id:8,mentorId: 'Sherzod', pupil:'Abdushoxid', coin:'100', telnumber:'991234567'},

]
app.get('/api/pupils', (req, res) => {
  const { query: {
    filter, value
  },} = req;

  if(filter && value) return res.send(
    pupils.filter(pupil => pupil[filter].includes(value))
  )

  return res.send(pupils)

})

app.get('/api/pupils/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);
  if(isNaN(parsedId))
    return res.status(400).send({msg:"Bad Request: Invalid ID"})

  const findPupils = pupils.find(pupils => pupils.id === parsedId)
  if(!findPupils) return res.sendStatus(404)

  return res.send(findPupils)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));