var app = module.parent.exports.app;
var Empleado = require('../models/employee.js');
var passport = module.parent.exports.passport;

var adminAuth = function(req, res, next){
    if(typeof req.user!= "undefined"){
        next();
    }else{
        res.redirect('/admin');
    }
}

//get Login
app.get('/admin',function(req, res){
//Empleado.find({}, function(err, docs){
	res.render('login', {title:'Login'});
});

//Post login 
app.post('/admin', passport.authenticate('AdminLogin',
{
	successRedirect:'/panel',
	failureRedirect:'/admin',
}));
app.get('/panel',adminAuth, function(req, res){
    Empleado.find({},function(err, docs){
        res.render('panel',{title:'Panel', employee:docs});    
    });
	
});
app.get('/panel/employees/new',function(req, res){
    res.render('newEmployee',{title:'Nuevo Empleado'});
});
//post new employee
app.post('/panel/employees/new',function(req, res){
    var emp = new Empleado ({nombre:req.body.nombre, apellido:req.body.apellido, email:req.body.email, pass1:req.body.pass1});
    emp.save(function(err, doc){
        if(!err){
            res.redirect('/panel/employees'); // cambiar a la lista
        }else{
            res.end(err);
        }
    });
});
app.get('/panel/employees', function(req, res){
    res.render('lista',{title:'Lista'});
});

app.get('/panel/employees/delete/:id', function(req, res){
    Empleado.remove({ _id:req.params.id}, function(err, doc){
        if(!err){
            res.redirect('/panel/employees');
        }else{
            res.end(err);
        }
    });
});
app.get('/panel/employees/edit/:id', function(req, res){
    Empleado.findOne({ _id:req.params.id}, function(err, doc){
        //console.log(doc);
        if(!err){
            res.render('editEmployee',{title:'Editar Empleado', employee: doc});
        }else{
            res.end(err);
        }
    })
});
app.post('/panel/employees/edit/:id', function(req, res){
    Empleado.findOne({ _id:req.params.id}, function(err, doc){
        if(!err){
            doc.nombre= req.body.nombre
            doc.apellido = req.body.apellido
            doc.email = req.body.email
            doc.save(function(err, doc){
                if(!err){
                    res.redirect('/panel/employees');
                }else{
                    res.end(err);
                }
            });
            
        }else{
            res.end(err);
        }
            
    });
});