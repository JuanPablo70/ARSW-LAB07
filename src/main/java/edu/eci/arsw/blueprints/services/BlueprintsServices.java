package edu.eci.arsw.blueprints.services;

import edu.eci.arsw.blueprints.filters.BlueprintFilter;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class BlueprintsServices {

    @Autowired
    BlueprintsPersistence bpp;

    @Autowired
    BlueprintFilter bpf;

    public void addNewBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        bpp.saveBlueprint(bp);
    }

    public Set<Blueprint> getAllBlueprints() throws BlueprintPersistenceException {
        Set<Blueprint> blueprints = new HashSet<>();
        for (Blueprint bp : bpp.getAllBlueprints()) {
            bpf.filter(bp);
            blueprints.add(bp);
        }
        return blueprints;
    }

    /**
     *
     * @param author blueprint's author
     * @param name blueprint's name
     * @return the blueprint of the given name created by the given author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Blueprint getBlueprint(String author,String name) throws BlueprintNotFoundException {
        Blueprint blueprint = bpp.getBlueprint(author, name);
        bpf.filter(blueprint);
        return blueprint;
    }

    /**
     *
     * @param author blueprint's author
     * @return all the blueprints of the given author
     * @throws BlueprintNotFoundException if the given author doesn't exist
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException{
        Set<Blueprint> blueprints = new HashSet<>();
        for (Blueprint bp : bpp.getBlueprints(author)) {
            bpf.filter(bp);
            blueprints.add(bp);
        }
        return blueprints;
    }

    public void updateBlueprint(String author, String name, Blueprint bp) throws BlueprintPersistenceException{
        bpp.updateBlueprint(author, name, bp);
    }

    public BlueprintsPersistence getBpp() {
        return bpp;
    }

    public void setBpp(BlueprintsPersistence bpp) {
        this.bpp = bpp;
    }

    public void filter(Blueprint bp) { bpf.filter(bp); }
}
