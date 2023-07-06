const express = require('express')
const router = express.Router()

var querystring = require('querystring'); 
const axios = require('axios');

router.get('/',(req,res)=>{
    axios({
        method: 'get',
        url: 'http://orion-ld-service:1026/ngsi-ld/v1/subscriptions' 
        //url: 'http://192.168.49.2:30100/v2/entities' // external communication
    }).then((apiResponse) => {
        const subscriptions = apiResponse.data;
        res.status(200).json({success:true, data:subscriptions
        });
    }).catch((error) => console.log(error));
})

router.post('/orionv2', (request,response)=> {
	console.log('new, v2 entities name:' + request.body.name);
    const myid = request.body.id;
    const mytype = request.body.type;
    const myname = request.body.name;
    const newData = {'id':myid, 'type':mytype, 'name':myname};
	console.log('newData id:' + newData.myid);
    let axiosConfig ={
        headers:{
            'Content-Type': 'application/json'
        }
    };
    axios({method:'post',url:'http://orion-ld-service:1026/v2/entities', data:{'id':myid,'type':mytype,'name':myname}, headers:{'Content-Type':'application/json'}})
    .then(apiResponse=>{
        response.status(200).json({success:true,data:apiResponse.data
        });
    }).catch((error) =>{
      response.status(400).json({'message':error});
    })
})


router.post('/new', (request,response)=> {
	console.log('device NGSI-LD request body description:' + request.body.description);
	console.log('device NGSI-LD request body type:' + request.body.type);
    const mydescription = request.body.description;
    const mytype = request.body.type;
    const myentities = request.body.entities;
    const watchedAttributes = request.body.watchedAttributes;
    const newSubscription = {
        'description':mydescription, 
        'type':mytype, 
        'entities':myentities
    };
	console.log('newData id:' + newSubscription.myentities);
    let axiosConfig ={
            'Content-Type': 'application/ld+json'
    };
    axios({method:'post',url:'http://orion-ld-service:1026/ngsi-ld/v1/subscriptions', data:newSubscription, headers:axiosConfig})
    .then(apiResponse=>{
        response.status(200).json({success:true,data:apiResponse.data
        });
    }).catch((error) =>{
      response.status(400).json({'message':error});
    })
})


router.get('/:id',(req,res)=>{
    const entity_id = req.params.id
    axios.get(`http://orion-ld-service:1026/v2/entities/${entity_id}`)
    .then((apiResponse) => {
        const entity = apiResponse.data
        res.status(200).json({success:true, data:entity
        })
    }).catch((error) => console.log(error));
})


router.put('/:id', (req,res)=>{
    const {id} = req.params
    const entity = req.body
    axios.put(`http://orion-ld-service:1026/v2/entities/${entity_id}`)
    .then((apiResponse) => {
        res.status(200).json({success:true
        })
    }).catch((error) => console.log(error));
})

router.delete('/:id',(req,res)=>{
    const entity_id = req.params.id
    axios.delete(`http://orion-ld-service:1026/v2/entities/${entity_id}`)
    .then((apiResponse) => {
        res.status(200).json({success:true
        })
    }).catch((error) => console.log(error));
})

module.exports = router
