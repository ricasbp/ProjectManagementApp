var Task = require('../models/tasks');

const { body, validationResult } = require("express-validator");
var async = require('async');
const { redirect } = require('express/lib/response');
const { db } = require('../models/tasks');



exports.task_post = async (req, res) => {

    const task = new Task({
        name: req.body.name,
        priority: req.body.priority,
        progress: req.body.progress,
        users: req.body.users,
        data_inicio: req.body.data_inicio,
        data_fim: req.body.data_fim  
    });

    console.log(task);

    try {
        const newTask = await task.save();
        console.log(newTask);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    
};

exports.task_get = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' })
        }
        res.json(task);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};

exports.tasks_get = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

exports.task_put = async (req, res) => {


    console.log("task put");
    try {
        var task = await Task.findById(req.params.id)
        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' })
        }
        
        if(req.body.name != null){
            task.name = req.body.name;
        }

        if(req.body.progress != null){
            task.progress = req.body.progress;
        }

        if(req.body.items != null){
            task.items = req.body.items;
        }

        if(req.body.users != null){
            task.users = req.body.users;
        }

        if(req.body.project === ""){
            task.project = null;
        }else if(req.body.project != null){
            task.project = req.body.project;
        }
        
        await task.save()

        res.json(task);

    } catch (err) {
        res.json({ message: err.message })
    }
};

exports.task_delete = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' })
        }
        await task.remove()
        res.status(200).json({ message: task.name + " removed from database" });
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

};