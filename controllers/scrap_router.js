const router = require('express').Router();
const dbscrap = require('../dbUtils/scrap_utils');
const rp = require('request-promise');
const $ = require('cheerio');




router.get("/", (req, res) =>{
    res.send("This is home page !");
});

router.post("/scrapdata", (req,res) =>{

    console.log("This is router");
    
    const url = 'https://timesofindia.indiatimes.com/';
    
    rp(url).then(html => {
        const TOIUrls = [];
        const regex = new RegExp('/articleshow/[0-9]*.cms\\b', 'g');   
       

        console.log($('#content li  a', html).length)
        //console.log($('#content  li  a', html));
       
        
        for (let i = 0; i < $('#content li  a', html).length; i++) {
            

              TOIUrls.push($('#content li  a', html)[i].attribs.href);
            //console.log(TOIUrls);       
            
        }        
        const matchedLinks = TOIUrls.filter(link => link.match(regex));
        console.log(matchedLinks);
        //res.json(matchedLinks);

        dbscrap.addLinks(matchedLinks).then(response =>{
            console.log("valid links : " + response);
            res.json({response});
        }).catch(err =>{
            res.json({err : "Unable to load"});
        })
    });
});

router.get("/articlelist", (req,res) => {
console.log("Valid Links");
dbscrap.getAll().then(validarticles => {
        console.log("valid article : " +JSON.stringify(validarticles));
        res.json({validarticles});
    }).catch(err => {
        console.log("error : " +err);
        res.json({err : "Unable to load articles !"});
    });
})

module.exports = router;