const express=require("express");
const fs=require("fs");
const path=require("path");
const bodyParser = require('body-parser');
const app=express();
const session=require("express-session");
app.use(bodyParser.json());
//app.use(sessionchecker);
app.use(express.static("views"));
//app.use(express.bodyParser());
app.use(bodyParser.urlencoded({
    extended:true
  }));

  function fetch_data(pathdata,callback)
  {
      let rawdata = fs.readFile(path.resolve(__dirname, './'+pathdata),'utf-8',function(err,data)
                                                                             {
                                                                                if(err)
                                                                                {
                                                                                    console.log("having an error");
                                                                                }
                                                                                else
                                                                                {
                                                                                    //console.log("find ");
                                                                                    callback(JSON.parse(data.toString()));
                                                                                }
                                                                            });   
  };

    app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname+"/views/home.html"));
    });

    var i=0;
    app.get("/login",(req,res)=>{
        fetch_data("/database/users.json",function(data)
        {
            console.log(data+" = "+i++);
            console.log("req.body.data "+req.body.data);
            console.log("data.length is "+data.length);
            let email=req.param("email");
            console.log("email you entered id "+email);
            let password=req.param("password");
            console.log("password you entered is "+password);
            var flag=0;
            for(let i=0;i<=data.length-1;i++)
            {
               console.log("data[i] is "+data[i]);
               if(email==data[i].email)
               {
                   flag=1;
                   if(password==data[i].password)
                   {
                       console.log("user present ");
                       res.type('json');
                       app.use(session(data[i]));
                       res.status(200).send({"result":"successfull"});
                       //res.redirect("/home2.html");
                       break;
                   }
                   else
                   {
                       res.type('json');
                       res.status(200).send({"result":"Wrong password"});
                       break;
                   }
               }
            }
            if(flag==0)
               res.status(200).send({"result":"user not present"});
        });
    });

    app.get("/jobs",function(req,res){
        fetch_data("/database/jobs.json",function(data)
        {
           res.send(data);
        });  
    });

    app.get("/signup",(req,res)=>{
        console.log('data: ',req.param("user_name"));
        let name=req.param("user_name");
        let email=req.param("email");
        let password=req.param("password");
        let repassword=req.param("repassword");
        let contact_no=req.param("contact_no");
        let city=req.param("city");
        console.log("password is "+password);
        console.log("repassword is "+repassword);
        if(password==repassword)
        {
          let a={name:name,email:email,password:password,contact_no:contact_no,city:city};
          fetch_data("/database/users.json",function(data)
          {
            //console.log("j is "+j);
            data.push(a);
            console.log(data);
            for(let i=0;i<=data.length-1;i++)
            {
                if(data[i].email==email)
                {
                    res.status(200).send({"res":"user already present"});
                }
            }
            //console.log("j is "+j);
            fs.writeFile("./database/users.json",JSON.stringify(data),"utf-8",(err)=>
            {
               if(err)
               {
                   console.log("error");
               }
               else{
                   console.log("written to file successfully");
               }
            });
           res.redirect('/login.html');
          }); 
        }
        else
        {
            console.log("reentered password is not matching ");
            res.redirect('/');
        }
  });
  app.post("/addjob",function(req,res)
  {
      var addflag=0;
      console.log(req.body);
      let obj=req.body;
      fetch_data("/database/jobs.json",function(data)
      {
          console.log(data);
          obj.id=data.length+1;
          data.push(obj);
          fs.writeFile("./database/jobs.json",JSON.stringify(data),"utf-8",(err)=>
            {
               if(err)
               {
                   console.log("error");
                   addflag=0;
                   res.status(200).send({"result":""+addflag+""});
               }
               else{
                    addflag=1;
                    console.log("written to file successfully");
                    res.status(200).send({"result":""+addflag+""});
               }
            });
      });
  });
  
app.listen(3000,()=>
{
    console.log("listening");
});
