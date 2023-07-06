const express = require('express')
const router = express.Router()


router.use(express.json());

var querystring = require('querystring'); 
const axios = require('axios');
const { values } = require('lodash');

router.get('/',(req,res)=>{
    axios({
        method: 'get',
        url: 'http://orion-ld-service:1026/v2/entities' 
        //url: 'http://192.168.49.2:30100/v2/entities' // external communication
    }).then((apiResponse) => {
        const entities = apiResponse.data;
        res.status(200).json({success:true, data:entities
        });
    }).catch((error) => console.log(error));
})

router.post('/new', (request,response)=> {
    const myid = request.body.id;
    const mytype = request.body.type;
    const myname = request.body.name['value'];
    const mycontext = request.body['@context'];
    // null includes also undefined because (undefined == null) is true
    if (mycontext == null){ 
        var orion = 'http://orion-ld-service:1026/v2/entities';
        var myheaders = { headers: { "content-type": "application/json" },json:true };
        var mypayload = {
           id: request.body.id,
           type:request.body.type,
           name:{type:"Property",value:request.body.name}
        };
        //var mypayload = request.body; //without context this way does NOT work!!
        console.log('context is undefined!, mypayload is:' + mypayload);
    } else {
        var orion = 'http://orion-ld-service:1026/ngsi-ld/v1/entities';
        var myheaders = { headers: { "content-type": "application/ld+json" },json:true };
        var mypayload = request.body;
        console.log('inside else context is ' + mycontext);
    };
	console.log('device,  orion:' + orion);
	console.log('device,  mypayload:' + mypayload);
	console.log('device,  myheaders:' + myheaders);
    axios.post(orion, mypayload, myheaders)
    .then(function(apiResponse){
        response.status(200).json({success:true,data:apiResponse.data
        });
    })
    .catch(function(error){
      response.status(400).json({'message':error.response});
     // response.status(400).json({'message':error});
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
