/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.controllers;

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.google.gson.Gson;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/blueprints")
public class BlueprintAPIController {

    @Autowired
    BlueprintsServices blueprintsServices;

    @RequestMapping(
            method = RequestMethod.GET,
            produces="application/json"
    )
    public ResponseEntity<?> handlerGetBlueprintResource() {
        try {
            Set<Blueprint> blueprints = blueprintsServices.getAllBlueprints();
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(blueprints), HttpStatus.ACCEPTED);
        } catch (BlueprintPersistenceException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error al ejecutar getAllBlueprints", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(
            value = "/{author}",
            produces="application/json"
    )
    public ResponseEntity<?> getAuthorBlueprints(@PathVariable String author) {
        try {
            Set<Blueprint> blueprints = blueprintsServices.getBlueprintsByAuthor(author);
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(blueprints), HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error al ejecutar getBlueprintsByAuthor", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(
            value = "/{author}/{bpname}",
            produces="application/json"
    )
    public ResponseEntity<?> getBlueprintByAuthor(@PathVariable String author, @PathVariable String bpname) {
        try {
            Blueprint blueprint = blueprintsServices.getBlueprint(author, bpname);
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(blueprint), HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error al ejecutar getBlueprintsByAuthor", HttpStatus.NOT_FOUND);
        }
    }
}

