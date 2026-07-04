const Contact=require('../models/contactModel');
const asyncHandler = require('express-async-handler');


//@desc get all contacts
//@route get /api/contacts
//@access private
const getContacts=asyncHandler(async(req,res)=>{
    const contacts= await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts)
})
//@desc create new contact
//@route post /api/contacts
//@access private
const createContact=asyncHandler(async(req,res)=>{
    console.log("The request body is:",req.body)
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("NAME,EMAIL AND PHONE NUMBER CANT BE EMPTY");
    }
    const c=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json(c)
})
//@desc GET contact
//@route post /api/contacts/:id
//@access public
const getContact=asyncHandler(async(req,res)=>{
    const c=await Contact.findById(req.params.id)
    if(!c){
        res.status(400)
        throw new Error("Nahh Contact aint there");
    }
    else{
        res.status(200).json(c)
    }
})
//@desc update contact
//@route put /api/contacts/:id
//@access private
const updateContact=asyncHandler(async(req,res)=>{
    const c=await Contact.findById(req.params.id)
    if(!c){
        res.status(400);
        throw new Error("Nahh Contact aint there");
    }
    if(c.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("This user does not have permission to update other user's contacts")
    }
    const updatedContact= await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    console.log(updatedContact)

    res.status(200).json(updatedContact);
})
//@desc delete contact
//@route delete /api/contacts/:id
//@access private
const deleteContact=asyncHandler(async(req,res)=>{
    const c=await Contact.findById(req.params.id)
    if(!c){
        res.status(400);
        throw new Error("Nahh Contact aint there");
    }
    if(c.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("This user does not have permission to delete other user's contacts")
    }
    await Contact.deleteOne({_id:req.params.id});
    console.log(c)

    res.status(200).json(c);
})

module.exports={getContacts,createContact,getContact,updateContact,deleteContact}