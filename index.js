const express=require("express");
const app=express();
const path=require("path");
const {v4:uuid4}=require("uuid");
const methodOverride=require("method-override");
const port=3000;
app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.json())
let posts=[
    {   id:uuid4(),
        username:"khushi",
        content:"i love coding"
    },
    {   id:uuid4(),
        username:"payal",
        content:"i hate coffee"
    },
    {   id:uuid4(),
        username:"arohi",
        content:"i love coding"
    },
]

app.listen(port,()=>{
    console.log("khushi")
})
app.get('/posts',(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
    
})

app.get('/posts/:id',(req,res)=>{
     let{id}=req.params;
     let post=posts.find((p)=>
        id===p.id
     )
     res.render("show.ejs",{post})
})
app.get('/posts/:id/edit',(req,res)=>{
    let{id}=req.params;
     let post=posts.find((p)=>
        id===p.id
     )
     console.log(post.username)
    res.render("edit.ejs",{post});

})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log("patch is working");
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
     post.content=newcontent;
   res.redirect('/posts');
    

})
app.delete('/posts/:id',(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=> id !==p.id);
     res.redirect('/posts');
    //res.send("deleted successfully");
    

})
app.post('/posts',(req,res)=>{
    console.log(req.body);
    let id=uuid4();
    let {username,content}=req.body;
    posts.push({id,username,content});
    res.redirect("/posts")
})