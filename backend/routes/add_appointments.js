const ServiceAppointment = require("../models/service_appointment");
const SignupUser = require("../models/signupUser");
const service = require("../models/services");
const package = require("../models/packages");
const appointment = require("../models/appointments");
const express = require("express");
const Router = express.Router();
const verifyToken = require("../middlewares/verify_jwt_token");


Router.post('/add-appointment-staff',verifyToken,async(req,res)=>{
    try {
        const {customer_name,customer_email,customer_mobile_phone,status,time,staff_id,service_id,package_id,appointment_id} = req.body;
        const service_appointment = new ServiceAppointment({
            customer_name:customer_name,
            customer_email:customer_email,
            customer_mobile_phone:customer_mobile_phone,
            status:status,
            time:time,
            staff_id:SignupUser.findById(staff_id),
            service_id:service.findById(service_id),
            package_id:package.findById(package_id),
            appointment_id: appointment.findById(appointment_id)            
        })
        await service_appointment.save();
        res.status(200).json({message:"Appointment added successfully",service_appointment});
    } catch (error) {
        console.log("Some error occured while adding appointment",error);
        res.status(500).json({message:"Internal server error"});        
    }
})

Router.put('/update-appointment-staff/:id',verifyToken,async(req,res)=>{
    try {
        const {customer_name,customer_email,customer_mobile_phone,status,time,staff_id,service_id,package_id,appointment_id} = req.body;
        const service_appointment = await ServiceAppointment.findById(req.params.id);
        service_appointment.customer_name = customer_name;
        service_appointment.customer_email = customer_email;
        service_appointment.customer_mobile_phone = customer_mobile_phone;
        service_appointment.status = status;
        service_appointment.time = time;
        service_appointment.staff_id = SignupUser.findById(staff_id);
        service_appointment.service_id = service.findById(service_id);
        service_appointment.package_id = package.findById(package_id);
        service_appointment.appointment_id = appointment.findById(appointment_id);
        await service_appointment.save();
        res.status(200).json({message:"Appointment updated successfully",service_appointment});
    } catch (error) {
        console.log("Some error occured while updating appointment",error);
        res.status(500).json({message:"Internal server error"});        
    }
})

Router.delete('/delete-appointment-staff/:id',verifyToken,async(req,res)=>{
    try {
        const service_appointment = await ServiceAppointment.findById(req.params.id);
        await service_appointment.remove();
        res.status(200).json({message:"Appointment deleted successfully",service_appointment});
    } catch (error) {
        console.log("Some error occured while deleting appointment",error);
        res.status(500).json({message:"Internal server error"});
    }
})
