package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class InMemoryBlueprintPersistence implements BlueprintsPersistence {

    private final ConcurrentHashMap<Tuple<String,String>,Blueprint> blueprints=new ConcurrentHashMap<>();

    public InMemoryBlueprintPersistence() {
        //load stub data
        Point[] pts=new Point[]{new Point(25, 20),new Point(140, 140),new Point(140, 140),new Point(115, 115)};
        Blueprint bp=new Blueprint("_authorname_", "_bpname_ ",pts);
        blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);

        Blueprint bp1=new Blueprint("juan", "Casa",pts);
        Blueprint bp2=new Blueprint("juan", "Edificio",pts);
        Blueprint bp3=new Blueprint("Andrés", "Comedor",pts);

        blueprints.put(new Tuple<>(bp1.getAuthor(),bp1.getName()), bp1);
        blueprints.put(new Tuple<>(bp2.getAuthor(),bp2.getName()), bp2);
        blueprints.put(new Tuple<>(bp3.getAuthor(),bp3.getName()), bp3);
    }

    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(),bp.getName()))){
            throw new BlueprintPersistenceException("The given blueprint already exists: "+bp);
        }
        else{
            blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        }
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        return blueprints.get(new Tuple<>(author, bprintname));
    }

    @Override
    public Set<Blueprint> getBlueprints(String author) throws BlueprintNotFoundException {
        Set<Blueprint> bps = new HashSet<>();
        for (Tuple<String, String> tu : blueprints.keySet()) {
            if (tu.getElem1().equalsIgnoreCase(author)) {
                bps.add(blueprints.get(tu));
            }
        }
        return bps;
    }

    @Override
    public Set<Blueprint> getAllBlueprints() throws BlueprintPersistenceException {
        Set<Blueprint> bps = new HashSet<>();
        for (Tuple<String, String> tu : blueprints.keySet()) {
            bps.add(blueprints.get(tu));
        }
        return bps;
    }

    @Override
    public void updateBlueprint(String author, String name, Blueprint bp) throws BlueprintPersistenceException {
        blueprints.put(new Tuple<>(author, name), bp);
    }


}
