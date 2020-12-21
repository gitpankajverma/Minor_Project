var a=document.getElementById("profile_icon");
var jobs_div=document.getElementById("jobs");
var subject1=document.getElementById("subject");
var company1=document.getElementById("company");
var ctc1=document.getElementById("ctc");
var skills1=document.getElementById("skills");
var desc1=document.getElementById("description");
var location1=document.getElementById("location");
var exp1=document.getElementById("exp");
var job_desc1=document.getElementById("job_desc");
a.addEventListener("click",function()
{
    document.getElementById("profile_div").style.display="block";
});
document.getElementById("cross").addEventListener("click",function()
{
    document.getElementById("profile_div").style.display="none";
});

var list=document.getElementById("upperlist");
var find=document.getElementById("find");
var f=1;
find.addEventListener("click",function()
{
    console.log("clicked");
    if(f==1)
    {
      document.getElementById("search").style.display="inline";
      f=0;
    } 
    else
    {
    document.getElementById("search").style.display="none";
    f=1;
    } 
});


var edit_btn=document.getElementById("edit");
edit_btn.addEventListener("click",function()
{
   var fds=document.getElementsByClassName("profile_input");
   console.log(fds.length);
   for(let z=0;z<=fds.length-1;z++)
   {
     fds[z].disabled="false";
   }
   edit_btn.value="Save";
});
onload();
var jobs;
function onload()
{
  console.log("called first");
  var req=new XMLHttpRequest();
  req.onreadystatechange = function() 
  {
    if (this.readyState == 4 && this.status == 200) {
      console.log("called"+this.responseText);
      jobs=JSON.parse(this.responseText);
      console.log(jobs);
      var total_jobs=jobs.length;
      for(let i=0;i<=total_jobs-1;i++)
      {
        jobs_div.appendChild(add_jobs(jobs[i]));
      }
    }; 
  };
  req.open("GET","/jobs",true);
  console.log(req);
  req.send();
}

function add_jobs(arr)
{
  var outerdiv=document.createElement("div");
  outerdiv.style.margin="auto";
  var sub=document.createElement("h2");
  sub.innerHTML=arr.subject;
  var desc=document.createElement("h4");
  desc.innerHTML=arr.desc;
  var ctc=document.createElement("label");
  ctc.innerHTML="CTC :-"+arr.ctc+"<br>";
  var skills=document.createElement("label");
  skills.innerHTML="Skills :-"+arr.skills+"<br>";
  var exp=document.createElement("label");
  exp.innerHTML="Exp:-"+arr.experience;
  var company=document.createElement("label");
  company.innerHTML=arr.company;
  var location=document.createElement("label");
  location.innerHTML=arr.location;
  outerdiv.style.borderRadius="10px";
  outerdiv.style.color="#23050e";
  outerdiv.style.margin="auto";
  outerdiv.appendChild(sub);
  outerdiv.appendChild(ctc);
  outerdiv.appendChild(skills);
  outerdiv.appendChild(exp);
  outerdiv.addEventListener("click",function()
  {
    company1.innerHTML="";
    subject1.innerHTML="";
    ctc1.innerHTML="";
    exp1.innerHTML="";
    skills1.innerHTML="";
    desc1.innerHTML="";
    location1.innerHTML="";
    job_desc1.style.display="block";
     company1.appendChild(company.cloneNode(true));
     subject1.appendChild(sub.cloneNode(true));
     ctc1.appendChild(ctc.cloneNode(true));
     exp1.appendChild(exp.cloneNode(true));
     skills1.appendChild(skills.cloneNode(true));
     desc1.appendChild(desc.cloneNode(true));
     location1.appendChild(location.cloneNode(true));
  })
  return outerdiv;
}